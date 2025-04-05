import { DocumentData } from "./document.interface";

export interface Category {
  message: string;
  user_id: string;
  documents: {
    [categoryName: string]: DocumentData[];
  };
}
