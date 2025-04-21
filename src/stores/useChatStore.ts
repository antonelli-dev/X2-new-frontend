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
  addChat: (chat: Chat) => void;
  deleteChat: (chatId: string) => void;
  cleanChats: () => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  selectedChat: null,
  selectedDocuments: [],
  chats: [],
  setSelectedChat: (id) => set({ selectedChat: id }),
  setSelectedDocuments: (docs) => set({ selectedDocuments: docs }),
  setChats: (chats) => set({ chats }),
  addChat: (chat: Chat) => set((state) => ({ chats: [...state.chats, chat] })),
  deleteChat: (chatId: string) => set((state) => ({ chats: state.chats.filter(chat => chat.chat_id !== chatId) })),
  cleanChats: () => set({ chats: [] }),
}));
