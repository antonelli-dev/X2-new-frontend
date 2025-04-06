import { create } from "zustand";
import { Chat } from "@/interfaces/chat.interface";

interface Document {
  name: string;
  doc_id: string;
}

interface ChatStore {
  selectedChat: string | null;
  selectedDocuments: Document[];
  chats: Chat[];
  setSelectedChat: (id: string | null) => void;
  setSelectedDocuments: (docs: Document[]) => void;
  setChats: (chats: Chat[]) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  selectedChat: null,
  selectedDocuments: [],
  chats: [],
  setSelectedChat: (id) => set({ selectedChat: id }),
  setSelectedDocuments: (docs) => set({ selectedDocuments: docs }),
  setChats: (chats) => set({ chats }),
}));
