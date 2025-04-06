"use client";
import React, { useEffect } from "react";
import ChatElement from "./ChatElement";
import { useFetchChats } from "@/queries/chat.queries";
import { useAuthStore } from "@/stores/useAuthStore";
import { useChatStore } from "@/stores/useChatStore";

const ChatList = () => {
  const user = useAuthStore((state) => state.user);
  const { data: chats, isLoading, error } = useFetchChats(user?.user_id ?? "");

  const setChats = useChatStore((state) => state.setChats);
  const setSelectedChat = useChatStore((state) => state.setSelectedChat);

  useEffect(() => {
    if (chats) {
      setChats(chats);
    }
  }, [chats, setChats]);

  if (isLoading)
    return <div className="text-center py-4">Loading chats...</div>;
  if (error)
    return (
      <div className="text-center py-4 text-red-500">Error loading chats</div>
    );
  if (!chats || chats.length === 0)
    return <div className="text-center py-4">No chats found</div>;

  return (
    <div className="flex flex-col w-full justify-between items-center py-3 rounded-lg space-y-2">
      {chats.map((chat) => (
        <ChatElement
          key={chat.chat_id}
          chatId={chat.chat_id}
          chatName={chat.chat_history_name}
          onClick={() => setSelectedChat(chat.chat_id)} 
        />
      ))}
    </div>
  );
};

export default ChatList;
