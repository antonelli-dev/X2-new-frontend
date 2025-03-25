"use client"
import React from "react";
import ChatElement from "./ChatElement";
import { useFetchChats } from "@/services/ChatServices"; 

const ChatList = () => {
  const { data: chats, isLoading, error } = useFetchChats("726abff5-7448-4656-b5ad-c51b6cfdafe6");
  if (isLoading) return <div className="text-center py-4">Loading chats...</div>;
  
  if (error) return <div className="text-center py-4 text-red-500">Error loading chats</div>;
  
  if (!chats || chats.length === 0) return <div className="text-center py-4">No chats found</div>;

  return (
    <div className="flex flex-col w-full justify-between items-center py-3 rounded-lg space-y-2">
      { chats.map((chat) => (
        <ChatElement 
          key={chat.chat_id} 
          chatName={chat.chat_history_name} 
        />
      ))}
    </div>
  );
};

export default ChatList;

