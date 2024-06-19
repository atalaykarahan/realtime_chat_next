import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

import Credentials from "next-auth/providers/credentials";
import { getLoggedInUserServer } from "./app/api/services/auth.Service";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      async authorize(credentials) {
        console.log("giriş yapmış olmalı")
        return { id: "23", name: "test", email: "posta" };
      },
    }),
  ],
});
