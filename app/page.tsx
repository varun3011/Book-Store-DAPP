"use client";
import { useState, useEffect } from "react";
import atm_abi from "../artifacts/contracts/BookStore.sol/BookStore.json";
import { ethers } from "ethers";

// Toast notification component
const Toast = ({ message, type, onClose }: { message: string; type: 'success' | 'error' | 'info'; onClose: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500';
  const icon = type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ';
  
  return (
    <div className={`${bgColor} text-white px-6 py-3 rounded-lg shadow-lg fixed top-4 right-4 z-50 flex items-center gap-3 animate-slide-in max-w-md`}>
      <span className="text-xl">{icon}</span>
      <span className="flex-1">{message}</span>
      <button onClick={onClose} className="text-white hover:text-gray-200 text-xl font-bold">×</button>
    </div>
  );
};

const usePurchase = (contract: any, showToast: (msg: string, type: 'success' | 'error' | 'info') => void) => {
  async function purchaseBook(bookId: any, quantity: any) {
    try {
      if (!contract) {
        showToast("Please connect to MetaMask first", 'error');
        return;
      }

      // Request account access if needed
      // @ts-ignore
      if (window.ethereum) {
        // @ts-ignore
        await window.ethereum.request({ method: 'eth_requestAccounts' });
      }
      
      showToast("Processing purchase...", 'info');
      
      // Get book details to calculate total price
      const book = await contract.getBook(bookId);
      const bookPrice = book[3]; // price is at index 3
      const totalPrice = bookPrice.mul(quantity); // price * quantity
      
      const transaction = await contract.purchaseBook(bookId, quantity, {
        value: totalPrice,
      });

      await transaction.wait();
      showToast(`Successfully purchased ${quantity} book(s)!`, 'success');
      return { success: true };
    } catch (error: any) {
      let errorMessage = "Failed to purchase book. ";
      if (error.message?.includes("Insufficient funds")) {
        errorMessage = "Insufficient funds. Please send enough ETH.";
      } else if (error.message?.includes("Insufficient stock")) {
        errorMessage = "Insufficient stock. Not enough books available.";
      } else if (error.message?.includes("user rejected") || error.message?.includes("User rejected")) {
        errorMessage = "Transaction cancelled.";
        return { success: false };
      } else if (error.message?.includes("Invalid book ID")) {
        errorMessage = "Invalid book ID. Please check and try again.";
      } else if (error.message) {
        errorMessage += error.message;
      }
      showToast(errorMessage, 'error');
      return { success: false };
    }
  }

  return purchaseBook;
};

const useAddBook = (contract: any, showToast: (msg: string, type: 'success' | 'error' | 'info') => void) => {
  const [isLoading, setIsLoading] = useState(false);

  const addBook = async (title: any, author: any, price: any, stock: any, imageUrl: any = "") => {
    try {
      setIsLoading(true);
      if (!title || !author || !price || !stock) {
        showToast("Please fill in all required fields", 'error');
        setIsLoading(false);
        return;
      }
      
      if (!contract) {
        showToast("Please connect to MetaMask first", 'error');
        setIsLoading(false);
        return { success: false };
      }
      
      // Verify provider connection
      // @ts-ignore
      if (!window.ethereum) {
        showToast("MetaMask is not installed. Please install MetaMask to use this app.", 'error');
        setIsLoading(false);
        return { success: false };
      }
      
      // Request account access if needed
      // @ts-ignore
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      // Use placeholder image if no URL provided
      const finalImageUrl = imageUrl || "https://via.placeholder.com/300x400/4A90E2/FFFFFF?text=" + encodeURIComponent(title);
      
      showToast("Adding book...", 'info');
      const priceInWei = ethers.utils.parseEther(price.toString());
      const stockNumber = parseInt(stock);
      
      const transaction = await contract.addBook(title, author, priceInWei, stockNumber, finalImageUrl);
      await transaction.wait();
      
      showToast(`Book "${title}" added successfully!`, 'success');
      setIsLoading(false);
      return { success: true };
    } catch (error: any) {
      let errorMessage = "Failed to add book. ";
      if (error.message && error.message.includes("Only Account #1")) {
        errorMessage = "Only Account #1 can add books. Switch accounts in MetaMask.";
      } else if (error.message && error.message.includes("user rejected")) {
        errorMessage = "Transaction cancelled.";
      } else if (error.message && (error.message.includes("RPC") || error.message.includes("too many errors") || error.message.includes("network") || error.message.includes("ECONNREFUSED"))) {
        errorMessage = "Cannot connect to Hardhat node. Make sure 'npx hardhat node' is running on port 8545.";
      } else if (error.message) {
        errorMessage += error.message;
      }
      showToast(errorMessage, 'error');
      setIsLoading(false);
      return { success: false };
    }
  };

  return { addBook, isLoading };
};

const useGetBook = (contract: any) => {
  const [isLoading, setIsLoading] = useState(false);

  const getBook = async (bookId: any) => {
    try {
      setIsLoading(true);
      const book = await contract.getBook(bookId);
      setIsLoading(false);
      return {
        title: book[1],
        author: book[2],
        price: ethers.utils.formatEther(book[3]),
        stock: book[4].toString(),
        imageUrl: book[5] || "",
      };
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  return { isLoading, getBook };
};

const useGetAllBooks = (contract: any) => {
  const [allBooks, setAllBooks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [storeOwner, setStoreOwner] = useState<string>("");

  const fetchAllBooks = async () => {
    if (!contract) return;
    
    try {
      setIsLoading(true);
      const bookIdCounter = await contract.bookIdCounter();
      const owner = await contract.owner();
      setStoreOwner(owner);
      
      const books: any[] = [];
      const addedBookIds = new Set<number>();
      
      for (let i = 1; i <= bookIdCounter.toNumber(); i++) {
        try {
          if (addedBookIds.has(i)) continue;
          
          const book = await contract.getBook(i);
          const bookId = book[0].toNumber();
          addedBookIds.add(bookId);
          
          let latestBuyer: string | null = null;
          let ownerDisplay = "Not purchased";
          
          try {
            latestBuyer = await contract.getLatestBuyer(i);
            ownerDisplay = latestBuyer as string;
          } catch (error: any) {
            if (error.message && !error.message.includes("No purchases")) {
              console.error(`Error getting latest buyer for book ${i}:`, error.message);
            }
          }
          
          books.push({
            id: bookId,
            title: book[1],
            author: book[2],
            price: ethers.utils.formatEther(book[3]),
            stock: book[4].toNumber(),
            available: book[4].toNumber() > 0,
            latestBuyer: latestBuyer || "",
            ownerDisplay: ownerDisplay,
            imageUrl: book[5] || ""
          });
        } catch (error) {
          // Skip invalid book IDs
        }
      }
      
      books.sort((a, b) => a.id - b.id);
      setAllBooks(books);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching all books:", error);
      setIsLoading(false);
    }
  };

  return { allBooks, isLoading, fetchAllBooks, storeOwner };
};

const useMyPurchases = (contract: any, currentAccount: string | null) => {
  const [myBooks, setMyBooks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMyPurchases = async () => {
    if (!contract || !currentAccount) {
      setMyBooks([]);
      return;
    }
    
    try {
      setIsLoading(true);
      const bookIdCounter = await contract.bookIdCounter();
      const books: any[] = [];
      
      for (let i = 1; i <= bookIdCounter.toNumber(); i++) {
        try {
          const book = await contract.getBook(i);
          
          // First check current ownership - this is the source of truth
          let currentOwnership = 0;
          try {
            const owned = await contract.getOwnedQuantity(i, currentAccount);
            currentOwnership = owned.toNumber();
          } catch (error) {
            // If function fails, skip this book
            continue;
          }
          
          // Only show books that the user currently owns
          if (currentOwnership > 0) {
            // Get purchase history for price tracking
            let totalQuantity = 0;
            try {
              const purchases = await contract.getBookPurchases(i);
              for (let j = 0; j < purchases.length; j++) {
                if (purchases[j].buyer.toLowerCase() === currentAccount.toLowerCase()) {
                  totalQuantity += purchases[j].quantity.toNumber();
                }
              }
            } catch (error) {
              // If we can't get purchase history, that's okay - we'll use ownership
            }
              let listingPrice = null;
              let listingQuantity = 0;
              let isListed = false;
              try {
                const listing = await contract.getListing(i, currentAccount);
                isListed = listing[2];
                if (isListed) {
                  listingPrice = ethers.utils.formatEther(listing[0]);
                  listingQuantity = listing[1].toNumber();
                }
              } catch (error) {
                isListed = false;
              }
              
              // Get the actual purchase price (what user paid per unit)
              let actualPurchasePrice = book[3]; // Default to original price
              try {
                const purchasePrice = await contract.latestPurchasePrice(i, currentAccount);
                if (purchasePrice.gt(0)) {
                  actualPurchasePrice = purchasePrice;
                }
              } catch (error) {
                // If function fails, use original price
                actualPurchasePrice = book[3];
              }
              
              books.push({
                id: book[0].toNumber(),
                title: book[1],
                author: book[2],
                price: ethers.utils.formatEther(actualPurchasePrice), // Use actual purchase price
                stock: book[4].toNumber(),
                purchasedQuantity: currentOwnership, // Use current ownership
                available: book[4].toNumber() > 0,
                isListed: isListed,
                listingPrice: listingPrice,
                listingQuantity: listingQuantity,
                imageUrl: book[5] || ""
              });
            }
        } catch (error) {
          // Skip invalid book IDs
        }
      }
      
      setMyBooks(books);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching my purchases:", error);
      setIsLoading(false);
    }
  };

  return { myBooks, isLoading, fetchMyPurchases };
};

const useListForSale = (contract: any, showToast: (msg: string, type: 'success' | 'error' | 'info') => void) => {
  const [isLoading, setIsLoading] = useState(false);

  const listForSale = async (bookId: any, price: any, quantity: any) => {
    try {
      setIsLoading(true);
      const priceStr = price.toString().trim();
      const priceInWei = ethers.utils.parseEther(priceStr);
      
      showToast("Listing book for sale...", 'info');
      const transaction = await contract.listForSale(bookId, priceInWei, quantity);
      await transaction.wait();
      
      showToast(`Book listed successfully at ${priceStr} ETH!`, 'success');
      setIsLoading(false);
      return { success: true };
    } catch (error: any) {
      let errorMessage = "Failed to list book. ";
      if (error.message && error.message.includes("don't own")) {
        errorMessage = "You don't own enough copies of this book.";
      } else if (error.message && error.message.includes("already have")) {
        errorMessage = "You already have an active listing. Cancel it first.";
      } else if (error.message && error.message.includes("user rejected")) {
        errorMessage = "Transaction cancelled.";
      } else if (error.message) {
        errorMessage += error.message;
      }
      showToast(errorMessage, 'error');
      setIsLoading(false);
      return { success: false };
    }
  };

  const cancelListing = async (bookId: any) => {
    try {
      setIsLoading(true);
      showToast("Cancelling listing...", 'info');
      const transaction = await contract.cancelListing(bookId);
      await transaction.wait();
      showToast("Listing cancelled successfully!", 'success');
      setIsLoading(false);
      return { success: true };
    } catch (error: any) {
      let errorMessage = "Failed to cancel listing. ";
      if (error.message && error.message.includes("user rejected")) {
        errorMessage = "Transaction cancelled.";
      } else if (error.message) {
        errorMessage += error.message;
      }
      showToast(errorMessage, 'error');
      setIsLoading(false);
      return { success: false };
    }
  };

  return { listForSale, cancelListing, isLoading };
};

const usePurchaseFromUser = (contract: any, showToast: (msg: string, type: 'success' | 'error' | 'info') => void) => {
  const [isLoading, setIsLoading] = useState(false);

  const purchaseFromUser = async (bookId: any, seller: any, quantity: any) => {
    try {
      setIsLoading(true);
      showToast("Processing purchase...", 'info');
      
      // Fetch the listing to get the current price
      const listing = await contract.getListing(bookId, seller);
      const listingPrice = listing[0]; // Price per unit in wei (already a BigNumber)
      const listingQuantity = listing[1]; // Available quantity
      const isActive = listing[2]; // Active status
      
      // Validate listing is active
      if (!isActive) {
        throw new Error("Listing is not active");
      }
      
      // Validate quantity
      if (quantity > listingQuantity.toNumber()) {
        throw new Error("Insufficient quantity in listing");
      }
      
      // Calculate total price: listing price * quantity
      const totalPrice = listingPrice.mul(ethers.BigNumber.from(quantity));
      
      console.log("Purchase details:", {
        bookId,
        seller,
        quantity,
        listingPrice: ethers.utils.formatEther(listingPrice),
        totalPrice: ethers.utils.formatEther(totalPrice)
      });
      
      const transaction = await contract.purchaseFromUser(bookId, seller, quantity, { value: totalPrice });
      await transaction.wait();
      
      showToast(`Successfully purchased ${quantity} book(s) from seller!`, 'success');
      setIsLoading(false);
      return { success: true };
    } catch (error: any) {
      let errorMessage = "Failed to purchase from user. ";
      if (error.message && error.message.includes("cannot buy")) {
        errorMessage = "You cannot buy from yourself.";
      } else if (error.message && error.message.includes("not active")) {
        errorMessage = "Listing is no longer active.";
      } else if (error.message && error.message.includes("Insufficient")) {
        errorMessage = "Insufficient funds or quantity.";
      } else if (error.message && error.message.includes("user rejected")) {
        errorMessage = "Transaction cancelled.";
      } else if (error.message) {
        errorMessage += error.message;
      }
      showToast(errorMessage, 'error');
      setIsLoading(false);
      return { success: false };
    }
  };

  return { purchaseFromUser, isLoading };
};

export default function Home() {
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const contractABI = atm_abi.abi;

  const [contract, setContract] = useState<any>(null);
  const [currentAccount, setCurrentAccount] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' | 'info') => {
    setToast({ message, type });
  };

  const connectToContract = async () => {
    try {
      // @ts-ignore
      if (typeof window.ethereum === 'undefined') {
        showToast("Please install MetaMask to use this app", 'error');
        return;
      }

      // @ts-ignore
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setCurrentAccount(accounts[0]);

      // @ts-ignore
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      setContract(contract);
      
      // @ts-ignore
      window.ethereum.on('accountsChanged', (newAccounts: string[]) => {
        setCurrentAccount(newAccounts[0] || null);
        if (!newAccounts[0]) {
          setContract(null);
        }
      });
      
      showToast("Connected to Book Store successfully!", 'success');
    } catch (error) {
      showToast("Failed to connect. Please check MetaMask and try again.", 'error');
    }
  };

  const purchaseBook = usePurchase(contract, showToast);
  const { addBook, isLoading } = useAddBook(contract, showToast);
  const { isLoading: isBookLoading, getBook } = useGetBook(contract);
  const { allBooks, isLoading: isLoadingAllBooks, fetchAllBooks, storeOwner } = useGetAllBooks(contract);
  const { myBooks, isLoading: isLoadingMyPurchases, fetchMyPurchases } = useMyPurchases(contract, currentAccount);
  const { listForSale, cancelListing, isLoading: isListing } = useListForSale(contract, showToast);
  const { purchaseFromUser, isLoading: isPurchasingFromUser } = usePurchaseFromUser(contract, showToast);
  
  const [activeTab, setActiveTab] = useState<'operations' | 'allBooks' | 'myPurchases' | 'marketplace' | 'profile'>('operations');
  const [marketplaceListings, setMarketplaceListings] = useState<any[]>([]);
  const [isLoadingMarketplace, setIsLoadingMarketplace] = useState(false);
  
  const fetchMarketplaceListings = async () => {
    if (!contract) return;
    
    try {
      setIsLoadingMarketplace(true);
      const bookIdCounter = await contract.bookIdCounter();
      const listings: any[] = [];
      
      for (let i = 1; i <= bookIdCounter.toNumber(); i++) {
        try {
          const activeSellers = await contract.getActiveListings(i);
          const book = await contract.getBook(i);
          
          for (let j = 0; j < activeSellers.length; j++) {
            const seller = activeSellers[j];
            const listingData = await contract.getListing(i, seller);
            
            // Check if listing is active AND has quantity > 0
            const isActive = listingData[2];
            const quantity = listingData[1];
            
            if (isActive && quantity.gt(0)) {
              // Also verify the seller still owns enough books
              try {
                const owned = await contract.getOwnedQuantity(i, seller);
                if (owned.gte(quantity)) {
                  listings.push({
                    bookId: i,
                    seller: seller,
                    price: ethers.utils.formatEther(listingData[0]),
                    quantity: quantity.toNumber(),
                    title: book[1],
                    author: book[2],
                    active: isActive,
                    imageUrl: book[5] || ""
                  });
                } else {
                  console.warn(`Listing for book ${i} by ${seller} has quantity ${quantity.toString()} but seller only owns ${owned.toString()}`);
                }
              } catch (error) {
                // If we can't verify ownership, still show the listing (contract will handle validation)
                listings.push({
                  bookId: i,
                  seller: seller,
                  price: ethers.utils.formatEther(listingData[0]),
                  quantity: quantity.toNumber(),
                  title: book[1],
                  author: book[2],
                  active: isActive,
                  imageUrl: book[5] || ""
                });
              }
            }
          }
        } catch (error) {
          // Skip invalid books
        }
      }
      
      setMarketplaceListings(listings);
      setIsLoadingMarketplace(false);
    } catch (error) {
      console.error("Error fetching marketplace listings:", error);
      setIsLoadingMarketplace(false);
    }
  };
  
  const BOOK_MANAGER_ADDRESS = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";
  const isBookManager = currentAccount?.toLowerCase() === BOOK_MANAGER_ADDRESS.toLowerCase();
  
  useEffect(() => {
    if (currentAccount && activeTab === 'myPurchases') {
      fetchMyPurchases();
    }
    if (currentAccount && activeTab === 'profile') {
      fetchMyPurchases();
    }
    if (activeTab === 'marketplace') {
      fetchMarketplaceListings();
    }
  }, [currentAccount, activeTab]);

  const [bookIdPurchase, setBookIdPurchase] = useState("");
  const [quantity, setQuantity] = useState("");

  const [bookDataAdd, setBookDataAdd] = useState({
    title: "",
    author: "",
    price: "",
    stock: "",
    imageUrl: "",
  });

  const [bookDataGet, setBookDataGet] = useState({
    title: "",
    author: "",
    price: "",
    stock: "",
    imageUrl: "",
  });

  const [bookIdGet, setBookIdGet] = useState("");

  const handleBookIdGetChange = (e: any) => {
    setBookIdGet(e.target.value);
  };

  const handleBookIdPurchaseChange = (e: any) => {
    setBookIdPurchase(e.target.value);
  };

  const handleQuantityChange = (e: any) => {
    setQuantity(e.target.value);
  };

  const bookDataAddChange = (e: any) => {
    setBookDataAdd({
      ...bookDataAdd,
      [e.target.id]: e.target.value,
    });
  };

  const handlePurchase = async () => {
    const result = await purchaseBook(bookIdPurchase, quantity);
    if (result?.success) {
      setBookIdPurchase("");
      setQuantity("");
    }
  };

  const handleAddBook = async () => {
    const result = await addBook(
      bookDataAdd.title,
      bookDataAdd.author,
      bookDataAdd.price,
      bookDataAdd.stock,
      bookDataAdd.imageUrl
    );
    if (result?.success) {
      setBookDataAdd({ title: "", author: "", price: "", stock: "", imageUrl: "" });
      fetchAllBooks();
    }
  };

  const handleListForSale = async (bookId: any, price: any, quantity: any) => {
    const result = await listForSale(bookId, price, quantity);
    if (result?.success) {
      // Clear the input fields
      const quantityInput = document.getElementById(`listQuantity-${bookId}`) as HTMLInputElement;
      const priceInput = document.getElementById(`listPrice-${bookId}`) as HTMLInputElement;
      if (quantityInput) quantityInput.value = "1";
      if (priceInput) priceInput.value = "";
      setTimeout(() => {
        fetchMyPurchases();
        fetchMarketplaceListings();
      }, 2000);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4 sm:px-8 lg:px-24 py-8 sm:py-12">
      {/* Toast Notification */}
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}

      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent pb-4 mb-4">
          📚 Book Store DApp
        </h1>
        <p className="text-gray-600">Decentralized Book Marketplace on Blockchain</p>
      </div>

      {!contract && (
        <div className="flex justify-center mt-12">
          <button
            onClick={connectToContract}
            className="btn btn-primary btn-lg text-lg px-8 py-3 shadow-lg hover:shadow-xl transition-shadow"
          >
            🔗 Connect to MetaMask
          </button>
        </div>
      )}

      {contract && (
        <div className="w-full max-w-7xl mx-auto">
          {/* Account Info */}
          {currentAccount && (
            <div className="mb-6 p-4 bg-white rounded-xl shadow-md border border-gray-200 text-center">
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-gray-800">Connected Account:</span>{" "}
                <span className="font-mono text-blue-600">{currentAccount.slice(0, 6)}...{currentAccount.slice(-4)}</span>
              </p>
            </div>
          )}

          {/* Tab Navigation */}
          <div className="tabs tabs-boxed bg-white shadow-md mb-6 justify-center flex-wrap gap-2">
            <button
              className={`tab ${activeTab === 'operations' ? 'tab-active font-semibold' : ''}`}
              onClick={() => setActiveTab('operations')}
            >
              ⚙️ Operations
            </button>
            <button
              className={`tab ${activeTab === 'allBooks' ? 'tab-active font-semibold' : ''}`}
              onClick={() => {
                setActiveTab('allBooks');
                fetchAllBooks();
              }}
            >
              📖 All Books
            </button>
            <button
              className={`tab ${activeTab === 'myPurchases' ? 'tab-active font-semibold' : ''}`}
              onClick={() => {
                setActiveTab('myPurchases');
                if (currentAccount) {
                  fetchMyPurchases();
                }
              }}
            >
              🛒 My Purchases
            </button>
            <button
              className={`tab ${activeTab === 'marketplace' ? 'tab-active font-semibold' : ''}`}
              onClick={() => {
                setActiveTab('marketplace');
                fetchMarketplaceListings();
              }}
            >
              🏪 Marketplace
            </button>
            <button
              className={`tab ${activeTab === 'profile' ? 'tab-active font-semibold' : ''}`}
              onClick={() => {
                setActiveTab('profile');
                if (currentAccount) {
                  fetchMyPurchases();
                }
              }}
            >
              👤 Profile
            </button>
          </div>

          {/* Operations Tab */}
          {activeTab === 'operations' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
              {/* Purchase Book Card */}
              <div className="card bg-white shadow-lg border border-gray-200">
                <div className="card-body">
                  <h2 className="card-title text-purple-600">🛒 Purchase Book</h2>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Book ID</span>
                    </label>
          <input
            type="number"
            value={bookIdPurchase}
                      className="input input-bordered focus:input-primary"
            onChange={handleBookIdPurchaseChange}
                      placeholder="Enter book ID"
                    />
                  </div>
                  <div className="form-control mt-4">
                    <label className="label">
                      <span className="label-text font-semibold">Quantity</span>
                    </label>
          <input
            type="number"
            value={quantity}
                      className="input input-bordered focus:input-primary"
            onChange={handleQuantityChange}
                      placeholder="Enter quantity"
                      min="1"
          />
                  </div>
          <button
                    onClick={handlePurchase}
                    className="btn btn-primary mt-4 w-full"
                    disabled={!bookIdPurchase || !quantity}
          >
            Purchase
          </button>
        </div>
              </div>

              {/* Add Book Card */}
              <div className="card bg-white shadow-lg border border-gray-200">
                <div className="card-body">
                  <h2 className="card-title text-blue-600">
                    ➕ Add New Book
                    {!isBookManager && <span className="badge badge-warning badge-sm ml-2">Account #2 Only</span>}
                  </h2>
                  {!isBookManager && (
                    <div className="alert alert-warning py-2 my-2">
                      <span className="text-xs">Only Account #2 can add books</span>
                    </div>
                  )}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Title</span>
                    </label>
          <input
                      className="input input-bordered focus:input-primary"
            type="text"
            id="title"
            value={bookDataAdd.title}
            onChange={bookDataAddChange}
                      disabled={!isBookManager}
                      placeholder="Book title"
                    />
                  </div>
                  <div className="form-control mt-2">
                    <label className="label">
                      <span className="label-text font-semibold">Author</span>
                    </label>
          <input
                      className="input input-bordered focus:input-primary"
            type="text"
            id="author"
            value={bookDataAdd.author}
            onChange={bookDataAddChange}
                      disabled={!isBookManager}
                      placeholder="Author name"
                    />
                  </div>
                  <div className="form-control mt-2">
                    <label className="label">
                      <span className="label-text font-semibold">Price (ETH)</span>
                    </label>
          <input
                      className="input input-bordered focus:input-primary"
            type="number"
                      step="0.001"
            id="price"
            value={bookDataAdd.price}
            onChange={bookDataAddChange}
                      disabled={!isBookManager}
                      placeholder="0.0"
                      min="0"
                    />
                  </div>
                  <div className="form-control mt-2">
                    <label className="label">
                      <span className="label-text font-semibold">Stock</span>
                    </label>
          <input
                      className="input input-bordered focus:input-primary"
            type="number"
            id="stock"
            value={bookDataAdd.stock}
            onChange={bookDataAddChange}
                      disabled={!isBookManager}
                      placeholder="0"
                      min="0"
                    />
                  </div>
                  <div className="form-control mt-2">
                    <label className="label">
                      <span className="label-text font-semibold">Image URL (Optional)</span>
                    </label>
                    <input
                      className="input input-bordered focus:input-primary"
                      type="url"
                      id="imageUrl"
                      value={bookDataAdd.imageUrl}
                      onChange={bookDataAddChange}
                      disabled={!isBookManager}
                      placeholder="https://example.com/book-cover.jpg"
                    />
                    <label className="label">
                      <span className="label-text-alt text-gray-400">Leave empty for placeholder image</span>
                    </label>
                  </div>
          <button
                    className="btn btn-primary mt-4 w-full"
                    onClick={handleAddBook}
                    disabled={!isBookManager || isLoading || !bookDataAdd.title || !bookDataAdd.author || !bookDataAdd.price || !bookDataAdd.stock}
                  >
                    {isLoading ? (
                      <>
                        <span className="loading loading-spinner loading-sm"></span>
                        Adding...
                      </>
                    ) : (
                      'Add Book'
                    )}
          </button>
                </div>
        </div>

              {/* Get Book Details Card */}
              <div className="card bg-white shadow-lg border border-gray-200">
                <div className="card-body">
                  <h2 className="card-title text-green-600">🔍 Get Book Details</h2>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Book ID</span>
                    </label>
            <input
              type="number"
              value={bookIdGet}
              onChange={handleBookIdGetChange}
                      className="input input-bordered focus:input-primary"
                      placeholder="Enter book ID"
            />
                  </div>
            <button
              onClick={async () => {
                try {
                  const book = await getBook(bookIdGet);
                  setBookDataGet({
                        title: book?.title || "",
                        author: book?.author || "",
                        price: book?.price?.toString() || "",
                        stock: book?.stock?.toString() || "",
                        imageUrl: book?.imageUrl || "",
                      });
                      } catch(err: any) {
                        showToast(err.message?.includes("Invalid book ID") ? "Book not found" : "Error fetching book", 'error');
                      }
                    }}
                    className="btn btn-primary mt-4 w-full"
                    disabled={!bookIdGet || isBookLoading}
                  >
                    {isBookLoading ? (
                      <>
                        <span className="loading loading-spinner loading-sm"></span>
                        Loading...
                      </>
                    ) : (
                      'Get Details'
                    )}
            </button>

                  {bookDataGet.title && (
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex gap-4">
                        {bookDataGet.imageUrl && (
                          <img 
                            src={bookDataGet.imageUrl} 
                            alt={bookDataGet.title}
                            className="w-24 h-32 object-cover rounded"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                        )}
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-3 text-gray-800">Book Information</h3>
                          <div className="space-y-2 text-sm">
                            <p><span className="font-semibold">Title:</span> {bookDataGet.title}</p>
                            <p><span className="font-semibold">Author:</span> {bookDataGet.author}</p>
                            <p><span className="font-semibold">Price:</span> {bookDataGet.price} ETH</p>
                            <p><span className="font-semibold">Stock:</span> {bookDataGet.stock}</p>
          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* All Books Tab */}
          {activeTab === 'allBooks' && (
            <div className="mt-6">
              <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                <h2 className="text-3xl font-bold text-gray-800">📚 All Books in Store</h2>
                <button
                  onClick={fetchAllBooks}
                  className="btn btn-outline btn-sm"
                  disabled={isLoadingAllBooks}
                >
                  {isLoadingAllBooks ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Loading...
                    </>
                  ) : (
                    <>
                      🔄 Refresh
                    </>
                  )}
                </button>
              </div>
              
              {storeOwner && (
                <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-800">
                    <span className="font-semibold">Store Owner:</span>{" "}
                    <span className="font-mono">{storeOwner.slice(0, 10)}...{storeOwner.slice(-8)}</span>
                  </p>
                </div>
              )}

              {isLoadingAllBooks ? (
                <div className="text-center py-12">
                  <span className="loading loading-spinner loading-lg text-primary"></span>
                  <p className="mt-4 text-gray-600">Loading books...</p>
                </div>
              ) : allBooks.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg shadow border border-gray-200">
                  <p className="text-gray-500 text-lg">📭 No books found in the store.</p>
                  <p className="text-sm text-gray-400 mt-2">Add books using the Operations tab (Account #1 only)</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {allBooks.map((book) => {
                    const imageUrl = book.imageUrl || `https://via.placeholder.com/300x400/4A90E2/FFFFFF?text=${encodeURIComponent(book.title)}`;
                    return (
                      <div key={book.id} className="card bg-white shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
                        <figure className="h-64 bg-gradient-to-br from-blue-100 to-purple-100">
                          <img 
                            src={imageUrl} 
                            alt={book.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              // Fallback to placeholder if image fails to load
                              (e.target as HTMLImageElement).src = `https://via.placeholder.com/300x400/4A90E2/FFFFFF?text=${encodeURIComponent(book.title)}`;
                            }}
                          />
                        </figure>
                        <div className="card-body p-4">
                          <h2 className="card-title text-lg font-bold text-gray-800 line-clamp-2 min-h-[3rem]">
                            {book.title}
                          </h2>
                          <p className="text-gray-600 text-sm">by {book.author}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xl font-bold text-primary">
                              {parseFloat(book.price).toFixed(4)} ETH
                            </span>
                            <span className="badge badge-ghost">
                              Stock: {book.stock}
                            </span>
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            {book.available ? (
                              <span className="badge badge-success">✅ Available</span>
                            ) : (
                              <span className="badge badge-error">❌ Out of Stock</span>
                            )}
                            <span className="text-xs text-gray-500 font-mono">
                              ID: {book.id}
                            </span>
                          </div>
                          {book.latestBuyer && (
                            <div className="mt-2 pt-2 border-t border-gray-200">
                              <p className="text-xs text-gray-500">
                                <span className="font-semibold">Owner:</span>{" "}
                                <span className="font-mono">{book.latestBuyer.slice(0, 6)}...{book.latestBuyer.slice(-4)}</span>
                              </p>
                            </div>
                          )}
                          <div className="card-actions justify-end mt-3">
                            <button
                              className="btn btn-primary btn-sm w-full"
                              onClick={() => {
                                setBookIdPurchase(book.id.toString());
                                setQuantity("1");
                                setActiveTab('operations');
                                // Scroll to purchase section
                                setTimeout(() => {
                                  document.getElementById('purchase-section')?.scrollIntoView({ behavior: 'smooth' });
                                }, 100);
                              }}
                              disabled={!book.available}
                            >
                              {book.available ? '🛒 Purchase' : 'Out of Stock'}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* My Purchases Tab */}
          {activeTab === 'myPurchases' && (
            <div className="mt-6">
              <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                <h2 className="text-3xl font-bold text-gray-800">🛒 My Purchased Books</h2>
                <button
                  onClick={fetchMyPurchases}
                  className="btn btn-outline btn-sm"
                  disabled={isLoadingMyPurchases || !currentAccount}
                >
                  {isLoadingMyPurchases ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Loading...
                    </>
                  ) : (
                    <>
                      🔄 Refresh
                    </>
                  )}
                </button>
              </div>

              {!currentAccount ? (
                <div className="text-center py-12 bg-white rounded-lg shadow border border-gray-200">
                  <p className="text-gray-500 text-lg">🔐 Please connect your MetaMask account to view your purchases.</p>
                </div>
              ) : isLoadingMyPurchases ? (
                <div className="text-center py-12">
                  <span className="loading loading-spinner loading-lg text-primary"></span>
                  <p className="mt-4 text-gray-600">Loading your purchases...</p>
                </div>
              ) : myBooks.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg shadow border border-gray-200">
                  <p className="text-gray-500 text-lg">📭 No books currently owned.</p>
                  <p className="text-sm text-gray-400 mt-2">Purchase books from the store or marketplace to see them here.</p>
                  <p className="text-xs text-gray-300 mt-1">Note: Books you've sold to other users won't appear here.</p>
                </div>
              ) : (
                <div className="overflow-x-auto bg-white rounded-lg shadow-lg border border-gray-200">
                  <table className="table w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="font-semibold">ID</th>
                        <th className="font-semibold">Title</th>
                        <th className="font-semibold">Author</th>
                        <th className="font-semibold">Store Price</th>
                        <th className="font-semibold">Qty Owned</th>
                        <th className="font-semibold">Listing Status</th>
                        <th className="font-semibold">Total Paid</th>
                        <th className="font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {myBooks.map((book) => (
                        <tr key={book.id} className="hover:bg-gray-50">
                          <td className="font-bold text-primary">{book.id}</td>
                          <td className="font-medium">{book.title}</td>
                          <td>{book.author}</td>
                          <td className="font-semibold">{parseFloat(book.price).toFixed(4)} ETH</td>
                          <td>
                            <span className="badge badge-info badge-lg">{book.purchasedQuantity}</span>
                          </td>
                          <td>
                            {book.isListed ? (
                              <div className="flex flex-col gap-1">
                                <span className="badge badge-success">✅ Listed</span>
                                <span className="text-xs text-gray-600">Price: {book.listingPrice} ETH</span>
                                <span className="text-xs text-gray-600">Qty: {book.listingQuantity}</span>
                              </div>
                            ) : (
                              <span className="badge badge-ghost">Not Listed</span>
                            )}
                          </td>
                          <td className="font-semibold">
                            {(parseFloat(book.price) * book.purchasedQuantity).toFixed(4)} ETH
                          </td>
                          <td>
                            <div className="flex flex-col gap-2 min-w-[200px]">
                              <div className="flex gap-2 items-center">
                                <input
                                  type="number"
                                  min="1"
                                  max={book.purchasedQuantity}
                                  defaultValue="1"
                                  className="input input-bordered input-sm w-16"
                                  id={`listQuantity-${book.id}`}
                                />
                                <input
                                  type="number"
                                  step="0.001"
                                  min="0.001"
                                  placeholder="Price"
                                  className="input input-bordered input-sm w-20"
                                  id={`listPrice-${book.id}`}
                                />
                                <button
                                  className="btn btn-success btn-sm"
                                  onClick={async () => {
                                    const quantityInput = document.getElementById(`listQuantity-${book.id}`) as HTMLInputElement;
                                    const priceInput = document.getElementById(`listPrice-${book.id}`) as HTMLInputElement;
                                    const quantity = parseInt(quantityInput.value) || 1;
                                    const price = parseFloat(priceInput.value) || 0;
                                    
                                    if (quantity > 0 && quantity <= book.purchasedQuantity && price > 0) {
                                      await handleListForSale(book.id, price, quantity);
                                    } else {
                                      showToast(`Please enter valid quantity (1-${book.purchasedQuantity}) and price (>0)`, 'error');
                                    }
                                  }}
                                  disabled={isListing || book.purchasedQuantity === 0 || book.isListed}
                                >
                                  {isListing ? (
                                    <>
                                      <span className="loading loading-spinner loading-xs"></span>
                                    </>
                                  ) : (
                                    'List'
                                  )}
                                </button>
                              </div>
                              {book.isListed && (
                                <button
                                  className="btn btn-error btn-sm btn-outline"
                                  onClick={async () => {
                                    const result = await cancelListing(book.id);
                                    if (result?.success) {
                                      setTimeout(() => {
                                        fetchMyPurchases();
                                        fetchMarketplaceListings();
                                      }, 2000);
                                    }
                                  }}
                                  disabled={isListing}
                                >
                                  Cancel Listing
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Marketplace Tab */}
          {activeTab === 'marketplace' && (
            <div className="mt-6">
              <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                <h2 className="text-3xl font-bold text-gray-800">🏪 Marketplace - Buy from Users</h2>
                <button
                  onClick={fetchMarketplaceListings}
                  className="btn btn-outline btn-sm"
                  disabled={isLoadingMarketplace}
                >
                  {isLoadingMarketplace ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Loading...
                    </>
                  ) : (
                    <>
                      🔄 Refresh
                    </>
                  )}
                </button>
              </div>

              {isLoadingMarketplace ? (
                <div className="text-center py-12">
                  <span className="loading loading-spinner loading-lg text-primary"></span>
                  <p className="mt-4 text-gray-600">Loading marketplace listings...</p>
                </div>
              ) : marketplaceListings.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg shadow border border-gray-200">
                  <p className="text-gray-500 text-lg">📭 No books listed for sale by users.</p>
                  <p className="text-sm text-gray-400 mt-2">Users can list their purchased books in the "My Purchases" tab.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {marketplaceListings.map((listing: any, index: number) => {
                    const imageUrl = listing.imageUrl || `https://via.placeholder.com/300x400/10B981/FFFFFF?text=${encodeURIComponent(listing.title)}`;
                    return (
                      <div key={`${listing.bookId}-${listing.seller}-${index}`} className="card bg-white shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
                        <figure className="h-64 bg-gradient-to-br from-green-100 to-blue-100">
                          <img 
                            src={imageUrl} 
                            alt={listing.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = `https://via.placeholder.com/300x400/10B981/FFFFFF?text=${encodeURIComponent(listing.title)}`;
                            }}
                          />
                        </figure>
                        <div className="card-body p-4">
                          <h2 className="card-title text-lg font-bold text-gray-800 line-clamp-2 min-h-[3rem]">
                            {listing.title}
                          </h2>
                          <p className="text-gray-600 text-sm">by {listing.author}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xl font-bold text-green-600">
                              {parseFloat(listing.price).toFixed(4)} ETH
                            </span>
                            <span className="badge badge-info">
                              Qty: {listing.quantity}
                            </span>
                          </div>
                          <div className="mt-2 pt-2 border-t border-gray-200">
                            <p className="text-xs text-gray-500">
                              <span className="font-semibold">Seller:</span>{" "}
                              {listing.seller.toLowerCase() === currentAccount?.toLowerCase() 
                                ? <span className="badge badge-info badge-sm">You</span>
                                : <span className="font-mono">{listing.seller.slice(0, 6)}...{listing.seller.slice(-4)}</span>}
                            </p>
                          </div>
                          <div className="card-actions justify-end mt-3">
                            {listing.seller.toLowerCase() === currentAccount?.toLowerCase() ? (
                              <span className="text-xs text-gray-400 w-full text-center">Your listing</span>
                            ) : (
                              <div className="flex gap-2 items-center w-full">
                                <input
                                  type="number"
                                  min="1"
                                  max={listing.quantity}
                                  defaultValue="1"
                                  className="input input-bordered input-sm flex-1"
                                  id={`buyQuantity-${listing.bookId}-${listing.seller}`}
                                />
                                <button
                                  className="btn btn-primary btn-sm"
                                  onClick={async () => {
                                    const quantityInput = document.getElementById(`buyQuantity-${listing.bookId}-${listing.seller}`) as HTMLInputElement;
                                    const quantity = parseInt(quantityInput.value) || 1;
                                    if (quantity > 0 && quantity <= listing.quantity) {
                                      const result = await purchaseFromUser(listing.bookId, listing.seller, quantity);
                                      if (result?.success) {
                                        // Clear the quantity input
                                        if (quantityInput) quantityInput.value = "1";
                                        
                                        // Refresh immediately
                                        fetchMarketplaceListings();
                                        fetchAllBooks();
                                        fetchMyPurchases();
                                        
                                        // Refresh after transaction is confirmed (2 seconds)
                                        setTimeout(() => {
                                          fetchMarketplaceListings();
                                          fetchAllBooks();
                                          fetchMyPurchases();
                                        }, 2000);
                                        
                                        // Refresh again to ensure blockchain state is fully updated (4 seconds)
                                        setTimeout(() => {
                                          fetchMarketplaceListings();
                                          fetchAllBooks();
                                          fetchMyPurchases();
                                        }, 4000);
                                        
                                        // Final refresh for profile tab (6 seconds) - ensures ownership is updated
                                        setTimeout(() => {
                                          if (currentAccount) {
                                            fetchMyPurchases();
                                          }
                                        }, 6000);
                                      }
                                    } else {
                                      showToast(`Please enter a valid quantity (1-${listing.quantity})`, 'error');
                                    }
                                  }}
                                  disabled={isPurchasingFromUser || !currentAccount}
                                >
                                  {isPurchasingFromUser ? (
                                    <>
                                      <span className="loading loading-spinner loading-xs"></span>
                                    </>
                                  ) : (
                                    'Buy'
                                  )}
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="mt-6">
              <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                <h2 className="text-3xl font-bold text-gray-800">👤 User Profile</h2>
                <button
                  onClick={() => {
                    if (currentAccount) {
                      fetchMyPurchases();
                    }
                  }}
                  className="btn btn-outline btn-sm"
                  disabled={!currentAccount}
                >
                  🔄 Refresh
                </button>
              </div>

              {!currentAccount ? (
                <div className="text-center py-12 bg-white rounded-lg shadow border border-gray-200">
                  <p className="text-gray-500 text-lg">🔐 Please connect your MetaMask account to view your profile.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Profile Header */}
                  <div className="card bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg">
                    <div className="card-body">
                      <div className="flex flex-col sm:flex-row items-center gap-4">
                        <div className="avatar placeholder">
                          <div className="bg-white text-blue-600 rounded-full w-20 h-20">
                            <span className="text-3xl font-bold">
                              {currentAccount.slice(2, 4).toUpperCase()}
                            </span>
                          </div>
                        </div>
                        <div className="flex-1 text-center sm:text-left">
                          <h2 className="card-title text-2xl mb-2">Your Profile</h2>
                          <p className="font-mono text-sm opacity-90 break-all">
                            {currentAccount}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Statistics Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Total Books Owned */}
                    <div className="card bg-white shadow-lg border border-gray-200">
                      <div className="card-body">
                        <div className="flex items-center justify-between">
              <div>
                            <p className="text-sm text-gray-500">Books Owned</p>
                            <p className="text-3xl font-bold text-primary">
                              {myBooks.reduce((sum, book) => sum + book.purchasedQuantity, 0)}
                            </p>
              </div>
                          <div className="text-4xl">📚</div>
                        </div>
                      </div>
                    </div>

                    {/* Total Books Purchased */}
                    <div className="card bg-white shadow-lg border border-gray-200">
                      <div className="card-body">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-500">Total Purchased</p>
                            <p className="text-3xl font-bold text-green-600">
                              {myBooks.length}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">Unique titles</p>
                          </div>
                          <div className="text-4xl">🛒</div>
                        </div>
                      </div>
                    </div>

                    {/* Total Value */}
                    <div className="card bg-white shadow-lg border border-gray-200">
                      <div className="card-body">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-500">Total Value</p>
                            <p className="text-3xl font-bold text-purple-600">
                              {myBooks.reduce((sum, book) => sum + (parseFloat(book.price) * book.purchasedQuantity), 0).toFixed(4)}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">ETH</p>
                          </div>
                          <div className="text-4xl">💰</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Active Listings */}
                  <div className="card bg-white shadow-lg border border-gray-200">
                    <div className="card-body">
                      <h3 className="card-title text-xl mb-4">📋 Active Listings</h3>
                      {myBooks.filter(book => book.isListed).length > 0 ? (
                        <div className="space-y-2">
                          {myBooks.filter(book => book.isListed).map((book) => (
                            <div key={book.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <div>
                                <p className="font-semibold">{book.title}</p>
                                <p className="text-sm text-gray-600">
                                  {book.listingQuantity} copy(ies) at {book.listingPrice} ETH each
                                </p>
                              </div>
                              <span className="badge badge-success">Listed</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500 text-center py-4">No active listings</p>
            )}
          </div>
        </div>

                  {/* Your Book Collection */}
                  <div className="card bg-white shadow-lg border border-gray-200">
                    <div className="card-body">
                      <h3 className="card-title text-xl mb-4">📖 Your Book Collection</h3>
                      {myBooks.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {myBooks.map((book) => {
                            const imageUrl = book.imageUrl || `https://via.placeholder.com/200x300/4A90E2/FFFFFF?text=${encodeURIComponent(book.title)}`;
                            return (
                              <div key={book.id} className="card bg-gray-50 border border-gray-200 hover:shadow-md transition-shadow">
                                <figure className="h-48 bg-gradient-to-br from-blue-100 to-purple-100">
                                  <img 
                                    src={imageUrl} 
                                    alt={book.title}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      (e.target as HTMLImageElement).src = `https://via.placeholder.com/200x300/4A90E2/FFFFFF?text=${encodeURIComponent(book.title)}`;
                                    }}
                                  />
                                </figure>
                                <div className="card-body p-3">
                                  <h4 className="card-title text-sm font-bold line-clamp-2 min-h-[2.5rem]">
                                    {book.title}
                                  </h4>
                                  <p className="text-xs text-gray-600">by {book.author}</p>
                                  <div className="flex items-center justify-between mt-2">
                                    <span className="badge badge-info badge-sm">
                                      Qty: {book.purchasedQuantity}
                                    </span>
                                    {book.isListed && (
                                      <span className="badge badge-success badge-sm">Listed</span>
                                    )}
                                  </div>
                                  <p className="text-xs text-gray-500 mt-1">
                                    Paid: {(parseFloat(book.price) * book.purchasedQuantity).toFixed(4)} ETH
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <p className="text-gray-500 text-lg">📭 No books in your collection yet.</p>
                          <p className="text-sm text-gray-400 mt-2">Purchase books from the store or marketplace to build your collection!</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <footer className="mt-12 text-center text-gray-500 text-sm">
      </footer>
    </main>
  );
}
