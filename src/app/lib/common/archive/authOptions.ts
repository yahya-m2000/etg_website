// import GoogleProvider from "next-auth/providers/google";
// import GitHubProvider from "next-auth/providers/github";
// // import * as bcrypt from "bcrypt"; // Only needed if you plan to add credentials-based authentication later
// import jwt from "jsonwebtoken";
// import { NextAuthOptions } from "next-auth";
// import { JWT } from "next-auth/jwt";

// // Define your authOptions with Google and GitHub Providers
// export const authOptions: NextAuthOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//     GitHubProvider({
//       clientId: process.env.GITHUB_CLIENT_ID!,
//       clientSecret: process.env.GITHUB_CLIENT_SECRET!,
//     }),
//     // You can add other providers here in the future (e.g., Credentials, Twitter)
//   ],
//   session: {
//     strategy: "jwt", // Use JWT for session handling
//   },
//   jwt: {
//     async encode({ token, secret }) {
//       if (!token) {
//         throw new Error("Token is undefined");
//       }
//       return jwt.sign(token, secret, { algorithm: "HS256" });
//     },
//     async decode({ token, secret }) {
//       if (!token) {
//         throw new Error("Token is undefined");
//       }
//       try {
//         return jwt.verify(token, secret, { algorithms: ["HS256"] }) as JWT;
//       } catch (error) {
//         console.error("JWT decode error:", error);
//         return null;
//       }
//     },
//   },
//   callbacks: {
//     async jwt({ token, user }) {
//       // If user exists (on first login), attach the user ID to the token
//       if (user) {
//         token.id = user.id;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       // Attach token data to session
//       if (token) {
//         session.id = token.id;
//       }
//       return session;
//     },
//   },
//   pages: {
//     signIn: "/auth/signin", // Custom sign-in page (optional)
//     signOut: "/auth/signout", // Custom sign-out page (optional)
//     error: "/auth/error", // Custom error page (optional)
//   },
//   debug: process.env.NODE_ENV === "development", // Enable debug mode in development
// };
