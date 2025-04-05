import { Category } from "@/interfaces/category.interface";

export const getCategories = async (userId: string): Promise<Category> => {
  const response = await fetch(
    `https://uploadvkg-production.up.railway.app/users/${userId}/documents`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "api-key": "40b27ff5-665d-4ad6-8c06-e1ea17a3d996",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  const data: Category = await response.json();
  return data;
};

export const deleteChat = async (chatId: string) => {
  const response = await fetch(
    `https://llm-chatbot-reg-production.up.railway.app/chats/${chatId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "api-key": "40b27ff5-665d-4ad6-8c06-e1ea17a3d996",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete chat");
  }

  return true;
};

// export const fetchChats = async (userId: string): Promise<Chat[]> => {
//   const response = await fetch(
//     `https://llm-chatbot-reg-production.up.railway.app/chats/${userId}`,
//     {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         "api-key": "40b27ff5-665d-4ad6-8c06-e1ea17a3d996",
//       },
//     }
//   );

//   if (!response.ok) {
//     throw new Error("Failed to fetch chats");
//   }
//   const chats = (await response.json()).chats;
//   return chats;
// };

export const updateChatName = async (chatId: string, name: string) => {
  const response = await fetch(
    `https://llm-chatbot-reg-production.up.railway.app/chats/${chatId}/update_name?chat_history_name=${name}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "api-key": "40b27ff5-665d-4ad6-8c06-e1ea17a3d996",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete chat");
  }

  return true;
};

export const getAllMessagesByChatId = async (chatId: string) => {
  const response = await fetch(
    `https://llm-chatbot-reg-production.up.railway.app/chats/${chatId}/messages`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "api-key": "40b27ff5-665d-4ad6-8c06-e1ea17a3d996",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete chat");
  }

  return true;
};
