# 📚 Book Store DApp - Complete Step-by-Step Guide

## Project Overview
This is a **Decentralized Book Store Application** built with:
- **Frontend:** Next.js 13 + TypeScript + Tailwind CSS + DaisyUI
- **Smart Contract:** Solidity 0.8.19 (Hardhat)
- **Blockchain:** Ethereum (local Hardhat network)
- **Wallet:** MetaMask integration

---

## Prerequisites

✅ **Node.js** (v18.x LTS recommended, v22 works with warnings)  
✅ **MetaMask** browser extension installed  
✅ **npm** or **yarn** package manager

---

## Step-by-Step Instructions

### **STEP 1: Install Dependencies**

Open terminal in the project directory:

```bash
cd "/Users/csuftitan/Desktop/Final Project/Book-Store-DApp"
npm install
```

**Expected output:** All packages installed successfully

---

### **STEP 2: Start Hardhat Local Blockchain**

**Open Terminal 1** and run:

```bash
npx hardhat node
```

**What you should see:**
- List of 20 test accounts with 10000 ETH each
- Message: "Started HTTP and WebSocket JSON-RPC server at http://127.0.0.1:8545/"
- **⚠️ KEEP THIS TERMINAL RUNNING!**

**If you get port error:**
```bash
lsof -ti:8545 | xargs kill -9
npx hardhat node
```

---

### **STEP 3: Compile Smart Contract**

**Open Terminal 2** (new terminal window) and run:

```bash
cd "/Users/csuftitan/Desktop/Final Project/Book-Store-DApp"
npx hardhat compile
```

**Expected output:**
```
Compiled 1 Solidity file successfully
```

This creates the `artifacts/` folder with contract ABI needed by frontend.

---

### **STEP 4: Deploy Smart Contract**

**In Terminal 2** (same as Step 3), run:

```bash
npx hardhat run scripts/deploy.ts --network localhost
```

**Expected output:**
```
BookStore deployed to: 0x[YOUR_CONTRACT_ADDRESS]
```

**📝 IMPORTANT:** Copy the deployed contract address! (e.g., `0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0`)

---

### **STEP 5: Update Contract Address in Frontend**

1. Open `app/page.tsx` in your editor
2. Find **line 74**: `const contractAddress = "..."`
3. Replace the address with your deployed contract address from Step 4

**Example:**
```typescript
const contractAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
```

**Save the file!**

---

### **STEP 6: Configure MetaMask**

#### **6.1 Add Hardhat Local Network**

1. Open **MetaMask** extension
2. Click **network dropdown** (top left, shows current network)
3. Click **"Add Network"** → **"Add a network manually"**
4. Enter these **exact** values:

   | Field | Value |
   |-------|-------|
   | **Network Name** | `Hardhat Local` |
   | **New RPC URL** | `http://127.0.0.1:8545` |
   | **Chain ID** | `31337` |
   | **Currency Symbol** | `ETH` |
   | **Block Explorer URL** | (leave blank) |

5. Click **"Save"**
6. MetaMask will switch to "Hardhat Local" network

#### **6.2 Import Owner Account (Account #0)**

**Why?** Only the owner account can add books to the store.

1. In MetaMask, click **account icon** (circle at top right)
2. Click **"Import account"**
3. Select **"Private Key"**
4. Paste this private key:
   ```
   0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
   ```
5. Click **"Import"**
6. You should now see **Account #0** with **10000 ETH**

**Account #0 Details:**
- **Address:** `0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266`
- **Balance:** 10000 ETH (on Hardhat Local network)
- **Role:** Contract Owner (can add books)

---

### **STEP 7: Start Frontend Development Server**

**Open Terminal 3** (new terminal window) and run:

```bash
cd "/Users/csuftitan/Desktop/Final Project/Book-Store-DApp"
npm run dev
```

**Expected output:**
```
- ready started server on 0.0.0.0:3000
- Local: http://localhost:3000
```

**⚠️ KEEP THIS TERMINAL RUNNING!**

---

### **STEP 8: Access the Application**

1. Open your browser
2. Go to: **`http://localhost:3000`**
3. You should see the **"Book Store"** page with:
   - Title: "Book Store"
   - Button: **"Connect to Contract"**

---

### **STEP 9: Connect MetaMask to DApp**

1. On `localhost:3000`, click **"Connect to Contract"** button
2. MetaMask popup will appear
3. Click **"Next"** → **"Connect"** to approve
4. After connection, you should see **3 sections**:
   - **Purchase Book** (left)
   - **Add Book** (middle) - Owner only
   - **Get Book** (right)

**Make sure:**
- ✅ You're on **"Hardhat Local"** network in MetaMask
- ✅ You're using **Account #0** (owner account)
- ✅ Account shows **10000 ETH**

---

