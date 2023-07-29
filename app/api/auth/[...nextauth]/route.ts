import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from "next-auth/providers/github";
// import FacebookProvider from "next-auth/providers/facebook"

import { connectDB } from "@utils/database"
import User from "@models/UserModal"
// import Account from "@models/AccountModal";
import { SignToken } from "@utils/jwt";
import axios from "axios";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "example@email.com" },
                password: { label: "Password", type: "password", placeholder: "Enter Password" },
            },
            async authorize(credentials) {
                console.time("Credentials")

                if (!credentials?.email || !credentials.password) {
                    return null
                }

                const res = await axios.post(`${process.env.NEXTAUTH_URL}/api/login`, {
                    email: credentials?.email,
                    password: credentials?.password,
                })

                // console.log("AuthRES", res?.data)
                console.timeEnd("Credentials")
                if (res?.data) {
                    return res?.data
                }
                else return null
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        })
        // FacebookProvider({
        //     clientId: process.env.FACEBOOK_ID as string,
        //     clientSecret: process.env.FACEBOOK_SECRET as string,
        // })
    ],
    callbacks: {
        async jwt({ token, user, profile, account }) {
            console.time("JWT")
            // console.log("\nJWTCallback", { token, user, profile, account })
            if (account?.type === "oauth") {

                const { picture, ...restToken } = token
                const { id, ...restUser } = user
                // delete token.picture
                // delete user.id

                const newToken = {
                    ...restToken,
                    ...restUser,
                    emailVerified: profile?.email_verified
                }
                const accessToken = SignToken(newToken)

                console.log("\nJWT_Profile_After", { ...newToken, accessToken })
                return { ...newToken, accessToken }
            } else if (user) {
                // delete token.picture
                const { picture, ...restToken } = token

                // console.log("\nJWT_User_After", { ...token, ...user })
                return { ...restToken, ...user }
            }

            console.timeEnd("JWT")
            return token
        },

        async session({ session, token, user }) {
            console.time("Session")
            // console.log("\nSessionCallback", { session, token, user })

            // if (token?.picture) delete token?.picture
            const { picture, ...restToken } = token
            session = {
                user: { ...restToken },
                expires: session.expires
            }

            console.log("\nSessionAfter", session)
            console.timeEnd("Session")
            return session
        },

        async signIn({ user, profile, account }) {
            // console.log("\nSignINCallback", { user, profile, account })
            console.time("SignIN")

            if (account?.provider === "credentials") {
                console.log("Credential Login")
                return true
            }

            try {
                await connectDB()

                const userExists = await User.findOne({ email: profile?.email })
                if (!userExists) {
                    const newUser = await User.create({
                        name: profile?.name,
                        email: profile?.email,
                        emailVerified: profile?.email_verified,
                        image: profile?.picture,
                    })

                    user.uid = newUser._id;
                    console.log("NewOAuth User")
                } else {
                    user.uid = userExists._id;
                    console.log("OAuth User Exisits")
                }

                console.timeEnd("SignIN")
                return true
            } catch (err) {
                console.log("Signin_Callback_Err", err)
                return false
            }
        }
    },
    pages: {
        signIn: "/login"
    },
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === "development",
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }