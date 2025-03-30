import { Chat } from "@/interfaces/chat.interface";
import { deleteChat, fetchChats, startChat } from "@/services/ChatServices";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useFetchChats = (userId: string) => {
    return useQuery<Chat[], Error>({
        queryKey: ["chats", userId],
        queryFn: () => fetchChats(userId),
    });
};

export const useDeleteChat = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (chatId: string) => deleteChat(chatId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["chats"] });
        },
    });
};

export const useStartChat = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (userId: string) => startChat(userId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["chats"] });
        },
    });
}