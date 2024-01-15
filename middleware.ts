export { default } from "next-auth/middleware"

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/data-entry/:path*",
        "/admin/:path*",
        "/analyst/:path*"
    ]
}