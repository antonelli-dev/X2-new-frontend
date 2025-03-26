import React, { useState, useRef, useEffect } from "react";
import { Pencil } from "lucide-react";
import Modal from "@/app/generics/GenericModal"; // Adjust the import path as needed

interface ChatElementProps {
  chatName: string;
}

const ChatElement = ({ chatName }: ChatElementProps) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<SVGSVGElement | null>(null);

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

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="relative w-full">
      <button className="text-left w-full px-4 py-3 rounded-lg bg-white shadow-md flex justify-between items-center">
        <span>{chatName ?? "New Chat"}</span>
        <Pencil
          ref={buttonRef}
          size={18}
          className="ml-2 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            setOpenMenu(!openMenu);
          }}
        />
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

      {/* Modal component */}
      <Modal isOpen={isModalOpen} closeModal={closeModal} />
    </div>
  );
};

export default ChatElement;
