"use client";
import React from "react";
import useStore from "../store/store";
import DropdownMenu from "./dropdown";

const data = [
  {
    label: "Great League",
    value: 1500,
  },
  {
    label: "Ultra League",
    value: 2500,
  },
  {
    label: "Master League",
    value: 10000,
  },
];

const LeagueDropdown = () => {
  const leagueName = useStore((state) => state.leagueName);
  const setLeague = useStore((state) => state.setLeague);

  const handleSelect = (item) => {
    setLeague(item.label, item.value);
  };

  return (
    <DropdownMenu
      data={data}
      selectedItem={leagueName}
      onSelect={handleSelect}
      placeholder="Select a League..."
    />
  );
};

export default LeagueDropdown;
