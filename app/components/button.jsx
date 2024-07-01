"use client";
import React, { useeff } from "react";
import calculate from "../utils/calculate";
import { pokeListObj } from "../utils/pokeListObj";
import outputUserRanks from "../utils/outputUserRanks";
import useStore from "../store/store";

export default function Button() {
  const attackIV = useStore((state) => state.attackIV);
  const defenseIV = useStore((state) => state.defenseIV);
  const staminaIV = useStore((state) => state.staminaIV);
  const league = useStore((state) => state.league);
  const leagueName = useStore((state) => state.leagueName);
  const setRanks = useStore((state) => state.setRanks);
  const selectedPokemon = useStore((state) => state.selectedPokemon);
  const setGreatLeagueRanks = useStore((state) => state.setGreatLeagueRanks);
  const setUltraLeagueRanks = useStore((state) => state.setUltraLeagueRanks);
  const setMasterLeagueRanks = useStore((state) => state.setMasterLeagueRanks);
  const setPokemonRank = useStore((state) => state.setPokemonRank);
  const setSelectedPokemonRankGreatLeague = useStore(
    (state) => state.setSelectedPokemonRankGreatLeague
  );
  const setSelectedPokemonRankUltraLeague = useStore(
    (state) => state.setSelectedPokemonRankUltraLeague
  );
  const setSelectedPokemonRankMasterLeague = useStore(
    (state) => state.setSelectedPokemonRankMasterLeague
  );
  const ivFloor = useStore((state) => state.ivFloor);
  const maxLevel = useStore((state) => state.maxLevel);

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
    const greatLeagueRanks = calculate(
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

    const glRanks = outputUserRanks(
      attackIV,
      defenseIV,
      staminaIV,
      shdw,
      mon,
      1500,
      "Great League",
      greatLeagueRanks,
      dec
    );
    setSelectedPokemonRankGreatLeague(glRanks);

    // ultra league ranks
    const ultraLeagueRanks = calculate(
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

    const ulRanks = outputUserRanks(
      attackIV,
      defenseIV,
      staminaIV,
      shdw,
      mon,
      2500,
      "Ultra League",
      ultraLeagueRanks,
      dec
    );
    setSelectedPokemonRankUltraLeague(ulRanks);

    // master league ranks
    const masterLeagueRanks = calculate(
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
    var URL = window.location.href.split("?")[0];
    const mlRanks = outputUserRanks(
      attackIV,
      defenseIV,
      staminaIV,
      shdw,
      mon,
      10000,
      "Master League",
      masterLeagueRanks,
      dec
    );
    setSelectedPokemonRankMasterLeague(mlRanks);
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
