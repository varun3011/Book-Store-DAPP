# 📚 BookVerse - Decentralized Book Store DApp

A modern, decentralized book marketplace built on Ethereum blockchain using Next.js, Hardhat, and MetaMask. BookVerse allows users to buy, sell, and manage books in a peer-to-peer marketplace with full ownership tracking and profit analytics.

## 🌟 Features

### For All Users
- **📖 Browse Books**: View all available books in the store with beautiful card-based layout
- **🔍 Advanced Search & Filtering**: 
  - Filter by genre (Fiction, Non-Fiction, Science Fiction, Fantasy, etc.)
  - Search by book title or author name
  - Filter by price range (min/max)
- **🛒 Purchase Books**: Direct purchase from the store with instant ownership
- **🏪 Marketplace**: Buy books from other users at their listed prices
- **📤 List Books for Sale**: List your purchased books on the marketplace
- **💰 Track Sales & Profit**: View your sales history with profit calculations
- **❤️ Favorites/Whitelist**: Add books to your favorites list
- **📚 Book Viewer**: Read dummy content for books you own
- **👤 User Profile**: 
  - View your book collection
  - See total books owned, purchased, and total value
  - Track active listings
  - View sales history and profit

### For Admin (Account #2)
- **➕ Add Books**: Add new books to the store (restricted to Account #2)
- **✏️ Update Books**: Edit book details (title, author, price, stock, image, genre)
- **🗑️ Delete Books**: Remove books from the store
- **📊 Admin Dashboard**: 
  - View total books listed in store
  - Manage all books from Profile tab
  - Track revenue from store sales
  - See all sales history

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn
- MetaMask browser extension
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/varun3011/Book-Store-DAPP.git
   cd Book-Store-DApp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Hardhat network**
   - The project uses Hardhat's local blockchain network
   - No additional configuration needed

### Running the Application

#### Terminal 1: Start Hardhat Node
```bash
npx hardhat node
```
This will start a local Ethereum node on `http://127.0.0.1:8545` with 20 test accounts pre-funded with 10,000 ETH each.

#### Terminal 2: Deploy the Contract
```bash
npx hardhat run scripts/deploy.ts --network localhost
```
Copy the deployed contract address from the output. You'll need to update this in `app/page.tsx` (around line 806).

#### Terminal 3: Start the Frontend
```bash
npm run dev
```
The application will be available at `http://localhost:3000`

### MetaMask Setup

1. **Add Hardhat Network to MetaMask**:
   - Network Name: `Hardhat Local`
   - RPC URL: `http://127.0.0.1:8545`
   - Chain ID: `31337`
   - Currency Symbol: `ETH`

2. **Import Test Accounts**:
   - Account #1 (Store Owner): `0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266`
   - Account #2 (Book Manager/Admin): `0x70997970C51812dc3A010C7d01b50e0d17dc79C8`
   - Private keys are available in Hardhat's default accounts

3. **Connect MetaMask**: Click "Connect MetaMask Wallet" on the application

## 📋 Project Structure

```
Book-Store-DApp/
├── contracts/
│   └── BookStore.sol          # Main smart contract
├── scripts/
│   └── deploy.ts              # Deployment script
├── app/
│   ├── page.tsx               # Main frontend component
│   ├── globals.css            # Global styles
│   └── layout.tsx             # App layout
├── public/                    # Static assets
├── hardhat.config.js          # Hardhat configuration
└── package.json               # Dependencies
```

## 🎯 Key Functionalities

### Book Management
- **Add Books**: Only Account #2 can add books to the store
- **Update Books**: Admin can modify book details (title, author, price, stock, image, genre)
- **Delete Books**: Admin can remove books from the store
- **View Books**: All users can browse and search books

### Purchase Flow
1. Browse books in "All Books" tab
2. Click on a book card to open purchase modal
3. Select quantity and confirm purchase
4. Book ownership is recorded on blockchain

### Marketplace
1. Purchase a book from the store
2. Go to "My Purchases" tab
3. List your book for sale with custom price
4. Other users can buy from your listing
5. Track your sales and profit in Profile tab

### Admin Features
- Access "Operations" tab (only visible to Account #2)
- Add new books with all details
- Manage all books from Profile tab
- View total revenue from store sales
- Update or delete any book

## 🔧 Technology Stack

- **Frontend**: Next.js 13+, React, TypeScript
- **Styling**: Tailwind CSS, DaisyUI
- **Blockchain**: Ethereum, Hardhat
- **Smart Contracts**: Solidity
- **Web3**: Ethers.js
- **Wallet**: MetaMask

## 📝 Smart Contract Functions

### Public Functions
- `purchaseBook(uint256 _bookId, uint256 _quantity)` - Purchase books from store
- `listForSale(uint256 _bookId, uint256 _price, uint256 _quantity)` - List book on marketplace
- `purchaseFromUser(uint256 _bookId, address _seller, uint256 _quantity)` - Buy from marketplace
- `updateListing(uint256 _bookId, uint256 _newPrice, uint256 _newQuantity)` - Update listing
- `cancelListing(uint256 _bookId)` - Cancel active listing
- `addToWhitelist(uint256 _bookId)` - Add book to favorites
- `removeFromWhitelist(uint256 _bookId)` - Remove from favorites

### Admin Functions (Account #2 only)
- `addBook(...)` - Add new book
- `updateBook(...)` - Update book details
- `deleteBook(uint256 _bookId)` - Delete book

### View Functions
- `getBook(uint256 _bookId)` - Get book details
- `getAllBooks()` - Get all books
- `getSalesHistory(address _user)` - Get user's sales history
- `getTotalProfit(address _user)` - Calculate total profit
- `getWhitelistedBooks(address _user)` - Get user's favorites

## 🎨 UI Features

- **Modern Design**: Glass morphism effects, gradient backgrounds, smooth animations
- **Responsive Layout**: Works on desktop, tablet, and mobile
- **Card-based Display**: Beautiful book cards with images
- **Search & Filter**: Advanced filtering by genre, text, and price
- **Modal Interfaces**: Clean modals for purchases and book viewing
- **Toast Notifications**: User-friendly feedback for all actions

## 🔐 Security Features

- **Access Control**: Only Account #2 can add/update/delete books
- **Ownership Verification**: Blockchain-based ownership tracking
- **Transaction Validation**: All transactions verified on blockchain
- **Price Tracking**: Records original purchase price for profit calculation

## 📊 Analytics & Tracking

- **Sales History**: Complete record of all sales with timestamps
- **Profit Calculation**: Automatic profit calculation (sell price - purchase price)
- **Revenue Tracking**: Admin can see total revenue from store sales
- **Ownership Stats**: Track total books owned, purchased, and value

## 🐛 Troubleshooting

### Contract not connecting
- Ensure Hardhat node is running on port 8545
- Check MetaMask is connected to Hardhat Local network
- Verify contract address is updated in `app/page.tsx`

### Transactions failing
- Ensure you have enough ETH in your account
- Check Hardhat node is running
- Verify MetaMask is unlocked

### Books not showing
- Refresh the page
- Check browser console for errors
- Ensure contract is deployed and address is correct

## 📄 License

This project is open source and available for educational purposes.

## 👤 Author

**varun3011**
- GitHub: [@varun3011](https://github.com/varun3011)

## 🙏 Acknowledgments

- Built with Hardhat and Next.js
- Uses Ethers.js for blockchain interactions
- Styled with Tailwind CSS and DaisyUI

