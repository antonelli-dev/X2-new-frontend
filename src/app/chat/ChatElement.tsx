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
  const inputRef = useRef<HTMLInputElement | null>(null);
  const editContainerRef = useRef<HTMLDivElement | null>(null);

  const { mutate: setChatName } = useUpdateChatName();

  const selectedChat = useChatStore((state) => state.selectedChat);
  const isActive = selectedChat === chatId;

  useEffect(() => {
    if (isEditing && inputRef.current) {
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
          const length = inputRef.current.value.length;
          inputRef.current.setSelectionRange(length, length);
        }
      }, 0);
    }
  }, [isEditing]);

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

      if (
        isEditing &&
        editContainerRef.current &&
        !editContainerRef.current.contains(event.target as Node)
      ) {
        handleSaveChangeName();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openMenu, isEditing]);

  const openModal = () => {
    setIsModalOpen(true);
    setOpenMenu(false);
  };

  const handleSelectChat = (e: React.MouseEvent) => {
    if (!isEditing) {
      onClick?.();
      setOpenMenu(false);
    } else {
      e.stopPropagation();
    }
  };

  const handleSaveChangeName = () => {
    setChatName({ chatId, chatName: currentChatName });
    setIsEditing(false);
    setOpenMenu(false);
  };

  const handleCancelEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentChatName(oldChatName);
    setIsEditing(false);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setCurrentChatName(e.target.value);
  };

  const startEditing = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOldChatName(currentChatName);
    setOpenMenu(false);
    setIsEditing(true);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    e.stopPropagation();
    if (e.key === "Enter") {
      handleSaveChangeName();
    } else if (e.key === "Escape") {
      setCurrentChatName(oldChatName);
      setIsEditing(false);
    }
  };

  return (
    <div className="relative w-full">
      <div
        className={`text-left w-full px-4 py-3 rounded-lg shadow-md flex justify-between items-center transition-all
          ${isActive ? "bg-blue-100 border border-blue-400" : "bg-white"}`}
        onClick={handleSelectChat}
      >
        {isEditing ? (
          <div
            ref={editContainerRef}
            className="flex justify-between items-center w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <input
              ref={inputRef}
              type="text"
              className="w-full bg-gray-200 px-2 py-1 rounded outline-none"
              value={currentChatName}
              onChange={handleInputChange}
              onKeyDown={handleInputKeyDown}
              onClick={(e) => e.stopPropagation()}
              onBlur={(e) => {
                e.preventDefault();
                setTimeout(() => {
                  if (isEditing && inputRef.current) {
                    inputRef.current.focus();
                  }
                }, 10);
              }}
            />
            <div className="flex items-center ml-2">
              <X
                size={18}
                className="cursor-pointer text-gray-600 hover:text-gray-800"
                onClick={handleCancelEdit}
              />
              <Save
                size={18}
                className="ml-2 cursor-pointer text-blue-600 hover:text-blue-800"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSaveChangeName();
                }}
              />
            </div>
          </div>
        ) : (
          <>
            <span>{currentChatName ?? "New Chat"}</span>
            <Pencil
              ref={buttonRef}
              size={18}
              className="ml-2 cursor-pointer text-gray-600 hover:text-gray-800"
              onClick={(e) => {
                e.stopPropagation();
                setOldChatName(currentChatName);
                if (!isEditing) {
                  setOpenMenu(!openMenu);
                }
              }}
            />
          </>
        )}
      </div>

      {openMenu && (
        <div
          ref={menuRef}
          className="absolute top-full right-4 mt-2 w-32 bg-gray-800 text-white rounded-md shadow-lg z-50"
        >
          <button
            className="w-full text-left px-4 py-2 hover:bg-gray-700 text-sm"
            onClick={startEditing}
          >
            Rename
          </button>
          <button
            className="w-full text-left px-4 py-2 hover:bg-gray-700 text-sm"
            onClick={(e) => {
              e.stopPropagation();
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
