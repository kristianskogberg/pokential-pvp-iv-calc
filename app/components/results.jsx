"use client";
import React, { useEffect, useState } from "react";
import useStore from "../store/store";
import DisplayDropdown from "./DisplayDropdown";
import LeagueSelector from "./LeagueSelector";
import DisplayMoreResults from "./DisplayMoreResults";

export default function Results() {
  const numResults = useStore((state) => state.numResults);
  const selectedPokemon = useStore((state) => state.selectedPokemon);
  const [initialSelectedPokemon, setInitialSelectedPokemon] =
    useState(selectedPokemon);

  const activeTab = useStore((state) => state.activeTab);
  const greatLeagueRanks = useStore((state) => state.greatLeagueRanks);
  const ultraLeagueRanks = useStore((state) => state.ultraLeagueRanks);
  const masterLeagueRanks = useStore((state) => state.masterLeagueRanks);

  const selectedPokemonRankGreatLeague = useStore(
    (state) => state.selectedPokemonRankGreatLeague
  );
  const selectedPokemonRankUltraLeague = useStore(
    (state) => state.selectedPokemonRankUltraLeague
  );
  const selectedPokemonRankMasterLeague = useStore(
    (state) => state.selectedPokemonRankMasterLeague
  );

  const getRanksByActiveTab = () => {
    switch (activeTab) {
      case 2500:
        return ultraLeagueRanks;
      case 10000:
        return masterLeagueRanks;
      default:
        return greatLeagueRanks;
    }
  };

  const getPokemonRankByActiveTab = () => {
    switch (activeTab) {
      case 2500:
        return selectedPokemonRankUltraLeague;
      case 10000:
        return selectedPokemonRankMasterLeague;
      default:
        return selectedPokemonRankGreatLeague;
    }
  };

  const ranks = getRanksByActiveTab();
  const pokemonRank = getPokemonRankByActiveTab();

  let pokemonRankClass = ""; // class for styling pokemon rank row

  if (pokemonRank.class === "good") {
    pokemonRankClass = "bg-green-200";
  } else if (pokemonRank.class === "ok") {
    pokemonRankClass = "bg-yellow-200";
  } else if (pokemonRank.class === "rubbish") {
    pokemonRankClass = "bg-red-200";
  }

  // flatten the ranks into a single array of entries
  const flatRanks = Object.keys(ranks).flatMap((rankKey) => ranks[rankKey]);
  // limit the number of results to be rendered
  const limitedRanks = flatRanks.slice(0, parseInt(numResults));

  const renderTableRows = () => {
    return limitedRanks.map((rankData, index) => (
      <tr
        key={`${rankData.rank}-${index}`}
        className="odd:bg-white  even:bg-gray-50  "
      >
        <td className="py-1">{rankData.rank}</td>
        <td>
          {rankData.IVs.A}/{rankData.IVs.D}/{rankData.IVs.S}
        </td>
        <td>{rankData.CP}</td>
        <td>{rankData.L}</td>
        <td>{parseFloat(rankData.battle.A).toFixed(2)}</td>
        <td>{parseFloat(rankData.battle.D).toFixed(2)}</td>
        <td>{parseInt(rankData.battle.S)}</td>
      </tr>
    ));
  };

  if (Object.keys(ranks).length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2">
      <span className="sticky top-0 text-xs font-medium uppercase text-gray-600 py-1 w-full flex bg-white items-center justify-center">
        <span className="py-1">Results for {selectedPokemon.name}</span>
      </span>
      <div className="sticky top-[1.8rem] bg-white">
        <LeagueSelector />
      </div>

      <table className="w-full border-collapse table-auto text-left">
        <thead className="text-xs uppercase sticky top-[4.3rem] bg-white">
          <tr>
            <th className="py-2">RANK</th>
            <th>IVS</th>
            <th>CP</th>
            <th>LVL</th>
            <th>ATK</th>
            <th>DEF</th>
            <th>STA</th>
            {/*}  <th>SP</th> */}
          </tr>
        </thead>
        <tbody className="text-sm">
          {Object.keys(pokemonRank).length === 0 ? (
            <tr>
              <td colSpan="7" className="py-2 text-center ">
                Your Pokemon does not qualify (check IVs and IV Floor)
              </td>
            </tr>
          ) : (
            <tr className={pokemonRankClass}>
              <td className="py-1">{pokemonRank.rank}</td>
              <td>
                {pokemonRank.attackIV}/{pokemonRank.defenseIV}/
                {pokemonRank.staminaIV}
              </td>
              <td>{pokemonRank.cp}</td>
              <td>{pokemonRank.level}</td>
              <td>{pokemonRank.battleAttack}</td>
              <td>{pokemonRank.battleDefense}</td>
              <td>{pokemonRank.battleStamina}</td>
            </tr>
          )}

          {renderTableRows()}
        </tbody>
      </table>
      <DisplayMoreResults />
    </div>
  );
}
