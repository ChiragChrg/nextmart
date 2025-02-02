import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import Github from "next-auth/providers/github"
import { prisma } from "@/prisma"
import * as bcrypt from "bcryptjs"

export default {
    providers: [
        Google({
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_SECRET!
        }),
        Github({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!
        }),
        Credentials({
            credentials: {
                email: { label: "Email", type: "email", placeholder: "example@email.com" },
                password: { label: "Password", type: "password", placeholder: "Enter Password" },
            },
            authorize: async (credentials) => {
                let user = null

                try {
                    if (!credentials?.email || !credentials?.password) {
                        return null
                    }

                    const email = credentials?.email as string
                    const password = credentials?.password as string

                    const userExists = await prisma.user.findUnique({ where: { email } })
                    const matchPassword = await bcrypt.compare(password, userExists?.password as string)

                    if (!userExists?.email || !matchPassword) throw new Error("Invalid Email or Password")

                    user = {
                        id: userExists?.id,
                        name: userExists?.name,
                        email: userExists?.email,
                        emailVerified: userExists?.emailVerified,
                        picture: userExists?.image,
                        role: userExists?.role,
                        address: userExists?.address,
                        createdAt: userExists?.createdAt
                    }

                    console.log("\nCredentials:", user)
                    return user
                } catch (err) {
                    console.log("\nCredentialsErr: ", err)
                    return null
                }
            },

        }),
    ],
    // callbacks: {
    //     async signIn({ user, account, profile }) {
    //         // console.log("\nSinin_Callback", { user, account, profile })
    //         if (account?.type === 'credentials' && user !== null) {
    //             console.log("\nSignIn_Callback: Cred User Allowed")
    //             return true
    //         } else {
    //             try {
    //                 const userExists = await fetch(`${process.env.NEXTAUTH_URL}/api/post/user`, {
    //                     method: "POST",
    //                     headers: {
    //                         "Content-Type": "application/json",
    //                     },
    //                     body: JSON.stringify({ email: profile?.email }),
    //                 });

    //                 if (userExists?.status === 404) {
    //                     const res = await fetch(`${process.env.NEXTAUTH_URL}/api/post/registerOauthUser`, {
    //                         method: "POST",
    //                         headers: {
    //                             "Content-Type": "application/json",
    //                         },
    //                         body: JSON.stringify({
    //                             username: profile?.name,
    //                             email: profile?.email,
    //                             picture: profile?.picture,
    //                         }),
    //                     });
    //                     // const newOAuthUser = await res.json()
    //                     // console.log("\nOAuht signin : ", newOAuthUser)

    //                     if (res.status !== 201) {
    //                         throw new Error("Failed to Create OAuth User")
    //                     }

    //                     // console.log("\nSignIn_Callback: NewOAuth User Created")
    //                 }
    //                 return true
    //             } catch (err) {
    //                 console.log("\nSignin_Callback_Err", err)
    //                 return false
    //             }
    //         }
    //     },
    //     async jwt({ token }) {
    //         const { email } = token

    //         try {
    //             const accessToken = await SignToken({ email })
    //             token = { email, accessToken }
    //         } catch (err) {
    //             console.error("JWT error:", err)
    //         }

    //         // console.log("\nJWT_Callback: Final User Token", token)
    //         return token
    //     },
    //     async session({ session, token }) {
    //         // console.log("\nSession_Final: ", { session, token })
    //         try {
    //             session.user = { ...token }
    //         } catch (err) {
    //             console.error("Session error:", err)
    //         }
    //         // console.log("\nSession_Final: ", session)

    //         return session
    //     }
    // },
} satisfies NextAuthConfig