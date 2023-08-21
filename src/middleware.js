import { NextResponse } from "next/server";
import middlewareAuth from "./app/utils/middlewareAuth";

export async function middleware(request) {
  const url = request.url;
  const pathname = request.nextUrl.pathname;
  console.log(request);
  //
  if (pathname.startsWith("/profile")) {
    const user = await middlewareAuth(request);
    // console.log(user);
    if (!user) return NextResponse.redirect(new URL("/login", url));
  }
  //
  if (pathname.startsWith("/admin")) {
    const user = await middlewareAuth(request);
    //
    if (!user) return NextResponse.redirect(new URL("/login", url));
    //
    if (user && user.role !== "ADMIN")
      return NextResponse.redirect(new URL("/profile", url));
  }
  //
  if (pathname.startsWith("/login")) {
    const user = await middlewareAuth(request);
    if (user) return NextResponse.redirect(new URL("/profile", url));
  }
  //
  if (pathname.startsWith("/complete-profile")) {
    const user = await middlewareAuth(request);
    if (user) return NextResponse.redirect(new URL("/profile", url));
  }
}

//
export const config = {
  matcher: [
    "/profile/:path*",
    "/admin/:path*",
    "/login/:path*",
    "/complete-profile/:path*",
  ],
};
