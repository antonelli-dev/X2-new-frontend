import { create } from "zustand";
import { CategoryStore } from "@/interfaces/categoryStore.interface";

export const useCategoryStore = create<CategoryStore>((set, get) => ({
  categories: {},

  setCategories: (data) => {
    set({ categories: data });
  },

  removeDocumentLocally: (categoryName, docId) => {
    const current = get().categories;
    if (!current[categoryName]) return;

    const updatedDocs = current[categoryName].filter(
      (doc) => doc.doc_id !== docId
    );
    set({
      categories: {
        ...current,
        [categoryName]: updatedDocs,
      },
    });
  },

  removeDocumentFromDB: async (docId) => {
    console.log(`(Boilerplate) Eliminar documento en BD con id: ${docId}`);
  },
}));
