"use client";
import React, { useRef, useEffect } from "react";
import calculateAllRanks from "../utils/calculateAllRanks";
import useStore from "../store/store";
import calculateSelectedPokemonRank from "../utils/calculateSelectedPokemonRank";
import { BsCalculator as CalculateIcon } from "react-icons/bs";

export default function Button() {
  const attackIV = useStore((state) => state.attackIV);
  const defenseIV = useStore((state) => state.defenseIV);
  const staminaIV = useStore((state) => state.staminaIV);
  const selectedPokemon = useStore((state) => state.selectedPokemon);
  const ivFloor = useStore((state) => state.ivFloor);
  const maxLevel = useStore((state) => state.maxLevel);

  const setGreatLeagueRanks = useStore((state) => state.setGreatLeagueRanks);
  const setUltraLeagueRanks = useStore((state) => state.setUltraLeagueRanks);
  const setMasterLeagueRanks = useStore((state) => state.setMasterLeagueRanks);
  const setSearchHistory = useStore((state) => state.setSearchHistory);
  const searchHistory = useStore((state) => state.searchHistory);

  const setSelectedPokemonRankGreatLeague = useStore(
    (state) => state.setSelectedPokemonRankGreatLeague
  );
  const setSelectedPokemonRankUltraLeague = useStore(
    (state) => state.setSelectedPokemonRankUltraLeague
  );
  const setSelectedPokemonRankMasterLeague = useStore(
    (state) => state.setSelectedPokemonRankMasterLeague
  );

  function handleClick() {
    if (Object.keys(selectedPokemon).length === 0) {
      return;
    }

    const pokemon = selectedPokemon.name;

    const lastCalc = searchHistory[0];

    if (
      lastCalc &&
      lastCalc.ivFloor === ivFloor &&
      lastCalc.maxLevel === maxLevel &&
      lastCalc.IVs?.attack === attackIV &&
      lastCalc.IVs?.defense === defenseIV &&
      lastCalc.IVs?.stamina === staminaIV &&
      lastCalc.pokemon === pokemon
    ) {
      // this calculation has already been performed, do not calcuate twice
      return;
    }

    // const monInfo = pokeListObj[mon].split(",");
    const monInfo = selectedPokemon.stats.split(",");

    const shdw = false; // shadow

    const minLvl = 1;

    const display_trade_improvement = false;
    const dec = 2; // how many decimals places to output

    // great league ranks
    const greatLeagueRanks = calculateAllRanks(
      parseInt(monInfo[1]),
      parseInt(monInfo[2]),
      parseInt(monInfo[3]),
      ivFloor,
      minLvl,
      maxLevel,
      display_trade_improvement,
      1500,
      pokemon
    );
    setGreatLeagueRanks(greatLeagueRanks);

    const glRank = calculateSelectedPokemonRank(
      greatLeagueRanks,
      selectedPokemon,
      attackIV,
      defenseIV,
      staminaIV
    );

    setSelectedPokemonRankGreatLeague(glRank);

    // ultra league ranks
    const ultraLeagueRanks = calculateAllRanks(
      parseInt(monInfo[1]),
      parseInt(monInfo[2]),
      parseInt(monInfo[3]),
      ivFloor,
      minLvl,
      maxLevel,
      display_trade_improvement,
      2500,
      pokemon
    );
    setUltraLeagueRanks(ultraLeagueRanks);

    const ulRank = calculateSelectedPokemonRank(
      ultraLeagueRanks,
      selectedPokemon,
      attackIV,
      defenseIV,
      staminaIV
    );
    setSelectedPokemonRankUltraLeague(ulRank);

    // master league ranks
    const masterLeagueRanks = calculateAllRanks(
      parseInt(monInfo[1]),
      parseInt(monInfo[2]),
      parseInt(monInfo[3]),
      ivFloor,
      minLvl,
      maxLevel,
      display_trade_improvement,
      10000,
      pokemon
    );
    setMasterLeagueRanks(masterLeagueRanks);

    const mlRank = calculateSelectedPokemonRank(
      masterLeagueRanks,
      selectedPokemon,
      attackIV,
      defenseIV,
      staminaIV
    );
    setSelectedPokemonRankMasterLeague(mlRank);

    if (
      Object.keys(glRank).length === 0 &&
      Object.keys(ulRank).length === 0 &&
      Object.keys(mlRank).length === 0
    ) {
      // set iv floor is too high compared to selected IVs
      return;
    }

    setSearchHistory({
      pokemon: pokemon,
      IVs: {
        attack: attackIV,
        defense: defenseIV,
        stamina: staminaIV,
      },
      ivFloor: ivFloor,
      maxLevel: maxLevel,
      glRank,
      ulRank,
      mlRank,
      timestamp: new Date(),
    });
  }

  // hide this component until a pokemon has been selected
  if (Object.keys(selectedPokemon).length === 0) {
    return null;
  }

  return (
    <div>
      <button
        className="py-2 px-4 font-medium rounded-md border-2 border-slate-700 text-white bg-slate-700 flex flex-row items-center justify-center gap-2"
        onClick={handleClick}
      >
        <CalculateIcon size={20} />
        Calculate
      </button>
    </div>
  );
}
