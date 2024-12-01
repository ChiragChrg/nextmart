import NextAuth from "next-auth";

declare module "next-auth" {
    interface User {
        id?: string,
        uid?: string | null,
        username?: string | null,
        collegeName?: string | null,
        email?: string | null,
        image?: string | null,
        picture?: string | null,
        phone?: string | null,
        emailVerified?: Date | null,
        accessToken?: string,
    }

    interface Session {
        user?: AdapterUser,
        expires?: string
    }

    interface Profile {
        email_verified?: boolean,
        picture?: string,
        accessToken?: string
    }
}