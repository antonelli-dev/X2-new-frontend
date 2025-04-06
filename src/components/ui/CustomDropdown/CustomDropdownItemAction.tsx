import { ReactNode } from "react";

type Props = {
    text: string;
    onClick: () => void;
    icon?: ReactNode;
    disabled?: boolean;
  };
  
  export const CustomDropdownItemAction = ({ text, onClick, icon, disabled }: Props) => {
    return (
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
        disabled={disabled}
      >
        {icon && <span className="mr-2">{icon}</span>}
        {text}
      </button>
    );
  };
  