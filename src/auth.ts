import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { 
  handlers, 
  auth, 
  signIn, 
  signOut 
} = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    })
  ],
  secret: process.env.AUTH_SECRET,
  trustHost: true,
  pages: {
    signIn: '/login', // 🟢 Forces NextAuth to use your custom brutalist login page
  }
});