### **STEP 10: Test the Application**

#### **Test 1: Add a Book (Owner Only)**

1. In the **"Add Book"** section, fill in:
   - **Title:** `The Great Gatsby`
   - **Author:** `F. Scott Fitzgerald`
   - **Price:** `0.1` (in ETH)
   - **Stock:** `10` (number of books available)
2. Click **"Add Book"** button
3. MetaMask will prompt - **confirm the transaction**
4. Wait for confirmation
5. You should see: **"Book added successfully!"**

#### **Test 2: Get Book Details**

1. In the **"Get Book"** section:
   - Enter **Book ID:** `1`
2. Click **"Get Book"** button
3. You should see book details:
   - Title: The Great Gatsby
   - Author: F. Scott Fitzgerald
   - Price: 0.1 ETH
   - Stock: 10

#### **Test 3: Purchase a Book**

1. In the **"Purchase Book"** section:
   - Enter **Book ID:** `1`
   - Enter **Quantity:** `2`
2. Click **"Purchase"** button
3. MetaMask will prompt - **confirm the transaction**
4. Make sure you send enough ETH (price × quantity = 0.1 × 2 = 0.2 ETH)
5. Wait for confirmation
6. You should see: **"Book purchased successfully!"**

---

## Terminal Summary

You need **3 terminal windows** running:

| Terminal | Command | Status |
|----------|---------|--------|
| **Terminal 1** | `npx hardhat node` | ✅ Keep running |
| **Terminal 2** | `npx hardhat compile`<br>`npx hardhat run scripts/deploy.ts --network localhost` | ✅ One-time (can close after) |
| **Terminal 3** | `npm run dev` | ✅ Keep running |

---

## Troubleshooting

### ❌ Port 8545 already in use
```bash
lsof -ti:8545 | xargs kill -9
npx hardhat node
```

### ❌ Port 3000 already in use
```bash
lsof -ti:3000 | xargs kill -9
npm run dev
```

### ❌ "Only the owner can perform this action"
- You're not using Account #0 (owner)
- Import Account #0 using the private key from Step 6.2
- Switch to Account #0 in MetaMask
- Refresh the page and reconnect

### ❌ "Unable to connect to Hardhat Local"
- Make sure Hardhat node is running (Terminal 1)
- Check RPC URL in MetaMask: `http://127.0.0.1:8545`
- Try using `http://localhost:8545` instead

### ❌ Contract not found / Transaction fails
- Make sure contract address in `app/page.tsx` matches deployed address
- Redeploy contract and update address
- Refresh browser page

### ❌ MetaMask not connecting
- Make sure you're on "Hardhat Local" network
- Refresh the browser page
- Check browser console (F12) for errors

---

## Project Structure

```
Book-Store-DApp/
├── app/
│   ├── page.tsx          # Main frontend component
│   ├── layout.tsx        # App layout
│   └── globals.css       # Global styles
├── contracts/
│   └── BookStore.sol     # Smart contract
├── scripts/
│   └── deploy.ts         # Deployment script
├── artifacts/            # Compiled contracts (generated)
├── hardhat.config.js     # Hardhat configuration
├── package.json          # Dependencies
└── README.md             # Project documentation
```

---

## Smart Contract Functions

### Owner Functions (Account #0 only)
- `addBook(title, author, price, stock)` - Add new book to catalog

### Public Functions
- `purchaseBook(bookId, quantity)` - Purchase books with ETH
- `getBook(bookId)` - View book details

---

## Test Accounts Reference

All accounts have **10000 ETH** on Hardhat Local network:

| Account | Address | Private Key | Use Case |
|---------|---------|-------------|----------|
| **#0** | `0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266` | `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80` | **Owner** (add books) |
| #1 | `0x70997970C51812dc3A010C7d01b50e0d17dc79C8` | `0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d` | Buyer |
| #2 | `0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC` | `0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a` | Buyer |

---

## Quick Start Commands

Copy and paste these commands in order:

```bash
# Terminal 1 - Start blockchain
npx hardhat node

# Terminal 2 - Compile & Deploy
npx hardhat compile
npx hardhat run scripts/deploy.ts --network localhost

# Terminal 3 - Start frontend
npm run dev
```

---

## Success Checklist

✅ Hardhat node running on port 8545  
✅ Contract compiled successfully  
✅ Contract deployed to localhost  
✅ Contract address updated in `app/page.tsx`  
✅ MetaMask connected to Hardhat Local network  
✅ Account #0 imported with 10000 ETH  
✅ Frontend running on `http://localhost:3000`  
✅ MetaMask connected to DApp  
✅ Can add books (as owner)  
✅ Can view book details  
✅ Can purchase books  

---

**You're all set! 🚀**

If you encounter any issues, check the Troubleshooting section above or review the browser console (F12) for error messages.

