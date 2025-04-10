import React from "react";
import AvaraLogo from "@/img/avara-logo.png";
import Image from "next/image";
import { ChatHistory } from "@/components/ChatHistory";

const ChatSideBar = () => {
  return (
    <div className="relative h-full p-2 py-5 ">
      <div className=" flex flex-col rounded-lg  border-2 border-black h-full pl-4 pr-4">
        <section className="flex flex-row items-center mt-8 align-middle mb-5">
          <Image
            className="top-0"
            src={AvaraLogo}
            alt="avara-logo"
            width={50}
            height={15}
            priority
          />
          <span className="font-bold text-xl">AVARA LABS</span>
        </section>

        <ChatHistory></ChatHistory>
        <div className="flex flex-col justify-between mt-auto mb-4">
          <button className="text-left text-xl py-1 px-4">API</button>
          <button className="text-left text-xl py-1 px-4">Contact</button>
          <button className="text-left text-xl py-1 px-4">Logout</button>
        </div>
      </div>
    </div>
  );
};

export default ChatSideBar;
