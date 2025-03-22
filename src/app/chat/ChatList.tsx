import React from "react";
import ChatElement from "./ChatElement";

const fakedData = ["chat1", "chat2", "chat3"];

const ChatList = () => {
  return (
    <div className="flex flex-col w-full justify-between items-center py-3 rounded-lg space-y-2">
      {fakedData.map((value) => (
        <ChatElement key={value} chatName={value} />
      ))}
    </div>
  );
};

export default ChatList;
