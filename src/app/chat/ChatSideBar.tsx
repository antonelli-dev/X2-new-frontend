import React from "react";
import AvaraLogo from "@/img/avara-logo.png";
import Image from "next/image";
import { ChatHistory } from "@/components/ChatHistory";
import SideBarButtonsContainer from "./SideBarButtonsContainer";


const ChatSideBar = () => {
  return (
    <div className="relative h-full p-6 sm:p-6">
      <div
        className="
          w-full max-w-[280px] min-h-full sm:rounded-[10px]
          bg-gradient-to-b from-[#ECF5FF] to-white
          border border-[#42566F]
          shadow-[5px_10px_20px_rgba(0,0,0,0.25)]
          box-border px-7 py-6
          flex flex-col
        "
      >

        <section className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Image
              src={AvaraLogo}
              alt="avara-logo"
              width={60}
              height={60}
              priority
            />
            <span className="avara-title text-[20px] font-bold leading-6 font-[var(--font-exo2)] text-black">
              AVARA LABS
            </span>
          </div>

          <svg
            className="w-6 h-6"
            viewBox="0 0 26 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.93924 15.9393C6.35345 16.5251 6.35345 17.4749 6.93924 18.0607L16.4852 27.6066C17.071 28.1924 18.0207 28.1924 18.6065 27.6066C19.1923 27.0208 19.1923 26.0711 18.6065 25.4853L10.1212 17L18.6065 8.51472C19.1923 7.92893 19.1923 6.97919 18.6065 6.3934C18.0207 5.80761 17.071 5.80761 16.4852 6.3934L6.93924 15.9393ZM8 15.5H7.9999V18.5H8V15.5Z"
              fill="black"
            />
          </svg>
        </section>

        <div className="flex-1 overflow-y-auto">
          <ChatHistory />
        </div>

        <div className="mt-6">
          <SideBarButtonsContainer />
        </div>
      </div>
    </div>
  );
};

export default ChatSideBar;
