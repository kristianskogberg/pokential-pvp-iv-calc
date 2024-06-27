"use client";
import React from "react";
import useStore from "../store/store";
import Image from "next/image";

export default function SelectedPokemonCard() {
  const selectedPokemon = useStore((state) => state.selectedPokemon);

  // hide this component until a pokemon has been selected
  if (Object.keys(selectedPokemon).length === 0) {
    return null;
  }

  return (
    <div className="flex flex-row w-full items-center justify-center gap-10">
      <Image
        src={selectedPokemon.imageUrl}
        alt={selectedPokemon.name}
        width={200}
        height={200}
      />
      <div>
        <span>
          <h5 className="text-sm font-medium text-gray-400">
            #{selectedPokemon.id}
          </h5>
          <h2>{selectedPokemon.name}</h2>
        </span>
        <span className="flex flex-row gap-4 text-sm font-medium text-gray-400 uppercase">
          {selectedPokemon.type.map((type) => {
            return <p key={type}>{type}</p>;
          })}
        </span>
      </div>
    </div>
  );
}
