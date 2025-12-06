# 🚀 Complete Project Setup Guide - From Scratch

## Step-by-Step Instructions

---

## **STEP 1: Start Hardhat Local Blockchain**

**Open Terminal 1** and run:

```bash
cd "/Users/csuftitan/Desktop/Final Project/Book-Store-DApp"
npx hardhat node
```

**What you should see:**
- List of 20 test accounts with 10000 ETH each
- Message: "Started HTTP and WebSocket JSON-RPC server at http://127.0.0.1:8545/"
- **⚠️ KEEP THIS TERMINAL RUNNING!**

**Example output:**
```
Account #0: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 (10000 ETH)
Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
...
Started HTTP and WebSocket JSON-RPC server at http://127.0.0.1:8545/
```

---

## **STEP 2: Configure MetaMask Network**

### **2.1 Add Hardhat Local Network to MetaMask**

1. **Open MetaMask** extension in your browser

2. **Click the network dropdown** (top left, shows current network like "Ethereum Mainnet")

3. **Click "Add Network"** → **"Add a network manually"**

4. **Enter these EXACT values:**

   | Field | Value |
   |-------|-------|
   | **Network Name** | `Hardhat Local` |
   | **New RPC URL** | `http://127.0.0.1:8545` |
   | **Chain ID** | `31337` |
   | **Currency Symbol** | `ETH` |
   | **Block Explorer URL** | (leave blank) |

