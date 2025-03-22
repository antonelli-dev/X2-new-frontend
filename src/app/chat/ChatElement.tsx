import React from "react";
interface ChatElementProps {
  chatName: string;
}
const ChatElement = ({ chatName }: ChatElementProps) => {
  return (
    <button className="text-left w-full px-4 py-3 rounded-lg bg-white shadow-md">
      {chatName ?? "New Chat"}
    </button>
  );
};

export default ChatElement;
