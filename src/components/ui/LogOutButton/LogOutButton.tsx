"use client";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    await supabase.auth.signOut();
    router.replace("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="text-left text-xl py-1 px-4 hover:bg-gray-100 rounded"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
