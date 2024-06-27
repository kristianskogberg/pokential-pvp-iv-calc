"use client";
import React from "react";
import useStore from "../store/store";
import DropdownMenu from "./dropdown";

const data = [
  {
    label: "Wild Catch",
    value: 0,
  },
  {
    label: "Purified",
    value: 2,
  },
  {
    label: "Weather Boosted",
    value: 4,
  },
  {
    label: "Shadow Legendary",
    value: 6,
  },
  {
    label: "Raid",
    value: 10,
  },
];

export default function IVFloorDropdown() {
  const ivFloorName = useStore((state) => state.ivFloorName);
  const setIVFloor = useStore((state) => state.setIVFloor);

  const handleSelect = (item) => {
    setIVFloor(item.value, item.label);
  };

  return (
    <DropdownMenu
      data={data}
      selectedItem={ivFloorName}
      onSelect={handleSelect}
      placeholder=""
      label={"IV Floor"}
    />
  );
}
