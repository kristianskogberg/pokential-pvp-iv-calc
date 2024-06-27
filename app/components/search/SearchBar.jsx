"use client";
import { useState, useEffect } from "react";
import data from "@/app/utils/poke_list.json";
import { HiOutlineSearch as SearchIcon } from "react-icons/hi";
import SearchItem from "./SearchItem";
import useStore from "@/app/store/store";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const setSelectedPokemon = useStore((state) => state.setSelectedPokemon);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setQuery(value);

    const filtered = data.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(value)
    );
    setFilteredData(filtered);
  };

  function handleClick(event, pokemon) {
    event.preventDefault();
    setSelectedPokemon(pokemon);
    setQuery("");
    setFilteredData([]);
  }

  return (
    <div className="flex z-10 flex-col justify-between border-2 rounded-lg border-slate-400 focus-within:border-slate-900">
      <form action="" className="w-full">
        <div className="relative flex items-center  h-10 rounded-lg text-gray-500  overflow-hidden 0">
          <input
            className="h-full pl-3 w-full outline-none  placeholder-gray-500 text-black pr-2 "
            type="text"
            value={query}
            placeholder="Search for a Pokémon..."
            onChange={handleSearch}
          />
          <div className="grid place-items-center h-full w-12 text-gray-300">
            <SearchIcon size={20} color="gray" />
          </div>
        </div>
      </form>
      <div className="relative ">
        <div className="max-h-[500px] w-full shadow-xl absolute overflow-auto rounded-lg text-[black] top-1">
          {filteredData?.map((pokemon) => {
            return (
              <span
                key={`${pokemon.id}-${pokemon.name}`}
                onClick={(e) => handleClick(e, pokemon)}
                className="w-full"
              >
                <SearchItem pokemon={pokemon} />
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
