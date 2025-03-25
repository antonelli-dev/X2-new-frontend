import { create } from 'zustand';

interface ChatModalState {
  isModalOpen: boolean;
  isEditMode: boolean;
  selectedChatId: string | null;
  openModal: (chatId: string, isEdit: boolean) => void;
  closeModal: () => void;
}

export const useChatModalStore = create<ChatModalState>((set) => ({
  isModalOpen: false,
  isEditMode: true,
  selectedChatId: null,
  openModal: (chatId, isEdit) => set({ isModalOpen: true, isEditMode: isEdit, selectedChatId: chatId }),
  closeModal: () => set({ isModalOpen: false, selectedChatId: null }),
}));