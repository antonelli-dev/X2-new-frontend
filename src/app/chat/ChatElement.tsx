import React, { useState, useRef, useEffect, ChangeEvent } from "react";
import { Pencil, Save, X } from "lucide-react";
import { DeleteChatModal } from "./DeleteChatModal";
import { useUpdateChatName } from "@/queries/chat.queries";
import { useChatStore } from "@/stores/useChatStore";

interface ChatElementProps {
  chatId: string;
  chatName: string;
  onClick?: () => void;
}

const ChatElement = ({ chatId, chatName, onClick }: ChatElementProps) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentChatName, setCurrentChatName] = useState<string>(
    chatName ?? "New chat"
  );
  const [oldChatName, setOldChatName] = useState<string>(
    chatName ?? "New chat"
  );

  const menuRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<SVGSVGElement | null>(null);

  const { mutate: setChatName } = useUpdateChatName();

  useEffect(() => {
    if (chatName) {
      setCurrentChatName(chatName);
    }
  }, []);

  const selectedChat = useChatStore((state) => state.selectedChat);
  const isActive = selectedChat === chatId;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        openMenu &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setOpenMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openMenu]);

  const openModal = () => {
    setIsModalOpen(true);
    setOpenMenu(false);
  };

  const handleSelectChat = () => {
    onClick?.();
    setOpenMenu(false);
  };

  const handleSaveChangeName = () => {
    setChatName({ chatId, chatName: currentChatName });
    setIsEditing(false);
    setOpenMenu(false);
  };

  const NormalButton = () => (
    <>
      <span>{currentChatName ?? "New Chat"}</span>
      <Pencil
        ref={buttonRef}
        size={18}
        className="ml-2 cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          setOldChatName(currentChatName);
          setOpenMenu(!openMenu);
        }}
      />
    </>
  );

  const EditingButton = () => (
    <>
      <input
        type="text"
        className="w-full bg-gray-400"
        value={currentChatName ?? ""}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setCurrentChatName(e.target.value)
        }
      ></input>
      <X
        ref={buttonRef}
        size={18}
        className="ml-2 cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          setCurrentChatName(oldChatName);
          setIsEditing(false);
        }}
      />
      <Save
        ref={buttonRef}
        size={18}
        className="ml-2 cursor-pointer"
        onClick={handleSaveChangeName}
      />
    </>
  );

  return (
    <div className="relative w-full">
      <button
        className={`text-left w-full px-4 py-3 rounded-lg shadow-md flex justify-between items-center transition-all
        ${isActive ? "bg-blue-100 border border-blue-400" : "bg-white"}
      `}
        onClick={handleSelectChat}
      >
        {isEditing ? <EditingButton /> : <NormalButton />}
      </button>

      {openMenu && (
        <div
          ref={menuRef}
          className="absolute top-full right-4 mt-2 w-32 bg-gray-800 text-white rounded-md shadow-lg z-50"
        >
          <button
            className="w-full text-left px-4 py-2 hover:bg-gray-700 text-sm"
            onClick={() => {
              setOpenMenu(false);
              setIsEditing(true);
            }}
          >
            Rename
          </button>
          <button
            className="w-full text-left px-4 py-2 hover:bg-gray-700 text-sm"
            onClick={() => {
              openModal();
            }}
          >
            Delete
          </button>
        </div>
      )}


      <DeleteChatModal
        isOpen={isModalOpen}
        chatId={chatId}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default ChatElement;
