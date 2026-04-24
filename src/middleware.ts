import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const role = req.auth?.user?.role;
  const isLoggedIn = !!req.auth;
  const isLoginPage = req.nextUrl.pathname === "/login";
  console.log("role", role);
  console.log("isLoggedIn", isLoggedIn);

  if (!isLoggedIn && !isLoginPage) {
    return Response.redirect(new URL("/login", req.url));
  }

  if (isLoggedIn && isLoginPage) {
    if (role === "admin") {
      return Response.redirect(new URL("/dashboard", req.url));
    } else {
      return Response.redirect(new URL("/", req.url));
    }
  }

  if (isLoggedIn && role !== "admin" && req.nextUrl.pathname === "/dashboard") {
    return Response.redirect(new URL("/", req.url));
  }
});

export const config = {
  matcher: ["/dashboard", "/login"],
};
