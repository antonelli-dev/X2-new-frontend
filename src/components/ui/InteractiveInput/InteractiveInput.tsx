import { Input } from "@headlessui/react";

interface Props {
    placeholder?: string;
    className?: string;
};

export const InteractiveInput = ({ placeholder, className }: Props) => {
    return (
        <Input
            placeholder={placeholder ?? ""}
            className={`w-full h-12 bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${placeholder ? "placeholder:text-gray-400" : ""} ${className}`}>
         </Input>
    );
}