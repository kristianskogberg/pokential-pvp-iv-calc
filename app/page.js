"use client";
import AdvancedSettings from "./components/AdvancedSettings";
import LeagueDropdown from "./components/LeagueDropdown";
import SearchBar from "./components/search/SearchBar";
import Button from "./components/button";
import Results from "./components/results";
import Slider from "./components/slider";
import SelectedPokemonCard from "./components/SelectedPokemonCard";

export default function Home() {
  return (
    <div className="flex flex-col justify-center  p-3 items-center">
      <div className="w-full max-w-xl flex flex-col">
        <SearchBar />
        <SelectedPokemonCard />
      </div>
      <div className="w-full max-w-xl gap-8 flex flex-col">
        <Slider
          label="Attack"
          id="attackIV"
          setter="setAttackIV"
          value="attackIV"
        />
        <Slider
          label="Defense"
          id="defenseIV"
          setter="setDefenseIV"
          value="defenseIV"
        />
        <Slider
          label="HP"
          id="staminaIV"
          setter="setStaminaIV"
          value="staminaIV"
        />
        <div className="flex flex-row justify-center gap-8 flex-wrap">
          <AdvancedSettings />
          <Button />
        </div>
        <Results />
      </div>
    </div>
  );
}
