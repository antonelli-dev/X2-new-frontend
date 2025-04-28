import { CategoryFormatted } from "@/interfaces/category-formatted.interface";
import { Save } from "lucide-react";
import { useState } from "react";

interface Props {
    category: CategoryFormatted;
    isSelected?: boolean;
    onEditorMode?: boolean;
    onClick?: () => void;
    onCategoryUpdate?: (category: CategoryFormatted) => void;
};

export const CategoryItem = ({ category, onClick, isSelected, onEditorMode, onCategoryUpdate }: Props) => {

    const [categoryName, setCategoryName] = useState<string>(category.name);

    const handleClick = () => {
        if (onClick) onClick();
    };

    const handleCategoryUpdate = () => {
        if (onCategoryUpdate) onCategoryUpdate({
            name: category.name,
            isNewCategory: category.isNewCategory,
        } as CategoryFormatted);
    };

    const handleInputText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCategoryName(e.target.value);
        category.name = e.target.value;
    }

  
    return (
        <div className={`w-full h-[40px] ${isSelected ? "bg-[#ABD1F5]" : "bg-white"} hover:bg-[#ECF5FF]  shadow-md rounded-md flex flex-row gap-2 p-2 items-center justify-between`}>
            {!onEditorMode && (<button className="w-full text-left cursor-pointer" onClick={handleClick} >{category.name}</button>)}
            {onEditorMode && (<input type="text" onChange={handleInputText} className="w-full h-full bg-[#ECF5FF] rounded-md p-2" placeholder="Enter category name" />)}

            {onEditorMode && (<button onClick={handleCategoryUpdate} className="bg-[#ABD1F5] rounded-md cursor-pointer">
                <Save></Save>
            </button>)}
        </div>
        // <button onClick={handleClick} 
        //     className={`cursor-pointer w-full h-[40px] ${isSelected ? "bg-[#ABD1F5]" : "bg-white"} hover:bg-[#ECF5FF]  shadow-md rounded-md flex flex-row gap-2 p-2 items-center justify-between`}>
        //     {!onEditorMode && (<span>{category.name}</span>)}
        //     {onEditorMode && (<input type="text" className="w-full h-full bg-[#ECF5FF] rounded-md p-2" placeholder="Enter category name" />)}

        //     {onEditorMode && (<button onClick={handleCategoryUpdate} className="bg-[#ABD1F5] rounded-md cursor-pointer">
        //         <Save></Save>
        //     </button>)}
        // </button>
    );
}