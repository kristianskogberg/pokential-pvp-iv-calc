"use client";
import React from "react";
import useStore from "../store/store";

const MIN_IV = 0;
const MAX_IV = 15;

export default function Slider({ label, id, setter, value }) {
  const setIV = useStore((state) => state[setter]);
  const ivValue = useStore((state) => state[value]);
  const selectedPokemon = useStore((state) => state.selectedPokemon);

  function handleIVChange(event) {
    let newValue = event.target.value;

    // Remove leading zeros
    newValue = newValue.replace(/^0+/, "");

    // Ensure the value is not empty, if so default to 0
    if (newValue === "") {
      newValue = 0;
    }
    if (newValue <= MAX_IV && newValue >= MIN_IV) {
      setIV(newValue);
    }
  }

  // hide this component until a pokemon has been selected
  if (Object.keys(selectedPokemon).length === 0) {
    return null;
  }

  return (
    <div className="relative">
      <label className="pr-2">{label}</label>
      <input
        className="w-12"
        type="number"
        value={ivValue}
        min={MIN_IV}
        step={1}
        max={MAX_IV}
        onChange={handleIVChange}
        id={id}
      />
      <label htmlFor="labels-range-input" className="sr-only">
        Labels range
      </label>
      <input
        id="labels-range-input"
        type="range"
        value={ivValue}
        min={MIN_IV}
        step={1}
        max={MAX_IV}
        className="w-full h-2 bg-gray-200 rounded-lg  cursor-pointer accent-slate-600 "
        onChange={handleIVChange}
      />
    </div>
  );
}
