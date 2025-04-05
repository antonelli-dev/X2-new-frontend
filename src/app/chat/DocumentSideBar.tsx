"use client";
import React from "react";
import CustomDropDown from "./CustomDropDown";
import { useAuthStore } from "@/stores/useAuthStore";
import { useFetchCategories } from "@/queries/category.queries";

const ChatSideBar = () => {
  const user = useAuthStore((state) => state.user);
  const { data, isLoading, error } = useFetchCategories(user?.user_id ?? "");

  if (isLoading) return <div className="text-center py-4">Loading documents...</div>;
  if (error) return <div className="text-center py-4 text-red-500">Error loading documents</div>;

  const categoriesData = Object.entries(data?.documents ?? {}).map(([categoryName, docs]) => ({
    category: categoryName,
    docs: docs.map((doc) => ({
      name: doc.name,
      doc_id: doc.doc_id,
    })),
  }));

  return (
    <div className="h-full p-2 py-5">
      <div className="flex flex-col rounded-lg border-2 border-black h-full pl-4 pr-4 py-10">
        <span className="font-bold text-xl">Select Documents to chat</span>
        <CustomDropDown categories={categoriesData} />

        <div className="flex flex-col justify-between mt-auto mb-4"></div>
      </div>
    </div>
  );
};

export default ChatSideBar;
