import React from "react";

export default function SearchItem({ pokemon }) {
  return (
    <span className="flex flex-row cursor-pointer items-center p-4 bg-[white] hover:bg-gray-200 justify-between w-full">
      {/*
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/icons/9.png`}
          alt={`${pokemon} icon`}
        />
    */}
      <p className="font-medium text-sm truncate">{pokemon.name}</p>
      <p className="text-gray-500 text-sm">test</p>
    </span>
  );
}
