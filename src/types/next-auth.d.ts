import NextAuth from "next-auth";

declare module "next-auth" {
    export interface User {
        name: string;
        email: string;
        image?: string;
    }

    interface Session {
        user?: AdapterUser | User,
        expires?: string
    }

    interface Profile {
        email_verified?: boolean,
        picture?: string,
        accessToken?: string
    }
}