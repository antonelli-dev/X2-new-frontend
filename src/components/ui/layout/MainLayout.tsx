'use client';

import { useAuthStore } from "@/stores/useAuthStore";
import { createClient } from "@/utils/supabase/client";
import { useEffect } from "react";

interface Props {
    children: React.ReactNode;
}

export const MainLayout = ({ children }: Props) => {

    const setUser = useAuthStore((state) => state.setUser);
    const supabase = createClient();

    useEffect(() => {
      const getUser = async () => {
        const { data } = await supabase.auth.getUser();
        if (data?.user) {
          setUser({
            user_id: data.user.id,
          });
        }
      };
  
      getUser();
  
      const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
        if(session) {
          setUser({
            user_id: session.user.id,
          });
        }
        else {
            setUser(null);
            }
      });
  
      return () => {
        listener?.subscription.unsubscribe();
      };
    }, [setUser]);
  
    return <>{children}</>;
}