interface Props {
    text: string;
    onClick?: () => void;
    className?: string;
    icon?: React.ReactNode;
};

export const CustomButton = ({ text, onClick, className, icon }: Props) => {
  return (
    <button
      className={`flex justify-between items-center bg-white py-3 px-4 rounded-lg shadow-md mb-10 text-left ${className}`}
      onClick={onClick}
    >
      {text}

      {icon && <span>{icon}</span>}
    </button>
  );
}