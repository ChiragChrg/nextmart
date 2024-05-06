"use server"

import { createClient } from "@/utils/supabase/server";
import { cookies, headers } from "next/headers";

type RegisterProps = {
    username: string,
    email: string,
    password: string,
}

export const registerUser = async ({ username, email, password }: RegisterProps) => {
    if (!username || !email || !password) {
        throw new Error("Missing Fields")
    }

    const origin = headers().get("origin");
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const authResponse = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                username
            },
            emailRedirectTo: `${origin}/auth/callback`,
        },
    });

    return authResponse
};

type LoginProps = {
    email: string,
    password: string,
}

export const loginUser = async ({ email, password }: LoginProps) => {
    if (!email || !password) {
        throw new Error("Missing Fields")
    }

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const authResponse = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    return authResponse
};

type Provider =
    | 'apple'
    | 'azure'
    | 'bitbucket'
    | 'discord'
    | 'facebook'
    | 'figma'
    | 'github'
    | 'gitlab'
    | 'google'
    | 'kakao'
    | 'keycloak'
    | 'linkedin'
    | 'linkedin_oidc'
    | 'notion'
    | 'slack'
    | 'spotify'
    | 'twitch'
    | 'twitter'
    | 'workos'
    | 'zoom'
    | 'fly'

export const OAuthLogin = async (provider: Provider) => {
    if (!provider) {
        throw new Error("Missing Provider")
    }

    const origin = headers().get("origin");
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const authResponse = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
            queryParams: {
                access_type: 'offline',
                prompt: 'consent',
            },
            redirectTo: `${origin}/auth/callback`,
        }
    })

    return authResponse
};