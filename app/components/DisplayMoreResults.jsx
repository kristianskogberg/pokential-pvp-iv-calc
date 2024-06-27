"use client";
import React from "react";
import useStore from "../store/store";

export default function DisplayMoreResults() {
  const numResults = useStore((state) => state.numResults);
  const setNumResults = useStore((state) => state.setNumResults);

  const handleClick = (event) => {
    event.preventDefault();
    if (numResults >= 250) {
      return;
    }
    setNumResults(numResults + 50);
  };

  return (
    <div className="flex w-full items-center justify-center">
      <button
        className="text-xs font-medium uppercase text-gray-600 p-3"
        onClick={(e) => handleClick(e)}
        disabled={numResults >= 250}
      >
        Load More...
      </button>
    </div>
  );
}
