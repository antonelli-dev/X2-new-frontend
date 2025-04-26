export const CreateFirstCategoryScreen = () => {
    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <div className="flex flex-col gap-4">
            <span className="text-[#BDDDFF] font-semibold">Create a category for your Document.</span>
            <input type="text" className="border-2 border-gray-300 rounded-md p-2 w-full placeholder:text-gray-400" placeholder="Category Name" />
            <div className="flex flex-row justify-center w-full">
            <button className="bg-[#ABD1F5] w-fit p-2 h-8 rounded-md text-center flex items-center justify-center">
                Create
            </button>
            </div>
            </div>
        </div>
    );
}