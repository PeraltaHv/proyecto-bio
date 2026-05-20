import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Admin Login",
      credentials: {
        username: { label: "Usuario", type: "text" },
        password: { label: "Contraseña", type: "password" }
      },
      async authorize(credentials) {
        // Validación directa contra tu archivo .env
        if (
          credentials?.username === process.env.ADMIN_USERNAME &&
          credentials?.password === process.env.ADMIN_PASSWORD
        ) {
          return { id: "1", name: "Víctor Admin" };
        }
        return null; // Si los datos no coinciden, rebota el intento
      }
    })
  ],
  pages: {
    signIn: "/login", // Redirige automáticamente a esta página si intentan entrar sin permiso
  },
  session: {
    strategy: "jwt", // Sesión ligera basada en tokens, no requiere base de datos
  }
});

export { handler as GET, handler as POST };