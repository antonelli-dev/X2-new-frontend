import React from "react";
import ChatSideBar from "./ChatSideBar";
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
      <div className="h-full w-3/5 p-2 py-5 ">
        <div className="w-full h-full flex flex-col">
          <div className="flex-grow">
            Content
          </div>
          <div>
            <InteractiveInput className="grandiet-interactive-input" placeholder="Write Message to Nebula"></InteractiveInput>
          </div>
        </div>
      </div>
      <div className="h-full w-1/5">
        <DocumentSideBar />
      </div>
    </div>
  );
};

export default page;
