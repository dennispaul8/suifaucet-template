// import { useState } from "react";
import {
  ArrowRightIcon,
  ClockIcon,
  DropIcon,
  InfoIcon,
} from "@phosphor-icons/react";
import "./App.css";
import Navbar from "./components/Navbar";
import RateLimitModal from "./components/RateLimitModal";

import { useState } from "react";

async function checkSuiAccountExists(address: string): Promise<boolean> {
  try {
    const objectsRes = await fetch("https://fullnode.testnet.sui.io", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "sui_getOwnedObjects",
        params: [address, { filter: null, options: { showType: false } }],
      }),
    });

    const objects = await objectsRes.json();
    const ownsObjects =
      Array.isArray(objects?.result?.data) && objects.result.data.length > 0;

    if (ownsObjects) return true;

    // Fallback: Check for non-zero balance
    const balanceRes = await fetch("https://fullnode.testnet.sui.io", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "suix_getBalance",
        params: [address],
      }),
    });

    const balance = await balanceRes.json();
    const total = parseInt(balance?.result?.totalBalance || "0", 10);

    return total > 0;
  } catch (err) {
    console.error("Sui RPC error:", err);
    return false;
  }
}

function App() {
  const [showModal, setShowModal] = useState(false);
  const [wallet, setWallet] = useState("");
  const [isValid, setIsValid] = useState(true);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setWallet(value);

    const isFormatValid = /^0x[a-fA-F0-9]{1,64}$/.test(value);
    if (!isFormatValid) {
      setIsValid(false);
      return;
    }

    const exists = await checkSuiAccountExists(value);
    setIsValid(exists);
    console.log("Exists:", exists);
  };

  return (
    <div className="bg-[url(../public/sui-bg.png)] bg-no-repeat bg-cover bg-[#171620] min-h-screen">
      <Navbar />
      <div className="p-10 min-h-screen flex items-center justify-center">
        <div className="w-full md:w-[700px] bg-gradient-to-b from-gray to-[#1e293b] rounded-2xl flex items-center justify-center px-4 py-10">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg w-full p-6 text-white">
            <h1 className="text-xl md:text-2xl font-semibold mb-2 text-center">
              Sui Faucet
            </h1>
            <p className="text-center text-xs md:text-sm text-gray-300 mb-6">
              Get free testnet tokens for development
            </p>

            <div className="bg-white/5 justify-center rounded-lg p-4 mb-4">
              <h3 className="text-sm font-medium mb-1 flex items-center gap-2">
                <InfoIcon size={16} color="#60A5FA" />
                Supported Network
              </h3>
              <hr className="border-gray-500 mb-2" />
              <p className="text-sm text-gray-300 flex items-center gap-2">
                <DropIcon size={16} color="#60A5FA" />
                SUI
              </p>
            </div>

            <div className="flex justify-between items-center text-sm mb-4">
              <span className="text-gray-300">Chain Selection</span>
              <button
                onClick={() => setShowModal(true)}
                className="text-blue-400 hover:underline cursor-pointer flex items-center gap-1 text-xs md:text-sm"
              >
                <ClockIcon size={16} color="#60A5FA" />
                Rate Limits
              </button>
            </div>

            <div className="flex justify-between text-sm items-center mb-4">
              <span className="text-gray-300">Testnet</span>
              <button className=" px-3 py-1 flex items-center gap-1 rounded text-blue-400 text-xs md:text-sm">
                <DropIcon size={16} color="#60A5FA" />
                SUI
              </button>
            </div>

            <select
              name="chain"
              className="w-full text-xs md:text-md p-2 rounded bg-white/10 border border-white/20 text-sm mb-4 focus:outline-none "
            >
              <option className="bg-gray-800 text-white" value="">
                Select Chain
              </option>
              <option className="bg-gray-800 text-white" value="sui">
                Sui
              </option>
            </select>

            <input
              type="text"
              value={wallet}
              onChange={handleChange}
              placeholder="Enter a valid wallet address"
              className="w-full p-2 rounded bg-white/10 border border-white/20 text-sm text-white placeholder-gray-400 mb-4 focus:outline-none"
            />
            {!isValid && (
              <p className="text-red-500 text-xs mb-2">
                Invalid wallet address
              </p>
            )}

            <button className="w-full bg-[#050911] hover:bg-blue-600 cursor-pointer py-2 rounded text-xs md:text-md text-white font-medium flex items-center justify-center gap-2 transition duration-200">
              Request Tokens
              <ArrowRightIcon size={16} />
            </button>
          </div>
        </div>
      </div>
      <RateLimitModal open={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}

export default App;
