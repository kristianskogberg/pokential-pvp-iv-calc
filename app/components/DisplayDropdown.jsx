"use client";
import React from "react";
import useStore from "../store/store";
import DropdownMenu from "./dropdown";

const data = [
  {
    label: "10",
    value: 10,
  },
  {
    label: "25",
    value: 25,
  },
  {
    label: "100",
    value: 100,
  },
  {
    label: "250",
    value: 250,
  },
];

export default function DisplayDropdown() {
  const numResults = useStore((state) => state.numResults);
  const setNumResults = useStore((state) => state.setNumResults);

  const handleSelect = (item) => {
    setNumResults(item.value);
  };

  return (
    <DropdownMenu
      data={data}
      selectedItem={numResults}
      onSelect={handleSelect}
      placeholder=""
      label={"Display top"}
      width={"small"}
    />
  );
}
