"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  RiArrowDropDownLine as DownArrow,
  RiArrowDropUpLine as UpArrow,
} from "react-icons/ri";

const DropdownMenu = ({
  data,
  selectedItem,
  onSelect,
  placeholder,
  label,
  width,
}) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function toggle() {
    setOpen(!open);
  }

  function handleClick(item) {
    onSelect(item);
    setOpen(false);
  }

  const getWidthClass = () => {
    switch (width) {
      case "small":
        return "w-20";
      case "medium":
        return "w-80";
      default:
        return "w-full";
    }
  };

  return (
    <div className="flex flex-row gap-2 w-full whitespace-nowrap items-center">
      {label ? (
        <span className="text-sm font-medium text-gray-900">{label}</span>
      ) : null}
      <div ref={menuRef} className={`flex flex-col ${getWidthClass()}`}>
        <button
          className="flex flex-row cursor-pointer justify-between px-2 py-2 rounded-xl border-2 w-full border-gray-400 focus-within:border-gray-700"
          onClick={toggle}
        >
          <p className={`${!selectedItem ? "text-gray-500" : ""}`}>
            {!selectedItem ? placeholder : selectedItem}
          </p>
          {open ? <UpArrow size={24} /> : <DownArrow size={24} />}
        </button>

        {open && (
          <div className="relative">
            <ul className="absolute bg-[white] max-h-[300px] rounded-lg overflow-auto top-1 shadow-xl w-full z-50 flex flex-col">
              {data.map((item, key) => (
                <li
                  className="cursor-pointer w-full px-4 py-2 hover:bg-gray-200"
                  onClick={() => handleClick(item)}
                  key={key}
                >
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default DropdownMenu;
