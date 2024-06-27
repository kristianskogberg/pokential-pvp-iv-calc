"use client";
import React, { useState, useEffect, useRef } from "react";
import IVFloorDropdown from "./IVFloorDropdown";
import useStore from "../store/store";
import ToggleXLCandy from "./ToggleXLCandy";
import ToggleBestBuddy from "./ToggleBestBuddy";

export default function AdvancedSettings() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();
  const maxLevel = useStore((state) => state.maxLevel);
  const selectedPokemon = useStore((state) => state.selectedPokemon);

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

  return (
    <div>
      <button
        type="button"
        className="py-2 px-4 font-medium rounded-md border-2 border-slate-700"
        onClick={handleModal}
      >
        Advanced Settings
      </button>
      {open && (
        <div className="z-50 fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
          <div
            ref={menuRef}
            className="max-w-[460px] bg-white shadow-lg  rounded-md w-full m-2 gap-4 flex flex-col"
          >
            <h2 className="text-sm font-medium text-gray-900 border-b border-gray-300 py-3 px-4">
              Advanced Settings
            </h2>
            <div className="px-4">
              <IVFloorDropdown />
            </div>

            <div className="flex flex-row items-center justify-between px-4">
              <div className="flex flex-col gap-4">
                <ToggleXLCandy />

                <ToggleBestBuddy />
              </div>
              <div className="flex flex-start">
                <p className="text-left text-sm font-medium text-gray-400 w-28">
                  Max Level: {maxLevel}
                </p>
              </div>
            </div>

            <div className="border-t border-gray-300 flex justify-end gap-4 items-center px-4 py-4">
              <button
                type="button"
                className="cursor-pointer px-4 py-2 rounded-xl bg-green-400"
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
