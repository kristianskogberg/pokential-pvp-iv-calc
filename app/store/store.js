import { create } from "zustand";

const useStore = create((set) => ({
  selectedPokemon: {},
  league: 0,
  leagueName: "",
  attackIV: 0,
  defenseIV: 0,
  staminaIV: 0,
  ranks: {},
  greatLeagueRanks: {},
  ultraLeagueRanks: {},
  masterLeagueRanks: {},
  pokemonRank: {},
  selectedPokemonRankGreatLeague: {},
  selectedPokemonRankUltraLeague: {},
  selectedPokemonRankMasterLeague: {},
  numResults: 50,
  ivFloor: 0,
  ivFloorName: "Wild Catch",
  maxLevel: 50,
  activeTab: 1500,

  setSelectedPokemon: (selectedPokemon) =>
    set({
      selectedPokemon,
      greatLeagueRanks: {},
      ultraLeagueRanks: {},
      masterLeagueRanks: {},
      selectedPokemonRankGreatLeague: {},
      selectedPokemonRankUltraLeague: {},
      selectedPokemonRankMasterLeague: {},
    }),
  setLeague: (leagueName, league) => set({ leagueName, league }),
  setAttackIV: (attack) => set({ attackIV: attack }),
  setDefenseIV: (defense) => set({ defenseIV: defense }),
  setStaminaIV: (stamina) => set({ staminaIV: stamina }),
  setRanks: (ranks) => set({ ranks }),
  setGreatLeagueRanks: (greatLeagueRanks) => set({ greatLeagueRanks }),
  setUltraLeagueRanks: (ultraLeagueRanks) => set({ ultraLeagueRanks }),
  setMasterLeagueRanks: (masterLeagueRanks) => set({ masterLeagueRanks }),
  setSelectedPokemonRankGreatLeague: (selectedPokemonRankGreatLeague) =>
    set({ selectedPokemonRankGreatLeague }),
  setSelectedPokemonRankUltraLeague: (selectedPokemonRankUltraLeague) =>
    set({ selectedPokemonRankUltraLeague }),
  setSelectedPokemonRankMasterLeague: (selectedPokemonRankMasterLeague) =>
    set({ selectedPokemonRankMasterLeague }),
  setNumResults: (numResults) => set({ numResults }),
  setPokemonRank: (pokemonRank) => set({ pokemonRank }),
  setIVFloor: (ivFloor, ivFloorName) => set({ ivFloor, ivFloorName }),
  setMaxLevel: (maxLevel) => set({ maxLevel }),
  setActiveTab: (activeTab) => set({ activeTab }),
}));

export default useStore;
