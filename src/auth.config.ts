import type { NextAuthConfig, Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";

export const authConfig: NextAuthConfig = {
  session: {
    strategy: "jwt",
  },
  providers: [Credentials({})],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    jwt({ token, user }: { token: JWT; user?: any }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }: { session: Session; token: JWT }) {
      session.user.role = token.role as string;
      session.user.id = token.id as string;
      return session;
    },
  },
};
