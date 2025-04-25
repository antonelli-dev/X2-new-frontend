"use client";
import React from "react";
import { useAuthStore } from "@/stores/useAuthStore";
import { useFetchCategories } from "@/queries/category.queries";
import DocumentCategoryList from "./DocumentCategoryList";

const ChatSideBar = () => {
  const user = useAuthStore((state) => state.user);
  const { data, isLoading, error } = useFetchCategories(user?.user_id ?? "");

  if (isLoading)
    return <div className="text-center py-4">Loading documents...</div>;
  if (error)
    return (
      <div className="text-center py-4 text-red-500">
        Error loading documents
      </div>
    );

  const categoriesData = Object.entries(data?.documents ?? {}).map(
    ([categoryName, docs]) => ({
      category: categoryName,
      docs: docs.map((doc) => ({
        name: doc.name,
        doc_id: doc.doc_id,
      })),
    })
  );

  return (
    <div className="relative h-full p-6 sm:p-6">
      <div
        className="w-full max-w-[280px] h-full sm:rounded-[10px]
          bg-gradient-to-b from-[#ECF5FF] to-white
          border border-[#42566F]
          shadow-[5px_10px_20px_rgba(0,0,0,0.25)]
          box-border px-5 py-6
          flex flex-col
        "
      >
        <span className="font-bold text-xl">Select Documents to chat</span>
        <div className="mt-4 flex-1 overflow-hidden">
          <DocumentCategoryList categories={categoriesData} />
        </div>
        <div className="mt-auto mb-4"></div>
      </div>
    </div>
  );
};

export default ChatSideBar;