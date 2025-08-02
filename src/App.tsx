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

import { useEffect, useState } from "react";
import { requestTokens } from "./useTokenRequest";
import { Toaster, toast } from "react-hot-toast";

import { useCurrentAccount } from "@mysten/dapp-kit";

async function checkSuiAccountExists(address: string): Promise<boolean> {
  // Accepts 0x-prefixed hex strings up to 64 chars (Sui address format)
  const isFormatValid = /^0x[a-fA-F0-9]{64}$/.test(address);
  return isFormatValid;
}

function App() {
  const [showModal, setShowModal] = useState(false);
  const [wallet, setWallet] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedChain, setSelectedChain] = useState("");

  const currentAccount = useCurrentAccount();

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setWallet(value);
    setMessage("");

    const isFormatValid = /^0x[a-fA-F0-9]{64}$/.test(value);
    if (!isFormatValid) {
      setIsValid(false);
      return;
    }

    const exists = await checkSuiAccountExists(value);
    setIsValid(exists);
    console.log("Exists:", exists);
  };

  const handleRequest = async () => {
    setLoading(true);
    setMessage("");

    try {
      const res = await requestTokens(wallet);

      if (res.transactionHash) {
        toast.success(
          <span>
            Tokens requested!{" "}
            <a
              href={`https://suivision.xyz/txblock/${res.transactionHash}?network=testnet`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-300"
            >
              View on Explorer
            </a>
          </span>
        );
      } else {
        toast.success("Tokens requested successfully!");
        setMessage(res.message);
      }
    } catch (err: any) {
      const errorCode = err?.response?.error?.code;
      const retryAfter = err?.response?.error?.retryAfter;

      if (errorCode === "RATE_LIMIT_EXCEEDED") {
        const hours = (retryAfter / 3600).toFixed(2);
        toast.error(`Rate limit exceeded. Try again in ${hours} hour(s).`);
      } else {
        toast.error("Failed to request tokens. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentAccount?.address) {
      setWallet(currentAccount.address);
      setIsValid(true);
    }
  }, [currentAccount]);

  return (
    <div className="bg-[url(../public/sui-bg.png)] bg-no-repeat bg-cover bg-[#171620] min-h-screen">
      <Navbar />
      <Toaster position="top-center" />

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
              value={selectedChain}
              onChange={(e) => setSelectedChain(e.target.value)}
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

            {message && (
              <p className="text-xs text-center mb-3 text-white">{message}</p>
            )}

            <button
              onClick={handleRequest}
              disabled={!wallet || !isValid || !selectedChain || loading}
              className={`w-full py-3 rounded text-xs md:text-md font-medium flex items-center justify-center gap-2 transition duration-200 ${
                !wallet || !isValid || !selectedChain || loading
                  ? "bg-[#091001] cursor-not-allowed text-gray-300"
                  : "bg-[#050911] hover:bg-blue-600 text-white cursor-pointer"
              }`}
            >
              {loading ? "Requesting..." : "Request Tokens"}
              {!loading && <ArrowRightIcon size={16} />}
            </button>
          </div>
        </div>
      </div>
      <RateLimitModal open={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}

export default App;
