import { CircleIcon, GithubLogoIcon } from "@phosphor-icons/react";
// import { useState } from "react";
import { ConnectButton } from "@mysten/dapp-kit";

export default function Navbar() {
  return (
    <nav className="w-full px-6 py-3 flex items-center justify-between">
      {/* Left: Logo and Beta */}
      <div className="flex items-center space-x-3">
        <div className="flex items-center font-semibold text-3xl">
          <span className="text-white">Sui</span>
          <span className="text-blue-600">Drop</span>
        </div>
      </div>

      {/* Right: Status, GitHub, Connect Wallet */}
      <div className="flex items-center space-x-4 text-sm text-gray-300">
        {/* Status */}
        <div className="hidden sm:flex flex items-center space-x-1">
          <CircleIcon size={16} className="text-[#5CFF1A]" />
          <span>100% online</span>
        </div>

        {/* GitHub */}
        <a
          href="https://github.com/dennispaul8/suifaucet-template"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white"
        >
          <GithubLogoIcon size={24} />
        </a>

        {/* Connect Wallet Button */}
        {/* <button className="bg-blue-600 text-white px-4 py-1.5 rounded-md text-sm hover:bg-blue-700 transition">
          Connect Wallet
        </button> */}
        <ConnectButton />
      </div>
    </nav>
  );
}