5. **Click "Save"**

   ⚠️ **Important:** 
   - RPC URL MUST include `http://` (not just `127.0.0.1:8545`)
   - Chain ID MUST be `31337` (not 1337 or any other number)
   - Ignore any warnings MetaMask shows (they're normal for local networks)

6. **MetaMask will automatically switch to "Hardhat Local" network**

---

### **2.2 Import Owner Account (Account #0)**

**Why?** Only Account #0 can add books (it's the contract owner).

1. **In MetaMask**, click the **account icon** (circle/profile icon at top right)

2. **Click "Import account"**

3. **Select "Private Key"**

4. **Paste this private key:**
   ```
   0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
   ```

5. **Click "Import"**

6. **You should now see:**
   - Account #0: `0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266`
   - Balance: **10000 ETH** (on Hardhat Local network)

7. **Switch to Account #0** if not already selected

---

## **STEP 3: Compile Smart Contract**

**Open Terminal 2** (new terminal window) and run:

```bash
cd "/Users/csuftitan/Desktop/Final Project/Book-Store-DApp"
npx hardhat compile
```

**Expected output:**
```
Compiled 1 Solidity file successfully
```

---

## **STEP 4: Deploy Smart Contract**

**In Terminal 2** (same as Step 3), run:

```bash
npx hardhat run scripts/deploy.ts --network localhost
```

**Expected output:**
```
BookStore deployed to: 0x[YOUR_CONTRACT_ADDRESS]
```

**📝 IMPORTANT:** Copy the deployed contract address! (e.g., `0x5FbDB2315678afecb367f032d93F642f64180aa3`)

---

## **STEP 5: Update Contract Address in Frontend**

1. **Open `app/page.tsx`** in your editor

2. **Find line 74:** `const contractAddress = "...";`

3. **Replace the address** with your deployed contract address from Step 4

   **Example:**
   ```typescript
   const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
   ```

4. **Save the file**

---

## **STEP 6: Start Frontend Development Server**

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

## **STEP 7: Access the Application**

1. **Open your browser**

2. **Go to:** `http://localhost:3000`

3. **You should see:**
   - Title: "Book Store"
   - Button: **"Connect to Contract"**

---

## **STEP 8: Connect MetaMask to DApp**

1. **On `localhost:3000`**, click **"Connect to Contract"** button

2. **MetaMask popup will appear:**
   - Click **"Next"**
   - Click **"Connect"** to approve

3. **After connection**, you should see **3 sections**:
   - **Purchase Book** (left)
   - **Add Book** (middle) - Owner only
   - **Get Book** (right)

**Verify:**
- ✅ You're on **"Hardhat Local"** network in MetaMask
- ✅ You're using **Account #0** (owner account)
- ✅ Account shows **10000 ETH**

---

## **STEP 9: Test the Application**

### **Test 1: Add a Book (Owner Only)**

1. **In the "Add Book" section**, fill in:
   - **Title:** `The Great Gatsby`
   - **Author:** `F. Scott Fitzgerald`
   - **Price:** `0.1` (in ETH)
   - **Stock:** `10` (number of books)

2. **Click "Add Book"** button

3. **MetaMask will prompt** - **confirm the transaction**

4. **Wait for confirmation**

5. **You should see:** "Book added successfully!"

### **Test 2: Get Book Details**

1. **In the "Get Book" section:**
   - Enter **Book ID:** `1`

2. **Click "Get Book"** button

3. **You should see book details:**
   - Title: The Great Gatsby
   - Author: F. Scott Fitzgerald
   - Price: 0.1 ETH
   - Stock: 10

### **Test 3: Purchase a Book**

1. **In the "Purchase Book" section:**
   - Enter **Book ID:** `1`
   - Enter **Quantity:** `2`

2. **Click "Purchase"** button

3. **MetaMask will prompt** - **confirm the transaction**

4. **Make sure you send enough ETH** (price × quantity = 0.1 × 2 = 0.2 ETH)

5. **Wait for confirmation**

6. **You should see:** "Book purchased successfully!"

---

## **Terminal Summary**

You need **3 terminal windows** running:

| Terminal | Command | Status |
|----------|---------|--------|
| **Terminal 1** | `npx hardhat node` | ✅ Keep running |
| **Terminal 2** | `npx hardhat compile`<br>`npx hardhat run scripts/deploy.ts --network localhost` | ✅ One-time (can close after) |
| **Terminal 3** | `npm run dev` | ✅ Keep running |

---

## **Troubleshooting**

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

### ❌ "Unable to connect to Hardhat Local" in MetaMask
- Make sure Hardhat node is running (Terminal 1)
- Check RPC URL in MetaMask: `http://127.0.0.1:8545` (with `http://`)
- Verify Chain ID is `31337`
- Try removing and re-adding the network

### ❌ "Only the owner can perform this action"
- You're not using Account #0 (owner)
- Import Account #0 using private key: `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`
- Switch to Account #0 in MetaMask
- Refresh the page and reconnect

### ❌ Contract not found / Transaction fails
- Make sure contract address in `app/page.tsx` matches deployed address
- Redeploy contract and update address
- Refresh browser page

### ❌ MetaMask not connecting
- Make sure you're on "Hardhat Local" network
- Refresh the browser page
- Check browser console (F12) for errors

---

## **Quick Reference**

### **MetaMask Network Settings:**
- **Network Name:** `Hardhat Local`
- **RPC URL:** `http://127.0.0.1:8545`
- **Chain ID:** `31337`
- **Currency Symbol:** `ETH`

### **Owner Account (Account #0):**
- **Address:** `0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266`
- **Private Key:** `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`
- **Balance:** 10000 ETH
- **Role:** Contract Owner (can add books)

### **Quick Commands:**
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

## **Success Checklist**

✅ Hardhat node running on port 8545  
✅ MetaMask connected to "Hardhat Local" network (Chain ID 31337)  
✅ Account #0 imported with 10000 ETH  
✅ Contract compiled successfully  
✅ Contract deployed to localhost  
✅ Contract address updated in `app/page.tsx`  
✅ Frontend running on `http://localhost:3000`  
✅ MetaMask connected to DApp  
✅ Can add books (as owner)  
✅ Can view book details  
✅ Can purchase books  

---

**You're all set! 🚀**

Follow these steps in order, and your Book Store DApp will be up and running!

