"use client";
import { useState } from "react";
import { useChatStore } from "@/stores/useChatStore";
import {
  useCreateMessage,
  useBotResponse,
  useFetchMessages,
} from "@/queries/message.queries";
import { Send } from "lucide-react";
import { Message } from "@/interfaces/message.interface";
import { useQueryClient } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";

interface Props {
  placeholder?: string;
  className?: string;
}

export const InteractiveInput = ({ placeholder, className }: Props) => {
  const { selectedChat, selectedDocuments } = useChatStore();
  const [input, setInput] = useState("");

  const queryClient = useQueryClient();
  const { refetch } = useFetchMessages(selectedChat);
  const createMessage = useCreateMessage();
  const botResponse = useBotResponse();

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !selectedChat || selectedDocuments.length === 0)
      return;

    const tempId = uuidv4();
    const userMessage: Message = {
      id: tempId,
      chat_id: selectedChat,
      sender: "human",
      content: input,
      created_at: new Date().toISOString(),
      document_name: selectedDocuments.map((doc) => doc.doc_id),
    };

    queryClient.setQueryData<Message[]>(["messages", selectedChat], (old) =>
      old ? [...old, userMessage] : [userMessage]
    );

    setInput("");

    try {
      await createMessage.mutateAsync({
        chatId: selectedChat,
        sender: "HUMAN",
        content: input,
        document: selectedDocuments.map((doc) => doc.doc_id),
      });

      const aiReply = await botResponse.mutateAsync({
        chatId: selectedChat,
        question: input,
        docIds: selectedDocuments.map((doc) => doc.doc_id),
      });

      await createMessage.mutateAsync({
        chatId: selectedChat,
        sender: "BOT",
        content: aiReply,
        document: selectedDocuments.map((doc) => doc.doc_id),
      });

      await refetch();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <form
      onSubmit={handleSend}
      className={`flex items-center bg-white rounded-lg border border-gray-300 px-3 py-2 shadow-sm ${className}`}
    >
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={placeholder ?? ""}
        className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400 bg-transparent"
        disabled={!selectedChat || selectedDocuments.length === 0}
      />
      <button
        type="submit"
        disabled={!input.trim() || selectedDocuments.length === 0}
        className="ml-2 text-blue-600 disabled:opacity-50"
      >
        <Send size={18} />
      </button>
    </form>
  );
};
