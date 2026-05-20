import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
});

// Especificamos ÚNICAMENTE las rutas que requieren que estés logueado
export const config = {
  matcher: [
    "/landing",
    "/landing/:path*",
    "/admin",
    "/admin/:path*",
    "/api/user/:path*",
    "/api/links/:path*"
  ],
};