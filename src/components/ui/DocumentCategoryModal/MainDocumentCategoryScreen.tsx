import { DialogTitle } from "@headlessui/react";
import { DropzoneDocuments } from "../Dropzone/Dropzone";
import { CategoryItem } from "./CategoryItem";
import { Plus } from "lucide-react";
import { useAuthStore } from "@/stores/useAuthStore";
import { useFetchCategories } from "@/queries/category.queries";
import { useEffect, useState } from "react";
import { mapCategoriesFromCategoriesResponse } from "@/mappers/mapDocumentCategory";
import { CategoryFormatted } from "@/interfaces/category-formatted.interface";

export const MainDocumentCategoryScreen = () => {

    /* TODO: This part could be improved. */
    const user = useAuthStore((state) => state.user);
    const { data: categories, isLoading } = useFetchCategories(user?.user_id ?? "");

    const [categoriesData, setCategoriesData] = useState<CategoryFormatted[] | undefined>(undefined);
    const [selectedCategory, setSelectedCategory] = useState<CategoryFormatted | null>(null);
 
    const handleCreateCategory = () => {
        if (categoriesData) {
            const newCategory = {
                name: "New Category",
                isNewCategory: true,
            };
            setCategoriesData([...categoriesData, newCategory]);
            setSelectedCategory(newCategory);
        }
    };

    useEffect(() => {
        if( categories ) {
            const flattenCategories = mapCategoriesFromCategoriesResponse(categories);
            setCategoriesData(flattenCategories);
        }
    }, [categories]);

    const handleClickSelectCategory = (category: string) => {
        const selectedCategory = categoriesData?.find((cat) => cat.name == category);
        if ( selectedCategory && !selectedCategory?.isNewCategory) {
       
            setSelectedCategory(selectedCategory);
        }
    }

    const handleUpdateCategory = (category: CategoryFormatted) => {
        const currentCategories = categoriesData?.filter((cat) => !cat.isNewCategory);
        category.isNewCategory = false;
        currentCategories?.push(category);
        setCategoriesData(currentCategories);
        setSelectedCategory(category);
        
    }

    return (
        <>
            <DialogTitle>Select or Create a Category for your document</DialogTitle>
            <div className="flex flex-row h-full gap-4">
                <div className="flex flex-col h-full w-[300px]">
                    <div className=" h-full  flex flex-col gap-2 truncate  max-h-full overflow-y-auto">
                        {categoriesData?.map((category) => (
                            <CategoryItem onEditorMode={category.isNewCategory} isSelected={selectedCategory?.name == category.name} key={category.name} category={category} onClick={() => handleClickSelectCategory(category.name)} onCategoryUpdate={handleUpdateCategory}></CategoryItem>
                        ))}

                        {isLoading && (
                            <span className="text-center py-4">Loading categories...</span>
                        )}
                    </div>

                    <button onClick={handleCreateCategory} className="cursor-pointer bg-[#ABD1F5] w-full p-2 h-8 rounded-md flex flex-row justify-between items-center gap-2">
                        Add Category
                        <Plus></Plus>
                    </button>
                </div>
                <DropzoneDocuments category={selectedCategory} userId={user?.user_id ?? ""}></DropzoneDocuments>
            </div>
        </>
    );
}