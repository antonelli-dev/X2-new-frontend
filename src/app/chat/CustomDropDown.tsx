"use client";
import React, { useState } from "react";
import { useChatStore } from "@/stores/useChatStore";

interface CustomDropDownProps {
  categories: {
    category: string;
    docs: {
      name: string;
      doc_id: string;
    }[];
  }[];
  onSelectionChange?: (selectedIds: string[]) => void;
}

const CustomDropDown = ({
  categories,
  onSelectionChange,
}: CustomDropDownProps) => {
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(
    {}
  );

  const selectedDocuments = useChatStore((state) => state.selectedDocuments);
  const selectedDocIds = React.useMemo(
    () => selectedDocuments.map((doc) => doc.doc_id),
    [selectedDocuments]
  );

  const setSelectedDocuments = useChatStore(
    (state) => state.setSelectedDocuments
  );

  const toggleDropdown = (category: string) => {
    setOpenCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const isCategorySelected = (docIds: string[]) =>
    docIds.every((id) => selectedDocIds.includes(id));

  const toggleCategorySelection = (
    docs: { doc_id: string; name: string }[]
  ) => {
    const docIds = docs.map((d) => d.doc_id);
    const allSelected = isCategorySelected(docIds);

    const updated = allSelected
      ? selectedDocIds.filter((id) => !docIds.includes(id))
      : [
          ...selectedDocIds,
          ...docIds.filter((id) => !selectedDocIds.includes(id)),
        ];

    const updatedDocs = categories
      .flatMap((cat) => cat.docs)
      .filter((doc) => updated.includes(doc.doc_id));

    setSelectedDocuments(updatedDocs);
    if (onSelectionChange) onSelectionChange(updated);
  };

  const toggleDocSelection = (doc_id: string) => {
    const updatedIds = selectedDocIds.includes(doc_id)
      ? selectedDocIds.filter((id) => id !== doc_id)
      : [...selectedDocIds, doc_id];

    const updatedDocs = categories
      .flatMap((cat) => cat.docs)
      .filter((doc) => updatedIds.includes(doc.doc_id));

    setSelectedDocuments(updatedDocs);
    if (onSelectionChange) onSelectionChange(updatedIds);
  };

  const isSelected = (doc_id: string) => selectedDocIds.includes(doc_id);

  return (
    <div className="w-full">
      {categories.map(({ category, docs }) => {
        const docIds = docs.map((d) => d.doc_id);
        const allSelected = isCategorySelected(docIds);

        return (
          <div key={category} className="border-b border-gray-300 py-2">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={() => toggleCategorySelection(docs)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-lg font-semibold">{category}</span>
              <span
                onClick={() => toggleDropdown(category)}
                className="ml-auto cursor-pointer text-blue-500"
              >
                {openCategories[category] ? "▲" : "▼"}
              </span>
            </div>

            {openCategories[category] && (
              <div className="pl-6 mt-3 space-y-2">
                {docs.map((doc) => (
                  <div
                    key={doc.doc_id}
                    onClick={() => toggleDocSelection(doc.doc_id)}
                    className={`cursor-pointer rounded px-3 py-1 text-sm truncate max-w-full transition 
                      ${
                        isSelected(doc.doc_id)
                          ? "bg-blue-200 text-blue-800 font-medium"
                          : "bg-white text-gray-700 hover:bg-gray-100"
                      }`}
                    title={doc.name}
                  >
                    {doc.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}

      <pre className="text-xs mt-4 bg-gray-100 p-2 rounded text-gray-600">
        {JSON.stringify(selectedDocIds, null, 2)}
      </pre>
    </div>
  );
};

export default CustomDropDown;
