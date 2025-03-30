import { create } from 'zustand';

interface State {
    setSelectedChatId: (chatId: string) => void;
    selectedChatId: string | null;
}

export const useInterfaceStore = create<State>((set) => ({
    selectedChatId: null,
    setSelectedChatId: (chatId) => set({ selectedChatId: chatId }),
}));