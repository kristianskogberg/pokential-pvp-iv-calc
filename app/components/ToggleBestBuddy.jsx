import React from "react";
import ToggleButton from "./ToggleButton";
import useStore from "../store/store";

export default function ToggleBestBuddy() {
  const maxLevel = useStore((state) => state.maxLevel);
  const setMaxLevel = useStore((state) => state.setMaxLevel);

  const handleToggle = (toggle) => {
    console.log(toggle);
    if (toggle) {
      // true
      setMaxLevel(maxLevel + 1);
    } else {
      setMaxLevel(maxLevel - 1);
    }
  };

  return (
    <ToggleButton
      label={"Best Buddy"}
      onToggle={handleToggle}
      isChecked={maxLevel === 51 || maxLevel == 41 ? true : false}
    />
  );
}
