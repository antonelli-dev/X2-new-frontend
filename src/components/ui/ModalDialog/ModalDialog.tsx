import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { X } from "lucide-react";
import { ReactNode } from "react";

interface Props {
    isOpen: boolean;
    title?: string;
    children: ReactNode;
    onClose?: () => void;
}

export const ModalDialog = ({ isOpen, title, children, onClose }: Props) => {

    const handleClose = () => {

        if (onClose) {
            onClose();
        }
    }

    return (
        <Dialog open={isOpen} onClose={handleClose} className="absolute z-50">
            <div className="fixed inset-0 w-screen overflow-y-auto p-4">
                <div className="flex min-h-full items-center justify-center">
                    <DialogPanel className="h-[600px] w-[900px] p-8 bg-white shadow-lg rounded-lg flex flex-col gap-4">
                        <div className="flex flex-row w-full">
                            <div className="flex-grow">
                                {title && (<DialogTitle className={"text-xl"}>{title}</DialogTitle>)}
                            </div>
                            <button onClick={handleClose} className="cursor-pointer w-fit">
                                <X></X>
                            </button>
                        </div>
                        {children}
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    );
}