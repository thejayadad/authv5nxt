import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./lib/prisma";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt"; // Make sure to import bcrypt

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login"
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const { email, password } = credentials;

        // Find the user by email
        const user = await prisma.user.findUnique({
          where: { email },
        });

        // If user is not found or password is not set, throw an error
        if (!user || !user.password) {
          throw new Error("No user found");
        }

        // Compare the provided password with the hashed password in the database
        const passwordMatch = await bcrypt.compare(password, user.password);
        
        if (!passwordMatch) {
          throw new Error("Invalid password");
        }

        // Return the user object if authentication is successful
        return user;
      },
    }),
  ],
});
