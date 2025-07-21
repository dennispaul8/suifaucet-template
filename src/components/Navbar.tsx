import { CircleIcon, GithubLogoIcon } from "@phosphor-icons/react";
// import { useState } from "react";

export default function Navbar() {
  return (
    <nav className="w-full px-6 py-3 flex items-center justify-between">
      {/* Left: Logo and Beta */}
      <div className="flex items-center space-x-3">
        <div className="flex items-center font-semibold text-3xl">
          <span className="text-white">Sui</span>
          <span className="text-blue-600">Drop</span>
        </div>
        {/* <span className="text-xl border border-gray-600 rounded-full px-2 py-0.5 text-gray-300">
          Beta
        </span> */}
      </div>

      {/* Right: Status, GitHub, Theme Toggle */}
      <div className="flex items-center space-x-4 text-sm text-gray-300">
        {/* Status */}
        <div className="flex items-center space-x-1">
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

        {/* Theme Toggle */}
        {/* <button
          onClick={() => setDarkMode(!darkMode)}
          className="border border-gray-600 rounded-full p-2"
        >
          <SunIcon size={16} />
        </button> */}
      </div>
    </nav>
  );
}
