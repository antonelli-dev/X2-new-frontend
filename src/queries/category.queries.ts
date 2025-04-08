import { Category } from "@/interfaces/category.interface";
import { getCategories } from "@/services/CategoryServices";
import { useQuery} from "@tanstack/react-query";

export const useFetchCategories = (userId: string) => {
  return useQuery<Category, Error>({
    queryKey: ["categories", userId],
    queryFn: () => getCategories(userId),
  });
};

// export const useDeleteChat = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: (chatId: string) => deleteChat(chatId),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["chats"] });
//     },
//   });
// };

// export const useUpdateChatName = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: ({ chatId, chatName }: { chatId: string; chatName: string }) =>
//       updateChatName(chatId, chatName),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["chats"] });
//     },
//   });
// };
