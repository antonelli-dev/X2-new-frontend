"use client"; // SIEMPRE en App Router de Next.js

import {
  Dialog,
  DialogPanel,
  Transition,
  DialogTitle,
} from "@headlessui/react";
import { Fragment } from "react";

export default function Modal({
  isOpen,
  closeModal,
}: {
  isOpen: boolean;
  closeModal: () => void;
}) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition
          show={isOpen} // Added this line
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-opacity-70" />
        </Transition>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition
              show={isOpen} // Added this line
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-[linear-gradient(90.07deg,_#DEDEDE_0.06%,_#ABD1F5_99.93%)] p-6 text-left align-middle shadow-xl transition-all">
                <DialogTitle
                  as="h3"
                  className=" text-black font-['Exo_2'] font-normal text-[20px] leading-[24px]"
                >
                  Delete Chat?
                </DialogTitle>
                <div className="mt-2">
                  <p className=" text-black font-['Exo_2'] font-normal text-[20px] leading-[24px]">
                    are you sure you want to delete this chat?
                  </p>
                </div>
                <div className="flex flex-row justify-center mt-4 space-x-15">
                  <button
                    onClick={closeModal}
                    className="hover:underline font-['Exo_2'] font-normal text-[20px] leading-[24px] text-black"
                  >
                    Cerrar
                  </button>
                  <button
                    onClick={closeModal}
                    className="hover:underline font-['Exo_2'] font-normal text-[20px] leading-[24px] text-black"
                  >
                    Cerrar
                  </button>
                </div>
              </DialogPanel>
            </Transition>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
