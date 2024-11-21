## 🌐 TON Blockchain Payment Demo

This project demonstrates how to integrate with the TON blockchain for seamless payments and wallet connectivity. Built using **Vite**, it supports payments in **Toncoin**, **USDT** and **Notcoin**. Additionally, the app fetches and displays the real-time **Toncoin exchange rate** using the **CoinGecko API**.

### 🚀 Quick Start

#### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 16+)
- [npm](https://www.npmjs.com/)

#### Installation

1. Clone the repository:

```bash
git clone https://github.com/mikbolshakov/ton-payment.git
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to the provided local URL (usually `http://localhost:5173`).

> ⚠️ **Note:** The project does not require `.env` file.

### 🛠️ How It Works

- **Wallet Connection**:
- Uses TonConnect to establish a secure connection with a TON wallet.
- Displays the wallet address after a successful connection.

- **Payment Integration**:
- Multiple payment options for Toncoin, USDT and Notcoin.
- Starts the transaction process.

- **Exchange Rate Display**:
- Fetches the latest Toncoin-to-USD conversion rate using CoinGecko.
- Real-time updates to reflect current market trends.

### 🌍 Built With

- **Vite**: Lightning-fast development environment.
- **React**: Modern UI library for building interactive interfaces.
- **TonConnect**: Simplified wallet integration with the TON blockchain.
- **CoinGecko API**: For fetching exchange rates.
