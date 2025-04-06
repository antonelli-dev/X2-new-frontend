import { useEffect, useRef, useState, ReactNode } from "react";

type Props = {
    children: ReactNode;
    icon?: ReactNode;
};

export const CustomDropdownList = ({ children, icon }: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);


    return (
      
        <div className="relative inline-block" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="p-1 rounded hover:bg-gray-200"
            >
                {icon && <span className="text-gray-700">{icon}</span>}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-40  bg-[#ECF5FF] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] rounded-[10px] rounded shadow z-50">
                    {children}
                </div>
            )}
        </div>
    )
}