import { CategoryFormatted } from "@/interfaces/category-formatted.interface";
import { Category } from "@/interfaces/category.interface";

export const mapCategoriesFromCategoriesResponse = (categories: Category): CategoryFormatted[] => {
    return Object.entries(categories.documents).map(([categoryName]) => ({
        name: categoryName,
        isNewCategory: false,
    }))
};

export const mapDocumentsFromCategoriesResponse = (categories: Category) => {
    return Object.entries(categories.documents).flatMap(
        ([categoryName, documents]) => {
            return documents.map((document) => ({
                categoryName,
                documentId: document.doc_id,
                documentName: document.name,
            }));
        }
    );
}