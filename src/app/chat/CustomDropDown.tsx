"use client";
import React, { useState } from "react";

interface CustomDropDownProps {
  categories: {
    category: string;
    docs: string[];
  }[];
}

const CustomDropDown = ({ categories }: CustomDropDownProps) => {
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const toggleDropdown = (category: string) => {
    setOpenCategory((prev) => (prev === category ? null : category));
  };

  return (
    <div className="w-full">
      {categories.map(({ category, docs }) => (
        <div key={category} className="border-b border-gray-300 py-2">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id={category}
              name={category}
              onChange={() => null}
              className="h-4 w-4"
            />
            <span className="text-lg font-semibold">{category}</span>
            <span
              onClick={() => toggleDropdown(category)}
              className="ml-auto cursor-pointer text-blue-500"
            >
              {openCategory === category ? "▲" : "▼"}
            </span>
          </div>
          {openCategory === category && (
            <div className="pl-6 mt-2">
              {docs.map((docName, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input type="checkbox" id={docName} className="h-4 w-4" />
                  <label htmlFor={docName} className="text-sm text-gray-700">
                    {docName}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CustomDropDown;
