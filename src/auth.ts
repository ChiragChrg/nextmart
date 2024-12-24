import NextAuth from "next-auth"
import authConfig from "./auth.config"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./prisma"


export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: "jwt",
        maxAge: 2 * 60 * 60
    },
    secret: process.env.AUTH_SECRET,
    debug: true,
    ...authConfig,
})