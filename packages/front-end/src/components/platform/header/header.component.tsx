import React from "react";
import Link from "next/link";
import UserMenu from "../account/account.component";

export default function Header() {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-indigo-600">
          Real One Chess King
        </div>
        <nav className="space-x-4">
          <Link className="text-gray-700 hover:text-indigo-600" href="/game">
            Play
          </Link>
          <Link
            className="text-gray-700 hover:text-indigo-600"
            href="/statistics"
          >
            Statistics
          </Link>
          <Link
            className="text-gray-700 hover:text-indigo-600"
            href="/my-collection"
          >
            About
          </Link>
          <Link className="text-gray-700 hover:text-indigo-600" href="/roadmap">
            Roadmap
          </Link>
        </nav>
        {/* <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-500">
          Подключить Кошелек
        </button> */}
        {/* <ConnectWalletButton /> */}
        <UserMenu user={{ isLoggedIn: true, nickName: "test" }} />
      </div>
    </header>
  );
}
