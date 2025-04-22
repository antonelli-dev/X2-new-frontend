import React from "react";
import ChatSideBar from "./ChatSideBar";
import MainChat from "./MainChat";
import DocumentSideBar from "./DocumentSideBar";
import { InteractiveInput } from "@/components/ui/InteractiveInput/InteractiveInput";

const page = async () => {
  return (
    <div
      className="w-full h-full flex flex-row"
      style={{
        background: "linear-gradient(180deg, #EBF5FF 0%, #FFFFFF 46.5%)",
      }}
    >
      <div className="h-auto w-1/5 my-4 flex justify-center">
        <ChatSideBar />
      </div>

      <div className="w-3/5 h-full px-4 sm:px-6 pb-6 flex flex-col">
        <div className="flex-1 overflow-y-auto">
          <MainChat />
        </div>

        <div className="mt-2 mb-4">
          <InteractiveInput
            className="grandiet-interactive-input"
            placeholder="Write Message to Nebula"
          />
        </div>
      </div>

      <div className="h-auto w-1/5 my-4 flex justify-center">
        <DocumentSideBar />
      </div>
    </div>
  );
};

export default page;
