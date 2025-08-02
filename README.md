---
## 🌊 SuiDrop – Sui Testnet Token Faucet

SuiDrop is a sleek, developer-friendly testnet faucet interface built with **Vite + React** and powered by **Sui's blockchain infrastructure**. Developers can request testnet tokens using their wallet address or directly connect their wallet via Mysten's dapp-kit integration.
---

### 🚀 Features

- ⚡ Fast and responsive UI (built with **Vite + TailwindCSS**)
- 🔒 Address format validation
- 🔗 Wallet connect support via `@mysten/dapp-kit`
- 🌐 Works with both **manual wallet input** and **connected wallet**
- 🚫 Rate-limiting with feedback via **React Hot Toast**
- 🔍 Direct transaction links to [SuiVision](https://suivision.xyz/)
- 💡 Simple environment-based API configuration

---

### 📸 Demo

[Live App →](https://suifaucet-template.vercel.app)
![preview](./screenshot.png)

---

### 🧑‍💻 Getting Started

#### 1. Clone the repo

```bash
git clone https://github.com/dennispaul8/suifaucet-template.git
cd suifaucet-template
```

#### 2. Install dependencies

```bash
npm install
```

> Or use `pnpm install` / `yarn install` depending on your setup.

#### 3. Create `.env` file

Create a `.env` file in the root with the following:

```env
VITE_API_BASE_URL=https://sui-token-faucet-distribution-production.up.railway.app
```

Make sure your backend supports CORS.

#### 4. Run locally

```bash
npm run dev or pnpm dev
```

The app will be available at [http://localhost:5173](http://localhost:5173)

---

### ✅ Request Flow

1. Select chain (currently supports `Sui Testnet`)
2. Paste your wallet address **or** connect via wallet
3. Click “Request Tokens”
4. Receive a success toast with explorer link
   Example: [View on Suivision](https://suivision.xyz/txblock/0x123...)

---

### 📁 Project Structure

```bash
src/
├── components/
│   ├── Navbar.tsx
│   └── RateLimitModal.tsx
├── useTokenRequest.ts
├── App.tsx
├── main.tsx
└── assets/
```

---

### 🙌 Acknowledgments

- [First Movers](https://x.com/firstmovers_) – for creating the bounty
- [H2O](https://x.com/H2oNodes) – for sponsoring the bounty
- [Mysten Labs](https://mystenlabs.com/) – for building Sui and dapp-kit
- [SuiVision](https://suivision.xyz/) – for transaction explorers
- [Tailwind CSS](https://tailwindcss.com/) – for rapid UI development

---
