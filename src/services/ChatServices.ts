import { Chat } from "@/interfaces/chat.interface";

export const startChat = async (userId: string) => {
  const response = await fetch(
    `https://llm-chatbot-reg-production.up.railway.app/start_chat`,
    {
      method: "POST",
      body: JSON.stringify({
        user_id: userId,
      }),
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

export const fetchChats = async (userId: string): Promise<Chat[]> => {
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


export const getAllMessagesByChatId = async (chatId: string) => {
  const response = await fetch(
    `https://llm-chatbot-reg-production.up.railway.app/chats/${chatId}/messages`,
    {
      method: "GET",
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
