'use client';

import { useAuthStore } from "@/stores/useAuthStore";
import { Description, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { JustCreateCategoryScreen } from "./JustCreateCategoryScreen";
import { CreateFirstCategoryScreen } from "./CreateFirstCategoryScreen";
import { MainDocumentCategoryScreen } from "./MainDocumentCategoryScreen";

interface Props {
    isOpen: boolean;
    onClose: () => void;
};

export const DocumentCategoryModal = ({ isOpen }: Props) => {

    const user = useAuthStore((state) => state.user);

    return (
        <Dialog open={isOpen} onClose={() => { }} className="absolute z-50">
            <div className="fixed inset-0 w-screen overflow-y-auto p-4">
                <div className="flex min-h-full items-center justify-center">
                    <DialogPanel className="max-w-lg h-[450px] w-[600px] p-8 bg-white shadow-lg rounded-lg">
                       {/* <JustCreateCategoryScreen></JustCreateCategoryScreen> */}
                       {/* <CreateFirstCategoryScreen></CreateFirstCategoryScreen> */}
                       <MainDocumentCategoryScreen></MainDocumentCategoryScreen>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    );
}