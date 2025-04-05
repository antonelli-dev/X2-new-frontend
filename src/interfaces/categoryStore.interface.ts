import { DocumentData } from "./document.interface";

export interface CategoryStore {
  categories: {
    [categoryName: string]: DocumentData[];
  };
  setCategories: (data: { [categoryName: string]: DocumentData[] }) => void;
  removeDocumentLocally: (categoryName: string, docId: string) => void;
  removeDocumentFromDB: (docId: string) => Promise<void>;
}
