import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from "next-auth/providers/github";
// import FacebookProvider from "next-auth/providers/facebook"

import { connectDB } from "@utils/database"
import User from "@models/UserModal"

declare module "next-auth" {
    interface Session {
        user:{
            email: string,
            name: string,
            image: string,
            uid: string,
        }
    }

    interface Profile {
        picture: string,
    }
}

const handler = NextAuth({
    providers:[
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
            authorization:{
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        })
        // FacebookProvider({
        //     clientId: process.env.FACEBOOK_ID as string,
        //     clientSecret: process.env.FACEBOOK_SECRET as string,
        // })
    ],
    callbacks:{
        async session({session}){
            const sessionUser = await User.findOne({email: session.user?.email})
            // console.log("sessionUser",sessionUser)

            session.user.uid = sessionUser._id.toString()
            return session
        },
        
        async signIn({profile}){
            // console.log("profile",profile)
            try {
                await connectDB()
    
                const userExists = await User.findOne({email: profile?.email})
                if(!userExists){
                    await User.create({
                        email: profile?.email,
                        name: profile?.name,
                        image: profile?.picture,
                    })
                }
                return true
            } catch (err) {
                console.log(err)
                return false
            }
        },
    },
    pages:{
        signIn: "/auth/signin"
    },
    session:{
        strategy: "jwt"
    }
})


export {handler as GET, handler as POST}