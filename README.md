# MoveSim - Movement Transaction Simulator

MoveSim is a **Tenderly-style transaction simulator** for the Movement blockchain. It allows developers and users to simulate transaction execution, analyze gas costs, and debug state changes without:
1.  Connecting a wallet
2.  Spending real funds
3.  Setting up a local node

> **Note:** This project features a **Dual Mode Engine** allowing you to switch between instant "Demo Mode" (mock data) and "Live Mode" (actual Movement Testnet interaction).

## 🚀 Features

*   **Instant Simulation:** Run transactions against a forked state.
*   **Gas Profiling:** Breakdown of computation vs. storage gas costs.
*   **State Analysis:** See exactly what resources change (Balance updates, NFT mints).
*   **Security Scanning:** Auto-detection of common Move vulnerabilities.
*   **No Wallet Needed:** Simulate as *any* address.

## 🛠 Tech Stack

*   **Frontend:** React, TypeScript, Tailwind CSS, shadcn/ui
*   **Blockchain:** @aptos-labs/ts-sdk (compatible with Movement)
*   **Visuals:** Recharts, Framer Motion

## 🚦 Getting Started

1.  **Clone the repo:**
    ```bash
    git clone https://github.com/munyanezaarmel/MoveSim
    cd movesim
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev:client
    ```

4.  **Open in browser:**
    Navigate to `http://localhost:5000`

## 📖 How to Use

1.  **Select a Contract:** Use the sidebar to pick a demo contract (e.g., MOVE Coin).
2.  **Choose Function:** Select `transfer` or `mint`.
3.  **Enter Params:** Fill in the arguments (e.g., recipient address, amount).
4.  **Simulate:** Click the play button.
    *   **Demo Mode:** Instant feedback with pre-calculated data.
    *   **Live Mode:** Connects to Movement Testnet to verify chain state.

## 🤝 Contributing

Pull requests are welcome! Please open an issue first to discuss what you would like to change.

## 📄 License

[MIT](https://choosealicense.com/licenses/mit/)
