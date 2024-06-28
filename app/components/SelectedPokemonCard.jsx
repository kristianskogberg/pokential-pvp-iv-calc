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
    <div className="flex flex-row  w-full items-center justify-start sm:justify-center px-2 ">
      <Image
        // make this image smaller if screen size goes smaller so that it scales
        src={selectedPokemon.imageUrl}
        alt={selectedPokemon.name}
        width={200}
        height={200}
        className="max-w-[200px] w-full p-4"
        layout="responsive"
      />
      <div className="p-4 flex flex-col w-auto items-start justify-center">
        <span>
          <h5 className="text-sm font-medium text-gray-400">
            #{selectedPokemon.id}
          </h5>
          <h2 className="text-2xl sx:text-3xl font-bold py-1 sx:py-2 truncate">
            {selectedPokemon.name}
          </h2>
        </span>
        <span className="flex flex-row  gap-4 text-sm font-medium text-gray-400 uppercase">
          {selectedPokemon.type.map((type) => (
            <p key={type}>&#x25A1;</p>
          ))}
        </span>
      </div>
    </div>
  );
}
