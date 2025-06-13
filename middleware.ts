import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { type NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createServerComponentClient({
    cookies: {
      get: async (name: string) => {
        return req.cookies.get(name)?.value;
      },
      set: async (name: string, value: string, options: any) => {
        res.cookies.set({
          name,
          value,
          ...options,
        });
      },
      remove: async (name: string, options: any) => {
        res.cookies.set({
          name,
          value: "",
          ...options,
        });
      },
    },
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  console.log("Middleware - Session:", session?.user);

  if (req.nextUrl.pathname.startsWith("/dashboard") && !session) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return res;
}
