import {
  createMessage,
  getMessages,
  sendToAI,
} from "@/services/MessageService";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Message } from "@/interfaces/message.interface";

export const useFetchMessages = (chatId?: string | null) => {
  return useQuery<Message[], Error>({
    queryKey: ["messages", chatId],
    queryFn: () => getMessages(chatId!),
    enabled: !!chatId,
  });
};

export const useCreateMessage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createMessage,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["messages", variables.chatId],
      });
    },
  });
};

export const useBotResponse = () => {
  return useMutation({
    mutationFn: sendToAI,
  });
};
