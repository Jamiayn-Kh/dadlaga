import { getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "./db";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (user && user.password === credentials.password) {
          return user;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      const dbUser = await prisma.user.findUnique({
        where: { email: session.user.email },
      });

      session.user.id = dbUser.id;
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
};
