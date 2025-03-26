import { create } from "zustand";

interface ChatModalState {
  isOpen: boolean;
  selectedChatId: string | null;
  openModal: (chatId: string) => void;
  closeModal: () => void;
}

export const useChatModal = create<ChatModalState>((set) => ({
  isOpen: false,
  selectedChatId: null,
  openModal: (chatId) => set({ isOpen: true, selectedChatId: chatId }),
  closeModal: () => set({ isOpen: false, selectedChatId: null }),
}));
