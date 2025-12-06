# Complete Guide to Start the Book Store DApp

## Prerequisites
- ✅ Node.js installed (v18.x LTS recommended, but v22 works with warnings)
- ✅ MetaMask browser extension installed
- ✅ npm or yarn package manager

---

## Step 1: Install Dependencies

Open terminal in the project directory and run:

```bash
npm install
```

This will install all required packages including:
- Next.js
- Hardhat
- ethers.js
- Tailwind CSS & DaisyUI
- React & TypeScript

---

## Step 2: Start Hardhat Local Blockchain

**Open Terminal 1** and run:

```bash
npx hardhat node
```

⚠️ **Keep this terminal running!** You should see:
- A list of 20 test accounts with 10000 ETH each
- The message that Hardhat is running on `http://127.0.0.1:8545`

**Important:** If you get a port conflict error, kill the process on port 8545:
```bash
lsof -ti:8545 | xargs kill
```

---

## Step 3: Compile the Smart Contract

**Open Terminal 2** (keep Terminal 1 running) and run:

```bash
npx hardhat compile
```

You should see:
```
Compiled 1 Solidity file successfully
```

This creates the `artifacts/` folder with the contract ABI that the frontend needs.

---

## Step 4: Deploy the Smart Contract

**In Terminal 2** (same as Step 3), run:

```bash
npx hardhat run scripts/deploy.ts --network localhost
```

📝 **Copy the deployed contract address!** It will look like:
```
BookStore deployed to: 0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9
```

---

## Step 5: Update Contract Address in Frontend

1. Open `app/page.tsx`
2. Find line 74: `const contractAddress = "..."`
3. Replace with your deployed contract address from Step 4

Example:
```typescript
const contractAddress = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";
```

---

## Step 6: Configure MetaMask

### 6.1 Add Hardhat Local Network

1. Open MetaMask
2. Click the network dropdown (top left)
3. Click **"Add Network"** → **"Add a network manually"**
4. Enter these details:
   - **Network Name:** `Hardhat Local`
   - **New RPC URL:** `http://127.0.0.1:8545`
   - **Chain ID:** `31337`
   - **Currency Symbol:** `ETH`
   - **Block Explorer URL:** (leave blank)
5. Click **"Save"**

### 6.2 Import Test Account (with 10000 ETH)

1. In MetaMask, click the account icon (circle)
2. Click **"Import account"**
3. Select **"Private Key"**
4. Paste this private key (Account #0 - Owner):
   ```
   0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
   ```
5. Click **"Import"**
6. Switch to **"Hardhat Local"** network
7. Verify you see **10000 ETH** in your account

**Account #0 Details:**
- Address: `0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266`
- This is the **owner** account (can add books)

---

## Step 7: Start the Frontend

**Open Terminal 3** (keep Terminals 1 & 2 running) and run:

```bash
npm run dev
```

You should see:
```
- ready started server on 0.0.0.0:3000
- Local: http://localhost:3000
```

---

## Step 8: Access the Application

1. Open your browser
2. Go to: `http://localhost:3000`
3. You should see the **"Book Store"** page
4. Click **"Connect to Contract"** button
5. MetaMask will prompt you to connect - **approve it**
6. Your account should now be connected!

---

## Step 9: Test the Application

### Add a Book (Owner Only - Account #0)
1. Fill in the "Add Book" form:
   - **Title:** e.g., "The Great Gatsby"
   - **Author:** e.g., "F. Scott Fitzgerald"
   - **Price:** e.g., `0.1` (in ETH)
   - **Stock:** e.g., `10`
2. Click **"Add Book"** button
3. MetaMask will prompt - **confirm the transaction**
4. Wait for confirmation

### Get Book Details
1. Enter **Book ID:** `1` (first book)
2. Click **"Get Book"** button
3. You should see the book details displayed

### Purchase a Book
1. Enter **Book ID:** `1`
2. Enter **Quantity:** e.g., `2`
3. Click **"Purchase"** button
4. MetaMask will prompt - **confirm the transaction**
5. Make sure you send enough ETH (price × quantity)

---

## Summary of Terminal Windows

You need **3 terminal windows** running simultaneously:

| Terminal | Command | Purpose |
|----------|---------|---------|
| **Terminal 1** | `npx hardhat node` | Local blockchain (keep running) |
| **Terminal 2** | `npx hardhat compile`<br>`npx hardhat run scripts/deploy.ts --network localhost` | Compile & deploy (one-time) |
| **Terminal 3** | `npm run dev` | Frontend server (keep running) |

---

## Troubleshooting

### Port 8545 already in use
```bash
lsof -ti:8545 | xargs kill
npx hardhat node
```

### Port 3000 already in use
```bash
lsof -ti:3000 | xargs kill
npm run dev
```

### Contract not found error
- Make sure you updated the contract address in `app/page.tsx`
- Redeploy the contract and copy the new address

### MetaMask not connecting
- Make sure you're on "Hardhat Local" network
- Make sure Hardhat node is running (Terminal 1)
- Refresh the browser page

### Node.js version warning
- Hardhat supports Node.js 18.x LTS
- v22 works but may have issues
- Consider using `nvm` to switch versions:
  ```bash
  nvm install 18
  nvm use 18
  ```

---

## Quick Start Commands (Copy & Paste)

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

## Test Accounts Reference

All accounts have **10000 ETH**. Here are a few:

| Account | Address | Private Key | Use Case |
|---------|---------|-------------|----------|
| #0 | `0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266` | `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80` | **Owner** (add books) |
| #1 | `0x70997970C51812dc3A010C7d01b50e0d17dc79C8` | `0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d` | Buyer |
| #2 | `0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC` | `0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a` | Buyer |

You're all set! 🚀

