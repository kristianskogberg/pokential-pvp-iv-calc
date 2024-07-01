"use client";
import React from "react";
import useStore from "../store/store";
import DropdownMenu from "./dropdown";

const data = [
  {
    label: "Wild Catch (0)",
    value: 0,
  },
  {
    label: "Purified (2)",
    value: 2,
  },
  {
    label: "Weather Boosted (4)",
    value: 4,
  },
  {
    label: "Shadow Legendary (6)",
    value: 6,
  },
  {
    label: "Raid / Egg / Research (10)",
    value: 10,
  },
  {
    label: "Trade — Good Friend (1)",
    value: 1,
  },
  {
    label: "Trade — Great Friend (2)",
    value: 2,
  },
  {
    label: "Trade — Ultra Friend (3)",
    value: 3,
  },
  {
    label: "Trade — Best Friend (5)",
    value: 5,
  },
  {
    label: "Trade — Lucky (12)",
    value: 12,
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
