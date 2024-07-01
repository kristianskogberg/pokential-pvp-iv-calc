"use client";
import React from "react";
import calculateAllRanks from "../utils/calculateAllRanks";
import useStore from "../store/store";
import calculateSelectedPokemonRank from "../utils/calculateSelectedPokemonRank";

export default function Button() {
  const attackIV = useStore((state) => state.attackIV);
  const defenseIV = useStore((state) => state.defenseIV);
  const staminaIV = useStore((state) => state.staminaIV);
  const selectedPokemon = useStore((state) => state.selectedPokemon);
  const setGreatLeagueRanks = useStore((state) => state.setGreatLeagueRanks);
  const setUltraLeagueRanks = useStore((state) => state.setUltraLeagueRanks);
  const setMasterLeagueRanks = useStore((state) => state.setMasterLeagueRanks);
  const ivFloor = useStore((state) => state.ivFloor);
  const maxLevel = useStore((state) => state.maxLevel);
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
    const mon = selectedPokemon.name;

    // const monInfo = pokeListObj[mon].split(",");
    const monInfo = selectedPokemon.stats.split(",");

    const shdw = false; // shadow
    const floor = ivFloor;
    const minLvl = 1;
    const maxLvl = maxLevel;
    const display_trade_improvement = false;
    const dec = 2; // how many decimals places to output

    // great league ranks
    const greatLeagueRanks = calculateAllRanks(
      parseInt(monInfo[1]),
      parseInt(monInfo[2]),
      parseInt(monInfo[3]),
      floor,
      minLvl,
      maxLvl,
      display_trade_improvement,
      1500,
      mon
    );
    setGreatLeagueRanks(greatLeagueRanks);

    const glRank = calculateSelectedPokemonRank(
      greatLeagueRanks,
      attackIV,
      defenseIV,
      staminaIV
    );

    console.log(glRank);
    setSelectedPokemonRankGreatLeague(glRank);

    // ultra league ranks
    const ultraLeagueRanks = calculateAllRanks(
      parseInt(monInfo[1]),
      parseInt(monInfo[2]),
      parseInt(monInfo[3]),
      floor,
      minLvl,
      maxLvl,
      display_trade_improvement,
      2500,
      mon
    );
    setUltraLeagueRanks(ultraLeagueRanks);

    const ulRank = calculateSelectedPokemonRank(
      ultraLeagueRanks,
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
      floor,
      minLvl,
      maxLvl,
      display_trade_improvement,
      10000,
      mon
    );
    setMasterLeagueRanks(masterLeagueRanks);

    const mlRank = calculateSelectedPokemonRank(
      masterLeagueRanks,
      attackIV,
      defenseIV,
      staminaIV
    );
    setSelectedPokemonRankMasterLeague(mlRank);
  }

  // hide this component until a pokemon has been selected
  if (Object.keys(selectedPokemon).length === 0) {
    return null;
  }

  return (
    <div>
      <button
        className="py-2 px-4 font-medium rounded-md border-2 border-slate-700 text-white bg-slate-700"
        onClick={handleClick}
      >
        Calculate
      </button>
    </div>
  );
}
