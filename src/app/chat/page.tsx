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
        background: "linear-gradient(180deg, #FFFFFF 0%, #ECF5FF 100%)",
      }}
    >
      <div className="h-full w-1/5 ">
        <ChatSideBar />
      </div>

      <div className="w-3/5 h-full p-2 py-5 flex flex-col">
        <div className="flex-1 overflow-y-auto">
          <MainChat />
        </div>

        <div className="mt-2">
          <InteractiveInput
            className="grandiet-interactive-input"
            placeholder="Write Message to Nebula"
          />
        </div>
      </div>

      <div className="h-full w-1/5">
        <DocumentSideBar />
      </div>
    </div>
  );
};

export default page;
