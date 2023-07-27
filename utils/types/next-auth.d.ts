import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            email: string,
            name: string,
            image: string,
            uid: string,
            emailVerified: boolean,
            accessToken: string,
        },
    }

    interface Profile {
        email_verified?: boolean,
        picture?: string,
        accessToken?: string
    }

    interface User {
        uid?: string
        accessToken?: string
    }
}