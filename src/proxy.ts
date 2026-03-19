import { auth } from "@/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


export default auth((req: NextRequest) => {

  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/admin")) {
    const isAdmin = req.cookies.get("isAdmin")?.value;

    if (!isAdmin || isAdmin !== "true") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*"],
};
