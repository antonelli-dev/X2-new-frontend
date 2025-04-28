"use client";

import { Plus, Upload } from "lucide-react";
import { CustomButton } from "./ui/CustomButton";
import ChatList from "@/app/chat/ChatList";
import { useAuthStore } from "@/stores/useAuthStore";
import { useQueryClient } from "@tanstack/react-query";
import { useStartChat } from "@/queries/chat.queries";
import { DocumentCategoryModal } from "./ui/DocumentCategoryModal/DocumentCategoryModal";

export const ChatHistory = () => {
  const user = useAuthStore((state) => state.user);
  const queryClient = useQueryClient();

  const { mutate: startChat, isPending } = useStartChat({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chats", user?.user_id] });
    },
  });

  const handleStartChat = () => {
    if (!user) return;
    startChat(user.user_id);
  };

  return (
    <>

      <div className="w-full">
        <CustomButton
          text="Upload"
          icon={<Upload  className="h-5"/>}
          className="mb-10 w-full"
        />

      <DocumentCategoryModal isOpen={false} onClose={() => {}}  />
      </div>
      <div className="w-full flex flex-row justify-between items-center py-3 rounded-lg space-y-2">
        <span className="font-bold text-2xl">Chats</span>
        <button
          onClick={handleStartChat}
          disabled={isPending}
          className="disabled:text-red-500 cursor-pointer"
        >
          <Plus></Plus>
        </button>
      </div>
      <ChatList />
    </>
  );
};
