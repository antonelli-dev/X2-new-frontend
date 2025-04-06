"use client";
import { useChatStore } from "@/stores/useChatStore";
import { useFetchMessages } from "@/queries/message.queries";
import { useEffect, useRef } from "react";

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

  return (
    <div className="flex flex-col flex-1 h-full px-6 py-4">
      <div className="flex-1 overflow-y-auto pr-2 space-y-4">
        {messages.map((msg) => {
          const isUser = msg.sender.toLowerCase() === "user";

          return (
            <div
              key={msg.id}
              className={`w-full flex ${isUser ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`p-3 rounded-md max-w-xl ${
                  isUser ? "bg-blue-100" : "bg-gray-100"
                }`}
              >
                {isUser ? (
                  <p className="text-sm text-gray-800 whitespace-pre-wrap">
                    {msg.content}
                  </p>
                ) : (
                  <div
                    className="prose max-w-none text-sm text-gray-800"
                    dangerouslySetInnerHTML={{
                      __html: msg.content.replace(/```html|```/g, "").trim(),
                    }}
                  />
                )}
                <span className="text-xs text-gray-500 block mt-1">
                  {new Date(msg.created_at).toLocaleTimeString()}
                </span>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>
    </div>
  );
};

export default MainChat;
