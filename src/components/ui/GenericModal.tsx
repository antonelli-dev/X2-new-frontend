"use client";

import {
  Dialog,
  DialogPanel,
  Transition,
  DialogTitle,
} from "@headlessui/react";
import { Fragment } from "react";


interface Props {
  isOpen: boolean;
  children?: React.ReactNode;	
  title?: string;
  onClose: () => void;
};

export default function Modal({
  title,
  isOpen,
  children,
  onClose,
}: Readonly<Props>) {

  return (
    <Dialog as="div" className="relative z-50" open={isOpen} onClose={onClose}>
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
            show={isOpen}
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
                { title ?? "Information" }
              </DialogTitle>
              {children}
            </DialogPanel>
          </Transition>
        </div>
      </div>
    </Dialog>
  );
}
