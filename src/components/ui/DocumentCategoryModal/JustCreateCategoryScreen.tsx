import { FileUp, Upload } from "lucide-react";

export const JustCreateCategoryScreen = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="flex flex-col gap-2 justify-center items-center h-full w-full">
        <FileUp className="text-[#BDDDFF]" size={120}></FileUp>
        <span className="text-[#BDDDFF] font-semibold">
          Upload your first document
        </span>
      </div>

      <div className="flex flex-col justify-end">
        <span>Drag & drop file to upload or</span>
        <button className="bg-[#ABD1F5] p-2 h-8 rounded-md flex flex-row justify-between items-center gap-2">
          <span>Upload</span>
          <Upload></Upload>
        </button>
      </div>
    </div>
  );
};
