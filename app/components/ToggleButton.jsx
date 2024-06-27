import React from "react";

export default function ToggleButton({ label, isChecked, onToggle }) {
  const handleToggle = () => {
    if (onToggle) {
      onToggle(!isChecked);
    }
  };

  return (
    <div>
      <label className="inline-flex items-center cursor-pointer">
        <span className="text-sm font-medium text-gray-900 pr-2">{label}</span>
        <input
          type="checkbox"
          className="sr-only peer"
          checked={isChecked}
          onChange={handleToggle}
        />
        <div className="relative w-11 h-6 bg-gray-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
      </label>
    </div>
  );
}
