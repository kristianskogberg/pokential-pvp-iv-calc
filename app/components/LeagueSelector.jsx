import React from "react";
import Image from "next/image";
import useStore from "../store/store";

export default function LeagueSelector() {
  const activeTab = useStore((state) => state.activeTab);
  const setActiveTab = useStore((state) => state.setActiveTab);

  function handleClick(value) {
    setActiveTab(value);
  }

  return (
    <div className="flex gap-4 justify-between w-full">
      <button
        onClick={() => handleClick(1500)}
        className={`flex flex-row items-center gap-2 py-2 px-4 rounded-xl ${
          activeTab === 1500 ? "bg-blue-500 text-white font-semibold" : ""
        }`}
      >
        <Image src={`/league_logo.png`} alt={""} width="24" height="24" />
        <span className="hidden sm:block">Great League</span>
        <span className="block sm:hidden">Great</span>
      </button>
      <button
        onClick={() => handleClick(2500)}
        className={`flex flex-row items-center gap-2 py-2 px-4 rounded-xl ${
          activeTab === 2500 ? "bg-yellow-400 text-black font-semibold" : ""
        }`}
      >
        <Image src={`/league_logo.png`} alt={""} width="24" height="24" />
        <span className="hidden sm:block">Ultra League</span>
        <span className="block sm:hidden">Ultra</span>
      </button>
      <button
        onClick={() => handleClick(10000)}
        className={`flex flex-row items-center gap-2 py-2 px-4 rounded-xl ${
          activeTab === 10000 ? "bg-purple-600 text-white font-semibold" : ""
        }`}
      >
        <Image src={`/league_logo.png`} alt={""} width="24" height="24" />
        <span className="hidden sm:block">Master League</span>
        <span className="block sm:hidden">Master</span>
      </button>
    </div>
  );
}
