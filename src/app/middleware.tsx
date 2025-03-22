import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { pathname } = req.nextUrl;

  if (!session && pathname.startsWith("/chat")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return res;
}

export const config = {
  matcher: ["/chat/:path*"],
};
