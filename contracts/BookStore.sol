// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BookStore {
    address public owner;
    address public constant BOOK_MANAGER = 0x70997970C51812dc3A010C7d01b50e0d17dc79C8; // Account #1
    uint256 public bookIdCounter;

    struct Book {
        uint256 id;
        string title;
        string author;
        uint256 price;
        uint256 stock;
        string imageUrl; // URL for book cover image
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

    // Events
    event BookAdded(uint256 bookId);
    event BookPurchased(uint256 bookId, uint256 quantity, address buyer);
    event BookListedForSale(uint256 bookId, address seller, uint256 price, uint256 quantity);
    event BookPurchasedFromUser(uint256 bookId, uint256 quantity, address seller, address buyer);
    event ListingCancelled(uint256 bookId, address seller);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    modifier onlyBookManager() {
        require(msg.sender == BOOK_MANAGER, "Only Account #1 can add books");
        _;
    }

    constructor() {
        owner = msg.sender;
        bookIdCounter = 0;
    }

    // Add a new book to the catalog - Only Account #1 can add books
    function addBook(string memory _title, string memory _author, uint256 _price, uint256 _stock, string memory _imageUrl) external onlyBookManager {
        bookIdCounter++;
        books[bookIdCounter] = Book(bookIdCounter, _title, _author, _price, _stock, _imageUrl);
        emit BookAdded(bookIdCounter);
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
        
        emit BookPurchased(_bookId, _quantity, msg.sender);

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
        
        // Transfer ownership from seller to buyer
        bookOwnership[_bookId][_seller] -= _quantity;
        bookOwnership[_bookId][msg.sender] += _quantity;
        
        // Track the purchase price per unit (from listing)
        latestPurchasePrice[_bookId][msg.sender] = listing.price;
        
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
        
        // Transfer payment to seller
        payable(_seller).transfer(listing.price * _quantity);
        
        // Refund excess funds to buyer
        if (msg.value > listing.price * _quantity) {
            payable(msg.sender).transfer(msg.value - listing.price * _quantity);
        }
        
        emit BookPurchasedFromUser(_bookId, _quantity, _seller, msg.sender);
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
    function getBook(uint256 _bookId) external view returns (uint256, string memory, string memory, uint256, uint256, string memory) {
        require(books[_bookId].id != 0, "Invalid book ID");
        Book memory book = books[_bookId];
        return (book.id, book.title, book.author, book.price, book.stock, book.imageUrl);
    }
}
