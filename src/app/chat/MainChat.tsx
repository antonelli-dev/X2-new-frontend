"use client";
import { useChatStore } from "@/stores/useChatStore";
import { useFetchMessages } from "@/queries/message.queries";
import { useEffect, useRef } from "react";
import { ChatMessage } from "./ChatMessage";

const MainChat = () => {
  const selectedChat = useChatStore((state) => state.selectedChat);
  const {
    data: messages,
    isLoading,
    error,
  } = useFetchMessages(selectedChat ?? "");

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!selectedChat) {
    return (
      <div className="flex flex-1 items-center justify-center text-gray-400">
        Select a chat to get started.
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center text-gray-400">
        Loading conversation...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-1 items-center justify-center text-red-500">
        Failed to load messages.
      </div>
    );
  }

  if (!messages || messages.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center text-gray-400">
        No messages yet. Say something to get started!
      </div>
    );
  }

  const sortedMessages = [...messages].sort((a, b) => {
    const timeA = new Date(a.created_at).getTime();
    const timeB = new Date(b.created_at).getTime();
    if (timeA === timeB) {
      return a.id.localeCompare(b.id);
    }
    return timeA - timeB;
  });

  return (
    <div className="flex flex-col flex-1 h-full px-6 py-4">
      <div className="flex-1 overflow-y-auto pr-2 space-y-4">
        {sortedMessages.map((msg) => <ChatMessage key={msg.id} message={msg}></ChatMessage>)}
        <div ref={bottomRef} />
      </div>
    </div>
  );
};

export default MainChat;
