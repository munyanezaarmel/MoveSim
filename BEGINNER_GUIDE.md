# 🔰 Beginner's Guide to MoveSim & Movement Blockchain

Welcome! If you are new to blockchain or the Movement ecosystem, this guide will help you understand what this tool does and how to use it.

## 🧐 What is this tool?

**MoveSim** is a "flight simulator" for blockchain transactions.

Before a pilot flies a real plane, they practice in a simulator. Similarly, before you send real money (crypto) on the blockchain, you should simulate it to:
1.  **Check if it will fail** (and save money on gas fees).
2.  **See exactly what will happen** (will my balance go down? by how much?).
3.  **Understand the cost** (how much "Gas" will this burn?).

## 🧪 How to get Test Data?

To use the "Live Mode" effectively, you might want to try simulating with your own address or real tokens.

### 1. Get a Wallet
You need a wallet that supports the Movement network.
*   **Razor Wallet** or **Nightly Wallet** are popular choices.
*   Install the extension and create a new account.
*   Copy your address (it looks like `0x123...abc`).

### 2. Get "Testnet" Tokens (Faucet)
"Testnet" is a playground version of the blockchain. The money isn't real, so you can get it for free!
1.  Go to the [Movement Faucet](https://faucet.movementlabs.xyz/).
2.  Paste your wallet address.
3.  Click "Get MOVE".
4.  Now you have simulated money to test with!

## 🎮 How to use the Simulator

### Step 1: Pick a Mode
*   **Demo Mode (Zap Icon):** Best for just looking around. It doesn't actually talk to the internet. It's instant and predictable. Use this to see how the UI works.
*   **Live Mode (Radio Icon):** Real testing. It talks to the Movement Testnet. Use this when you want to see *actual* current network conditions.

### Step 2: Choose a "Contract"
A **Smart Contract** is just a program that lives on the blockchain.
*   **MOVE Coin:** The standard money of the network. Use this to test sending money.
*   **NFT Token:** Use this to test creating (minting) digital art.

### Step 3: Fill in the Blanks
*   **Sender:** This is "Who is doing the action?". You can paste YOUR address here!
*   **Function:** "What do you want to do?" (e.g., `transfer` = send money).
*   **Arguments:** The details.
    *   `to`: Who are you sending to?
    *   `amount`: How much? (Note: Computers count in small units. `100000000` usually equals `1 MOVE`).

### Step 4: Analyze Results
*   **Gas Used:** Think of this as fuel for the car. More complex actions (like trading) use more gas than simple ones (like sending money).
*   **State Changes:** This is the receipt. It shows: "Address A balance went DOWN, Address B balance went UP".

## ⚠️ Common Errors

*   **INSUFFICIENT_BALANCE:** You tried to send more money than you have.
*   **E_USER_NOT_FOUND:** You tried to send money to an address that doesn't exist on-chain yet (and didn't provide enough gas to create it).

---
*Happy Simulating!* 🚀
