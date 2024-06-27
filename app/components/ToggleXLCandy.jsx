import React from "react";
import ToggleButton from "./ToggleButton";
import useStore from "../store/store";

export default function ToggleXLCandy() {
  const maxLevel = useStore((state) => state.maxLevel);
  const setMaxLevel = useStore((state) => state.setMaxLevel);

  const handleToggle = (toggle) => {
    console.log(toggle);
    if (toggle) {
      // true
      setMaxLevel(maxLevel + 10);
    } else {
      setMaxLevel(maxLevel - 10);
    }
  };

  return (
    <ToggleButton
      label={"Include XL Candy"}
      onToggle={handleToggle}
      isChecked={maxLevel > 41 ? true : false}
    />
  );
}
