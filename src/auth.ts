import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { connectionToDatabase } from "./lib/mongodb";
import { User } from "./models/users";
import bcrypt from "bcryptjs";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      authorize: async (credentials) => {
        await connectionToDatabase();
        const user = await User.findOne({ email: credentials.email });

        if (!user) return null;

        const isPasswordValid = await bcrypt.compare(
          credentials.password as string,
          user.password,
        );
        if (!isPasswordValid) return null;

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
});
