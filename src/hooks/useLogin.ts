import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

type LoginInput = { email: string; password: string };

export const useLogin = () => {
  const { login } = useAuth();
  const router = useRouter();

  return useMutation({
    mutationFn: async ({ email, password }: LoginInput) => {
      await login(email, password);
      router.prefetch("/chat");
    },
    onSuccess: () => {
      router.push("/chat");
    },
  });
};
