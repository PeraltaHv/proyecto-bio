import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
});

// Especificamos ÚNICAMENTE las pantallas de la app que requieren sesión
export const config = {
  matcher: [
    "/landing",
    "/landing/:path*",
    "/admin",
    "/admin/:path*"
  ],
};