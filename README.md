# 🚀 Tradix - Trading Flow Automation Engine

[![Tradix CI](https://github.com/hanuvadlamudi/tradix-trading-flow-automation/actions/workflows/ci.yml/badge.svg)](https://github.com/hanuvadlamudi/tradix-trading-flow-automation/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Vanilla JS](https://img.shields.io/badge/JavaScript-ES6%2B-blue.svg)](js/app.js)
[![CSS3](https://img.shields.io/badge/Design-Custom%20Glassmorphism-purple.svg)](css/design-system.css)

**Tradix** is a modern, web-based visual trading flow automation platform. It enables traders and algorithm developers to visually build, evaluate, and execute automated trading flows using custom trigger blocks, technical indicators, risk management rules, and automated execution node pipelines.

---

## 🌟 Key Features

- ⚡ **Visual Flow Canvas**: Connect market triggers, technical indicators (RSI, EMA), and risk guards to automated order execution nodes with live SVG wires and visual status feedback.
- 📊 **Real-Time Market Tick Feed**: Built-in simulated market data engine generating real-time price feeds and dynamic indicator updates for `BTC/USDT`, `ETH/USDT`, and `SOL/USDT`.
- 🛡️ **Risk Guard Manager**: Position size caps, drawdown protection, and automated stop loss rule nodes.
- 📑 **Live Order Console & Ledger**: Real-time execution logs displaying order triggers, timestamps, trade prices, and strategy metadata.
- 📈 **Performance Dashboard**: Real-time tracking of PnL, strategy win rates, total trade count, and drawdown statistics.
- 🎨 **Workstation Dark Theme**: High-contrast, glassmorphism dark aesthetic designed for trading terminals.

---

## 📐 Architecture & Flow Execution Pipeline

```
  +------------------+       +-------------------+       +--------------------+       +--------------------+
  | Market Data Tick | ----> | Indicator Filter  | ----> |  Risk Guard Check  | ----> | Automated Execution|
  |  (Price Feed)    |       |   (RSI / EMA)     |       | (Drawdown & Size)  |       |  (Order Ledger)    |
  +------------------+       +-------------------+       +--------------------+       +--------------------+
```

---

## 📁 Repository Structure

```
tradix-trading-flow-automation/
├── .github/
│   └── workflows/
│       └── ci.yml                 # GitHub Actions verification & CI workflow
├── css/
│   ├── design-system.css          # Color tokens, typography, glassmorphism & themes
│   └── main.css                   # Layouts, node cards, canvas wires & responsiveness
├── js/
│   ├── components/
│   │   ├── Analytics.js          # PnL & strategy win rate counters
│   │   ├── FlowCanvas.js         # Visual node builder & SVG connection graph
│   │   ├── OrderConsole.js       # Live execution log & order ledger
│   │   └── SignalMonitor.js      # Ticker feeds & technical indicator panels
│   ├── utils/
│   │   ├── FlowEngine.js         # Strategy pipeline rule evaluator
│   │   └── MarketData.js         # Simulated ticker stream & indicator math (RSI, EMA)
│   └── app.js                    # Main application orchestrator
├── index.html                     # Semantic HTML5 web application interface
├── README.md                      # Project documentation
└── LICENSE                        # MIT License
```

---

## ⚡ Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/hanuvadlamudi/tradix-trading-flow-automation.git
cd tradix-trading-flow-automation
```

### 2. Run Locally
Because Tradix uses native ES6 JavaScript modules, you can serve the application using any static HTTP server or development server:

#### Option A: Using Python SimpleHTTP Server
```bash
python -m http.server 8000
```
Open [http://localhost:8000](http://localhost:8000) in your web browser.

#### Option B: Using Node `npx serve` or Live Server
```bash
npx serve .
```

---

## 🧪 CI/CD & Automated Workflows

This repository contains an automated GitHub Actions pipeline defined in [`.github/workflows/ci.yml`](.github/workflows/ci.yml).
- **Trigger**: Every push or pull request to the `main` branch.
- **Validation**: Checks file integrity, directory structure, essential CSS styling sheets, and module entrypoints.

---

## 📜 License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for more details.
