import { withAuth } from "next-auth/middleware";

export default withAuth({
pages: {
signIn: "/login",
},
});

export const config = {
matcher: [
"/landing",
"/landing/:path*",
"/admin",
"/admin/:path*",
],
};