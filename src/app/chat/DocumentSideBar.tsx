import React from "react";
import CustomDropDown from "./CustomDropDown";

const ChatSideBar = () => {
  const categoriesData = [
    {
      category: "Category 1",
      docs: ["Doc 1", "Doc 2", "Doc 3"],
    },
  ];
  return (
    <div className="h-full p-2 py-5 ">
      <div className=" flex flex-col rounded-lg  border-2 border-black h-full pl-4 pr-4 py-10">
        <span className="font-bold text-xl">Select Documents to chat</span>
        <CustomDropDown categories={categoriesData} />

        <div className="flex flex-col justify-between mt-auto mb-4"></div>
      </div>
    </div>
  );
};

export default ChatSideBar;
