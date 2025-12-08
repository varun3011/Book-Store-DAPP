// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BookStore {
    address public owner;
    address public constant BOOK_MANAGER = 0x70997970C51812dc3A010C7d01b50e0d17dc79C8; // Account #2
    uint256 public bookIdCounter;

    struct Book {
        uint256 id;
        string title;
        string author;
        uint256 price;
        uint256 stock;
        string imageUrl; // URL for book cover image
        string genre; // Book genre/category
    }

    mapping(uint256 => Book) public books;
    // Track book purchases: bookId => array of (buyer, quantity, timestamp)
    mapping(uint256 => Purchase[]) public bookPurchases;
    // Track book ownership: bookId => address => quantity owned
    mapping(uint256 => mapping(address => uint256)) public bookOwnership;
    // Track latest purchase price per user per book: bookId => address => price paid per unit
    mapping(uint256 => mapping(address => uint256)) public latestPurchasePrice;
    // Track listings: bookId => seller => listing details
    mapping(uint256 => mapping(address => Listing)) public listings;
    // Track all active listings for easy lookup: bookId => array of seller addresses
    mapping(uint256 => address[]) public activeListings;
    // Track user whitelist (favorites): address => bookId => isWhitelisted
    mapping(address => mapping(uint256 => bool)) public whitelist;
    // Track user's whitelisted book IDs for easy iteration: address => array of book IDs
    mapping(address => uint256[]) public userWhitelistedBooks;
    
    struct Purchase {
        address buyer;
        uint256 quantity;
        uint256 timestamp;
    }
    
    struct Listing {
        uint256 bookId;
        address seller;
        uint256 price; // Price per unit in wei
        uint256 quantity; // Quantity available for sale
        bool active;
    }
    
    struct Sale {
        uint256 bookId;
        address buyer;
        uint256 quantity;
        uint256 sellPrice; // Price per unit sold
        uint256 purchasePrice; // Price per unit that seller originally paid
        uint256 profit; // Profit per unit (sellPrice - purchasePrice)
        uint256 timestamp;
    }
    
    // Track sales history: address => array of sales
    mapping(address => Sale[]) public salesHistory;

    // Events
    event BookAdded(uint256 bookId);
    event BookPurchased(uint256 bookId, uint256 quantity, address buyer);
    event BookListedForSale(uint256 bookId, address seller, uint256 price, uint256 quantity);
    event BookPurchasedFromUser(uint256 bookId, uint256 quantity, address seller, address buyer);
    event ListingCancelled(uint256 bookId, address seller);
    event BookAddedToWhitelist(uint256 bookId, address user);
    event BookRemovedFromWhitelist(uint256 bookId, address user);
    event BookSold(uint256 bookId, uint256 quantity, address seller, address buyer, uint256 sellPrice, uint256 profit);
    event BookUpdated(uint256 bookId, string title, string author, uint256 price, uint256 stock, string imageUrl, string genre);
    event BookDeleted(uint256 bookId);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    modifier onlyBookManager() {
        require(msg.sender == BOOK_MANAGER, "Only Account #2 can add books");
        _;
    }

    constructor() {
        owner = msg.sender;
        bookIdCounter = 0;
    }

    // Add a new book to the catalog - Only Account #2 can add books
    function addBook(string memory _title, string memory _author, uint256 _price, uint256 _stock, string memory _imageUrl, string memory _genre) external onlyBookManager {
        bookIdCounter++;
        books[bookIdCounter] = Book(bookIdCounter, _title, _author, _price, _stock, _imageUrl, _genre);
        emit BookAdded(bookIdCounter);
    }

    // Update an existing book - Only Account #2 can update books
    function updateBook(uint256 _bookId, string memory _title, string memory _author, uint256 _price, uint256 _stock, string memory _imageUrl, string memory _genre) external onlyBookManager {
        require(books[_bookId].id != 0, "Book does not exist");
        books[_bookId].title = _title;
        books[_bookId].author = _author;
        books[_bookId].price = _price;
        books[_bookId].stock = _stock;
        books[_bookId].imageUrl = _imageUrl;
        books[_bookId].genre = _genre;
        emit BookUpdated(_bookId, _title, _author, _price, _stock, _imageUrl, _genre);
    }

    // Delete a book - Only Account #2 can delete books
    function deleteBook(uint256 _bookId) external onlyBookManager {
        require(books[_bookId].id != 0, "Book does not exist");
        // Set stock to 0 and mark as deleted (we don't actually delete to preserve purchase history)
        books[_bookId].stock = 0;
        books[_bookId].title = "";
        books[_bookId].author = "";
        books[_bookId].price = 0;
        books[_bookId].imageUrl = "";
        books[_bookId].genre = "";
        emit BookDeleted(_bookId);
    }

    // Get total number of books in the store
    function getTotalBooksCount() external view returns (uint256) {
        return bookIdCounter;
    }

    // Purchase a book
    function purchaseBook(uint256 _bookId, uint256 _quantity) external payable {
        require(_quantity > 0, "Quantity must be greater than 0");
        require(books[_bookId].id != 0, "Invalid book ID");
        require(books[_bookId].stock >= _quantity, "Insufficient stock");
        require(msg.value >= books[_bookId].price * _quantity, "Insufficient funds");

        books[_bookId].stock -= _quantity;
        
        // Record the purchase
        bookPurchases[_bookId].push(Purchase({
            buyer: msg.sender,
            quantity: _quantity,
            timestamp: block.timestamp
        }));
        
        // Update ownership
        bookOwnership[_bookId][msg.sender] += _quantity;
        
        // Track the purchase price per unit
        latestPurchasePrice[_bookId][msg.sender] = books[_bookId].price;
        
        // Record sale for BOOK_MANAGER (Account #2) - they get full profit since they added the book
        // For BOOK_MANAGER: purchasePrice = 0 (they didn't buy it), profit = sellPrice (full price)
        salesHistory[BOOK_MANAGER].push(Sale({
            bookId: _bookId,
            buyer: msg.sender,
            quantity: _quantity,
            sellPrice: books[_bookId].price,
            purchasePrice: 0, // BOOK_MANAGER didn't purchase, they added the book
            profit: books[_bookId].price, // Full profit since they didn't buy it
            timestamp: block.timestamp
        }));
        
        emit BookPurchased(_bookId, _quantity, msg.sender);
        emit BookSold(_bookId, _quantity, BOOK_MANAGER, msg.sender, books[_bookId].price, books[_bookId].price);

        // Refund excess funds to the buyer
        if (msg.value > books[_bookId].price * _quantity) {
            payable(msg.sender).transfer(msg.value - books[_bookId].price * _quantity);
        }
    }
    
    // List book for sale to other users
    function listForSale(uint256 _bookId, uint256 _price, uint256 _quantity) external {
        require(_quantity > 0, "Quantity must be greater than 0");
        require(_price > 0, "Price must be greater than 0");
        require(books[_bookId].id != 0, "Invalid book ID");
        
        // Check ownership - must own at least the quantity being listed
        uint256 owned = bookOwnership[_bookId][msg.sender];
        require(owned >= _quantity, "You don't own enough copies of this book");
        
        // Check if there's already an active listing
        Listing storage existingListing = listings[_bookId][msg.sender];
        require(!existingListing.active, "You already have an active listing for this book. Cancel it first or update it.");
        
        // Create listing
        listings[_bookId][msg.sender] = Listing({
            bookId: _bookId,
            seller: msg.sender,
            price: _price,
            quantity: _quantity,
            active: true
        });
        
        // Add to active listings array
        activeListings[_bookId].push(msg.sender);
        
        emit BookListedForSale(_bookId, msg.sender, _price, _quantity);
    }
    
    // Update existing listing
    function updateListing(uint256 _bookId, uint256 _newPrice, uint256 _newQuantity) external {
        Listing storage listing = listings[_bookId][msg.sender];
        require(listing.active, "No active listing found");
        require(bookOwnership[_bookId][msg.sender] >= _newQuantity, "You don't own enough copies");
        require(_newQuantity > 0 && _newPrice > 0, "Price and quantity must be greater than 0");
        
        listing.price = _newPrice;
        listing.quantity = _newQuantity;
    }
    
    // Cancel listing
    function cancelListing(uint256 _bookId) external {
        Listing storage listing = listings[_bookId][msg.sender];
        require(listing.active, "No active listing found");
        
        listing.active = false;
        listing.quantity = 0;
        
        // Remove from active listings array
        removeFromActiveListings(_bookId, msg.sender);
        
        emit ListingCancelled(_bookId, msg.sender);
    }
    
    // Purchase book from another user's listing
    function purchaseFromUser(uint256 _bookId, address _seller, uint256 _quantity) external payable {
        require(_quantity > 0, "Quantity must be greater than 0");
        require(books[_bookId].id != 0, "Invalid book ID");
        require(msg.sender != _seller, "You cannot buy from yourself");
        
        Listing storage listing = listings[_bookId][_seller];
        require(listing.active, "Listing is not active");
        require(listing.quantity >= _quantity, "Insufficient quantity in listing");
        require(bookOwnership[_bookId][_seller] >= _quantity, "Seller doesn't own enough copies");
        require(msg.value >= listing.price * _quantity, "Insufficient funds");
        
        // Get the seller's original purchase price
        uint256 sellerPurchasePrice = latestPurchasePrice[_bookId][_seller];
        if (sellerPurchasePrice == 0) {
            // If no purchase price recorded, use the book's current price as fallback
            sellerPurchasePrice = books[_bookId].price;
        }
        
        // Calculate profit per unit
        uint256 profitPerUnit = 0;
        if (listing.price > sellerPurchasePrice) {
            profitPerUnit = listing.price - sellerPurchasePrice;
        }
        
        // Transfer ownership from seller to buyer
        bookOwnership[_bookId][_seller] -= _quantity;
        bookOwnership[_bookId][msg.sender] += _quantity;
        
        // Transfer payment to seller
        payable(_seller).transfer(listing.price * _quantity);
        
        // Track the purchase price per unit (from listing)
        latestPurchasePrice[_bookId][msg.sender] = listing.price;
        
        // Record sale in seller's history
        salesHistory[_seller].push(Sale({
            bookId: _bookId,
            buyer: msg.sender,
            quantity: _quantity,
            sellPrice: listing.price,
            purchasePrice: sellerPurchasePrice,
            profit: profitPerUnit,
            timestamp: block.timestamp
        }));
        
        // Update listing quantity
        listing.quantity -= _quantity;
        if (listing.quantity == 0) {
            listing.active = false;
            removeFromActiveListings(_bookId, _seller);
        }
        
        // Record the purchase
        bookPurchases[_bookId].push(Purchase({
            buyer: msg.sender,
            quantity: _quantity,
            timestamp: block.timestamp
        }));
        
        // Refund excess funds to buyer
        if (msg.value > listing.price * _quantity) {
            payable(msg.sender).transfer(msg.value - listing.price * _quantity);
        }
        
        emit BookPurchasedFromUser(_bookId, _quantity, _seller, msg.sender);
        emit BookSold(_bookId, _quantity, _seller, msg.sender, listing.price, profitPerUnit);
    }
    
    // Helper function to remove seller from active listings
    function removeFromActiveListings(uint256 _bookId, address _seller) private {
        address[] storage sellers = activeListings[_bookId];
        for (uint256 i = 0; i < sellers.length; i++) {
            if (sellers[i] == _seller) {
                sellers[i] = sellers[sellers.length - 1];
                sellers.pop();
                break;
            }
        }
    }
    
    // Get listing details
    function getListing(uint256 _bookId, address _seller) external view returns (uint256, uint256, bool) {
        Listing memory listing = listings[_bookId][_seller];
        return (listing.price, listing.quantity, listing.active);
    }
    
    // Get all active listings for a book
    function getActiveListings(uint256 _bookId) external view returns (address[] memory) {
        return activeListings[_bookId];
    }
    
    // Get how many copies of a book an address owns
    function getOwnedQuantity(uint256 _bookId, address _owner) external view returns (uint256) {
        return bookOwnership[_bookId][_owner];
    }
    
    // Get all purchases for a book
    function getBookPurchases(uint256 _bookId) external view returns (Purchase[] memory) {
        return bookPurchases[_bookId];
    }
    
    // Get the latest buyer of a book (most recent purchase)
    function getLatestBuyer(uint256 _bookId) external view returns (address) {
        require(bookPurchases[_bookId].length > 0, "No purchases for this book");
        uint256 lastIndex = bookPurchases[_bookId].length - 1;
        return bookPurchases[_bookId][lastIndex].buyer;
    }
    
    // Get purchase count for a book
    function getPurchaseCount(uint256 _bookId) external view returns (uint256) {
        return bookPurchases[_bookId].length;
    }

    // View available books
    function getBook(uint256 _bookId) external view returns (uint256, string memory, string memory, uint256, uint256, string memory, string memory) {
        require(books[_bookId].id != 0, "Invalid book ID");
        Book memory book = books[_bookId];
        return (book.id, book.title, book.author, book.price, book.stock, book.imageUrl, book.genre);
    }

    // Whitelist functions
    function addToWhitelist(uint256 _bookId) external {
        require(books[_bookId].id != 0, "Invalid book ID");
        require(!whitelist[msg.sender][_bookId], "Book already in whitelist");
        
        whitelist[msg.sender][_bookId] = true;
        userWhitelistedBooks[msg.sender].push(_bookId);
        
        emit BookAddedToWhitelist(_bookId, msg.sender);
    }

    function removeFromWhitelist(uint256 _bookId) external {
        require(whitelist[msg.sender][_bookId], "Book not in whitelist");
        
        whitelist[msg.sender][_bookId] = false;
        
        // Remove from array
        uint256[] storage bookIds = userWhitelistedBooks[msg.sender];
        for (uint256 i = 0; i < bookIds.length; i++) {
            if (bookIds[i] == _bookId) {
                bookIds[i] = bookIds[bookIds.length - 1];
                bookIds.pop();
                break;
            }
        }
        
        emit BookRemovedFromWhitelist(_bookId, msg.sender);
    }

    function isWhitelisted(uint256 _bookId, address _user) external view returns (bool) {
        return whitelist[_user][_bookId];
    }

    function getWhitelistedBooks(address _user) external view returns (uint256[] memory) {
        return userWhitelistedBooks[_user];
    }

    function getWhitelistedBooksCount(address _user) external view returns (uint256) {
        return userWhitelistedBooks[_user].length;
    }

    // Get sales history for a user
    function getSalesHistory(address _user) external view returns (Sale[] memory) {
        return salesHistory[_user];
    }
    
    // Get sales count for a user
    function getSalesCount(address _user) external view returns (uint256) {
        return salesHistory[_user].length;
    }
    
    // Get total profit for a user
    function getTotalProfit(address _user) external view returns (uint256) {
        uint256 totalProfit = 0;
        for (uint256 i = 0; i < salesHistory[_user].length; i++) {
            totalProfit += salesHistory[_user][i].profit * salesHistory[_user][i].quantity;
        }
        return totalProfit;
    }
}
