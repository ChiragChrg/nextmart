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