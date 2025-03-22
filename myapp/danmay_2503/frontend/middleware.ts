// import NextAuth from "next-auth";
//import { authConfig } from "./auth.config";
import { NextResponse } from "next/server";

// export default NextAuth(authConfig).auth;

import { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("access_token"); // Lấy token từ cookie
  const url = req.nextUrl;

  // Nếu người dùng đã đăng nhập và truy cập /
  if (token && url.pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Nếu người dùng chưa đăng nhập và truy cập /dashboard, chuyển hướng đến /login
  if (!token && url.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Nếu người dùng đã đăng nhập và truy cập /login, chuyển hướng đến /dashboard
  if (token && url.pathname === "/login") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
