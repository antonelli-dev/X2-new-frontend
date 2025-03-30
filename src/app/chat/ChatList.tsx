"use client"
import React from "react";
import ChatElement from "./ChatElement";
import { useFetchChats } from "@/queries/chat.queries";
import { useAuthStore } from "@/stores/useAuthStore";

const ChatList = () => {
  const user = useAuthStore((state) => state.user);
  const { data: chats, isLoading, error } = useFetchChats(user?.user_id ?? "");

  if (isLoading) return <div className="text-center py-4">Loading chats...</div>;
  
  if (error) return <div className="text-center py-4 text-red-500">Error loading chats</div>;
  
  if (!chats || chats.length === 0) return <div className="text-center py-4">No chats found</div>;

  return (
    <div className="flex flex-col w-full justify-between items-center py-3 rounded-lg space-y-2">
      { chats.map((chat) => (
        <ChatElement 
          key={chat.chat_id} 
          chatId={chat.chat_id}
          chatName={chat.chat_history_name}
        />
      ))}
    </div>
  );
};

export default ChatList;

