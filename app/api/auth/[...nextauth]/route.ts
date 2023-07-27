import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from "next-auth/providers/github";
// import FacebookProvider from "next-auth/providers/facebook"

import { connectDB } from "@utils/database"
import User from "@models/UserModal"
import Account from "@models/AccountModal";
// import { useReducer } from "react";
import { SignToken } from "@utils/jwt";
import axios from "axios";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "example@email.com" },
                password: { label: "Password", type: "password", placeholder: "Enter Password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) {
                    return null
                }

                // const res = await fetch(`http://localhost:3000/api/login`, {
                //     method: "POST",
                //     headers: {
                //         "Content-Type": "application/json"
                //     },
                //     body: JSON.stringify({
                //         email: credentials?.email,
                //         password: credentials?.password,
                //     })
                // })

                const res = await axios.post(`http://localhost:3000/api/login`, {
                    email: credentials?.email,
                    password: credentials?.password,
                })

                // const user = await res.json()
                console.log("AuthRES", res?.data)

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
            console.log("\nJWTCallback", { token, user, profile, account })
            if (account?.type === "oauth") {
                console.log("\nJWT_Profile_After", { ...token, ...profile })
                const newToken = {
                    uid: user?.uid,
                    name: token?.name,
                    email: token?.email,
                    image: token?.picture,
                    emailVerified: profile?.email_verified
                }

                const accessToken = SignToken(newToken)

                return { ...token, ...newToken, accessToken }
            } else if (user) {
                console.log("\nJWT_User_After", { ...token, ...user })
                return { ...token, ...user }
            }

            return token
        },

        async session({ session, token, user }) {
            console.log("\nSessionCallback", { session, token, user })
            session = {
                ...session,
                user: {
                    uid: token?.uid as string,
                    name: token?.name as string,
                    email: token?.email as string,
                    image: token?.image as string,
                    emailVerified: token?.emailVerified as boolean,
                    accessToken: token?.accessToken as string
                }
            }

            console.log("\nSessionAfter", session)
            return session
        },

        async signIn({ user, profile, account }) {
            console.log("\nSignINCallback", { user, profile, account })
            let userData = {}

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

                    const newAccount = await Account.create({
                        userId: newUser?._id,
                        userEmail: profile?.email,
                        provider: account?.provider,
                        providerAccountId: account?.providerAccountId,
                        refresh_token: account?.refresh_token,
                        access_token: account?.access_token,
                        expires_at: account?.expires_at,
                        id_token: account?.id_token,
                    });

                    user.uid = newUser._id;

                    //Add the Accounte Model Id to User model accounts Array
                    newUser.accounts.push(newAccount._id);
                    await newUser.save();

                    // userData = {
                    //     uid: newUser?._id,
                    //     name: newUser?.name,
                    //     email: newUser?.email,
                    //     image: newUser?.image,
                    //     emailVerified: newUser?.emailVerified,
                    // }

                    console.log("\nNEWOAuth", { newUser, newAccount })
                } else {
                    const accountExists = await Account.findOneAndUpdate(
                        {
                            userId: userExists?._id,
                            provider: account?.provider
                        },
                        {
                            providerAccountId: account?.id,
                            accessToken: account?.accessToken,
                            refresh_token: account?.refresh_token,
                            expiresAt: account?.expiresAt,
                            id_token: account?.id_token,
                        },
                        { new: true }
                    )

                    // userData = {
                    //     uid: userExists?._id,
                    //     name: userExists?.name,
                    //     email: userExists?.email,
                    //     image: userExists?.image,
                    //     emailVerified: userExists?.emailVerified,
                    // }
                    console.log("\OldOAuth", accountExists)
                }

                // const accessToken = SignToken(userData)
                // const newUserObject = { ...userData, accessToken }
                // console.log("\nNEwUSEROBJS", newUserObject)
                // profile = newUserObject

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
})


export { handler as GET, handler as POST }

// callbacks: {
//     // async signIn({ user, profile }) {
//     //     console.log("\nSignInCallback", { user, profile })

//     //     return true

//     // try {
//     //     await connectDB()

//     //     const userExists = await User.findOne({email: profile?.email})
//     //     if(!userExists){
//     //         // await User.create({
//     //         //     email: profile?.email,
//     //         //     name: profile?.name,
//     //         //     image: profile?.image,
//     //         // })

//     //         console.log("NO User FOund!")
//     //     }

//     //     // const {password, ...userWithoutPass} = userExists;
//     //     // const token = SignToken(userWithoutPass)
//     //     // const result = {...userWithoutPass, token}
//     //     return true
//     // } catch (err) {
//     //     console.log(err)
//     //     return false
//     // }
//     // },

//     async session({ session, token }) {
//         // const sessionUser = await User.findOne({ email: session.user?.email })
//         // session.user.token = token as any
//         // session.user.uid = sessionUser?._id.toString()
//         session.accessToken = token as any
//         session.user.uid = token?.uid as string

//         console.log("\nSessionCallback", { session, token })
//         return session
//     },

//     async jwt({ token, user }) {
//         // token = user as any
//         console.log("\nJWTCallback", { token, user })
//         return { ...token, ...user }
//     },
// },