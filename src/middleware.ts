import { NextRequest, NextResponse } from "next/server";
import {
  INSTRUCTOR_ROUTES,
  ROLES,
  Routes,
  STUDENT_ROUTES,
} from "./constants/constants";
import { jwtVerify } from "jose";

export const middleware = async (req: NextRequest) => {
  const path = req.nextUrl.pathname;


  const token = req.cookies.get("token")?.value;

  const authPath =
    path === "/login" ||
    path === Routes.REGISTER ||
    path === Routes.FORGET_PASSWORD ||
    path === Routes.RESET_PASSWORD;

  if (authPath && token) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }



  if (!authPath && !token) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }



};

export const config = {
  // Matcher ignoring `/_next/`, `/api/`, ..etc
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|public|assets).*)",
  ],
};
