import React from "react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ChatSideBar from "./ChatSideBar";
import DocumentSideBar from "./DocumentSideBar";

const page = async () => {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }
  return (
    <div
      className="w-full h-full flex flex-row"
      style={{
        background: "linear-gradient(180deg, #FFFFFF 0%, #ECF5FF 100%)",
      }}
    >
      <div className="h-full w-1/5 ">
        <ChatSideBar />
      </div>
      <div className="h-full w-3/5">XDD</div>
      <div className="h-full w-1/5">
        <DocumentSideBar />
      </div>
    </div>
  );
};

export default page;
