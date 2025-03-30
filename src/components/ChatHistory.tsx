"use client";

import { Plus, Upload } from "lucide-react";
import { CustomButton } from "./ui/CustomButton";
import ChatList from "@/app/chat/ChatList";
import { useStartChat } from "@/queries/chat.queries";
import { useAuthStore } from "@/stores/useAuthStore";

export const ChatHistory = () => {
    const { mutate: startChat, isPending } = useStartChat();
    const user = useAuthStore((state) => state.user);

    const handleStartChat = () => {
        if (!user) return;
        startChat(user.user_id);
    };

    return (
        <>
            Your user id is {user?.user_id}
            <CustomButton text="Upload" icon={<Upload />} className="mb-10" />
            <div className="w-full flex flex-row justify-between items-center py-3 rounded-lg space-y-2">
                <span className="font-bold text-2xl">Chats</span>
                <button onClick={handleStartChat} disabled={isPending} className="disabled:text-red-500 cursor-pointer">
                    <Plus></Plus>
                </button>
            </div>
            <ChatList />
        </>
    )
};