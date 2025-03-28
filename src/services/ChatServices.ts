import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface Message {
  id: string;
  chat_id: string;
  sender: "human" | "bot";
  content: string;
  created_at: string;
  document: Document;
}

interface Chat {
  chat_id: string;
  chat_history_name: string;
  first_message: Message;
}

export const deleteChat = async (chatId: string) => {
  const response = await fetch(
    `https://llm-chatbot-reg-production.up.railway.app/chats/${chatId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "api-key": "40b27ff5-665d-4ad6-8c06-e1ea17a3d996", // mismo header aquí
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete chat");
  }

  return true;
};

const fetchChats = async (userId: string): Promise<Chat[]> => {
  const response = await fetch(
    `https://llm-chatbot-reg-production.up.railway.app/chats/${userId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "api-key": "40b27ff5-665d-4ad6-8c06-e1ea17a3d996",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch chats");
  }
  const chats = (await response.json()).chats;
  return chats;
};

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
