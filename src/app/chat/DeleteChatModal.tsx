import Modal from "@/components/ui/GenericModal";
import { useDeleteChat } from "@/queries/chat.queries";

interface Props {
    isOpen: boolean;
    chatId: string;
    onClose: () => void;
};

export const DeleteChatModal = ({ isOpen, chatId, onClose }: Props) => {

    const { mutate: deleteChat } = useDeleteChat();	

    const confirmDeleteChat = () => {
        deleteChat(chatId);
        onClose();
    }


    return (
        <Modal isOpen={isOpen} title="Delete Chat" onClose={onClose}>
            <div className="mt-2">
                <p className=" text-black font-['Exo_2'] font-normal text-[20px] leading-[24px]">
                    Are you sure you want to delete this chat?
                </p>
            </div>
            <div className="flex flex-row justify-center mt-4 space-x-15">
                <button
                    onClick={onClose}
                    className="hover:underline font-['Exo_2'] font-normal text-[20px] leading-[24px] text-black"
                >
                    Close
                </button>
                <button
                    onClick={confirmDeleteChat}
                    className="hover:underline font-['Exo_2'] font-normal text-[20px] leading-[24px] text-black"
                >
                    Delete
                </button>
            </div>
        </Modal>
    );
};