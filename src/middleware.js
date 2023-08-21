import { NextRequest, NextResponse } from "next/server";

export async function middleware(request) {
  const url = request.url;
  const pathname = request.nextUrl.pathname;
  console.log(request);
  if (pathname.startsWith("/profile")) {
    let strCookie = "";
    request.cookies.getAll().forEach((element) => {
      strCookie += `${element?.name}=${element?.value}; `;
    });

    const { data } = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/user/profile`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          cookie: strCookie,
        },
      }
    ).then((res) => res.json());
    const { user } = data || {};
    // console.log(user);
    if (!user) return NextResponse.redirect(new URL("/login", url));
  }
  //
  if (pathname.startsWith("/admin")) {
    let strCookie = "";
    request.cookies.getAll().forEach((element) => {
      strCookie += `${element?.name}=${element?.value}; `;
    });

    const { data } = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/user/profile`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          cookie: strCookie,
        },
      }
    ).then((res) => res.json());

    const { user } = data || {};
    //
    if (!user) return NextResponse.redirect(new URL("/login", url));
    //
    if (user && user.role !== "ADMIN")
      return NextResponse.redirect(new URL("/profile", url));
  }
}

//
export const config = {
  matcher: ["/profile/:path*", "/admin/:path*"],
};
