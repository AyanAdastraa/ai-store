import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

export const { 
  handlers, // 🟢 THIS IS THE MISSING PIECE
  auth, 
  signIn, 
  signOut 
} = NextAuth({
  providers: [GitHub],
  secret: process.env.AUTH_SECRET,
  trustHost: true,
});