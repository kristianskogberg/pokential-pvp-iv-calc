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
        className={`text-xs font-medium uppercase py-2 px-4 ${
          numResults >= 250 ? "text-gray-400" : "text-gray-600"
        }`}
        onClick={(e) => handleClick(e)}
        disabled={numResults >= 250}
      >
        Load More...
      </button>
    </div>
  );
}
