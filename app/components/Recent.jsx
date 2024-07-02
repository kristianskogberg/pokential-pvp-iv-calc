"use client";
import React, { useState, useEffect, useRef } from "react";

import useStore from "../store/store";
import { GoHistory as HistoryIcon } from "react-icons/go";

export default function Recent() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  const selectedPokemon = useStore((state) => state.selectedPokemon);
  const greatLeagueRanks = useStore((state) => state.greatLeagueRanks);
  const clearSearchHistory = useStore((state) => state.clearSearchHistory);

  const searchHistory = useStore((state) => state.searchHistory);
  const setSearchHistoryOnLoad = useStore(
    (state) => state.setSearchHistoryOnLoad
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleModal = () => {
    setOpen(!open);
  };

  useEffect(() => {
    // load save history from localStorage
    if (typeof window !== "undefined") {
      const savedSearchHistory = JSON.parse(
        localStorage.getItem("searchHistory")
      );
      //console.log(savedSearchHistory);

      if (savedSearchHistory) {
        setSearchHistoryOnLoad(savedSearchHistory);
      }
    }
  }, []);

  useEffect(() => {
    if (open) {
      document.documentElement.classList.add("no-doc-scroll");
    } else {
      document.documentElement.classList.remove("no-doc-scroll");
    }
    return () => {
      document.documentElement.classList.remove("no-doc-scroll");
    };
  }, [open]);

  // hide this component until a pokemon has been selected
  if (Object.keys(selectedPokemon).length === 0) {
    return null;
  }

  const getPokemonRankClass = (rankClass) => {
    if (rankClass === "good") {
      return "bg-green-200";
    } else if (rankClass === "ok") {
      return "bg-yellow-200";
    } else if (rankClass === "rubbish") {
      return "bg-red-200";
    } else {
      return "";
    }
  };

  return (
    <div>
      <button
        type="button"
        className="py-2 px-4 font-medium rounded-md border-2 border-slate-700 flex flex-row gap-2 justify-center items-center"
        onClick={handleModal}
      >
        <HistoryIcon size={20} />
        Recent
      </button>
      {open && (
        <div className="z-50 fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
          <div
            ref={menuRef}
            className="max-w-xl bg-white shadow-lg  rounded-md w-full m-2  flex flex-col"
          >
            <h2 className="text-sm font-medium text-gray-900 border-b border-gray-300 py-3 px-4">
              Recent
            </h2>
            <div className="px-4 flex flex-col gap-4 w-full min-h-[65vh]">
              {searchHistory.length === 0 ? (
                <span className="text-sm text-gray-600 w-full justify-center flex py-2">
                  Your recent calculations will be displayed here
                </span>
              ) : (
                <div className=" overflow-y-auto">
                  <table className="min-w-full text-xs text-left">
                    <thead className="border-b uppercase">
                      <tr>
                        <th className="py-2">POKEMON</th>
                        <th>IVS</th>

                        <th>GREAT</th>
                        <th>ULTRA</th>
                        <th>MASTER</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {searchHistory.map((search, index) => (
                        <tr
                          key={index}
                          className="odd:bg-white  even:bg-gray-50 border-b "
                        >
                          <td className="py-1">{search.pokemon}</td>
                          <td>
                            {search.IVs?.attack}/{search.IVs?.defense}/
                            {search.IVs?.stamina}
                          </td>

                          <td
                            className={getPokemonRankClass(
                              search.glRank?.class
                            )}
                          >
                            {JSON.stringify(search.glRank?.rank)}
                          </td>
                          <td
                            className={getPokemonRankClass(
                              search.ulRank?.class
                            )}
                          >
                            {JSON.stringify(search.ulRank?.rank)}
                          </td>
                          <td
                            className={getPokemonRankClass(
                              search.mlRank?.class
                            )}
                          >
                            {JSON.stringify(search.mlRank?.rank)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <div className="border-t border-gray-300 flex justify-end gap-4 items-center px-4 py-4">
              <button
                className="text-xs font-medium uppercase text-gray-600 p-3"
                disabled={searchHistory?.length === 0}
                onClick={() => clearSearchHistory()}
              >
                Clear History
              </button>
              <button
                type="button"
                className="py-2 px-4 font-medium rounded-md border-2 border-slate-700"
                onClick={handleModal}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
