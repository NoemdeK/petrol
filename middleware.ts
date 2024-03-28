// Ref: https://next-auth.js.org/configuration/nextjs#advanced-usage
import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(request: NextRequestWithAuth) {
    // console.log(request.nextUrl.pathname)
    // console.log(request.nextauth.token)

    if (
      request.nextUrl.pathname.startsWith("/admin") &&
      request.nextauth.token?.role !== "rwx_admin"
    ) {
      return NextResponse.rewrite(new URL("/denied", request.url));
    }

    if (
      request.nextUrl.pathname.startsWith("/analyst") &&
      request.nextauth.token?.role !== "rwx_admin" &&
      request.nextauth.token?.role !== "rwx_data_entry_analyst"
    ) {
      return NextResponse.rewrite(new URL("/denied", request.url));
    }

    if (
      request.nextUrl.pathname.startsWith("/data-entry") &&
      request.nextauth.token?.role !== "rwx_admin" &&
      request.nextauth.token?.role !== "rwx_data_entry_analyst" &&
      request.nextauth.token?.role !== "rwx_data_entry_user"
    ) {
      return NextResponse.rewrite(new URL("/denied", request.url));
    }

    if (
      request.nextUrl.pathname.startsWith("/dashboard") &&
      request.nextauth.token?.role !== "rwx_admin" &&
      request.nextauth.token?.role !== "rwx_data_entry_analyst" &&
      request.nextauth.token?.role !== "rwx_user"
    ) {
      return NextResponse.rewrite(new URL("/denied", request.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

// Applies next-auth only to matching routes - can be regex
// Ref: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/data-entry/:path*",
    "/admin/:path*",
    "/analyst/:path*",
  ],
};
