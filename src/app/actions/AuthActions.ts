"use server";

import { signIn, signOut } from "@/auth";
import { prisma } from "@/prisma";
import { revalidatePath } from "next/cache";

const getUserByEmail = async (email: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });
        return user;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const login = async (provider: string) => {
    await signIn(provider, { redirectTo: "/" });
    revalidatePath("/");
};

export const logout = async () => {
    await signOut({ redirectTo: "/" });
    revalidatePath("/");
};

export const loginWithCreds = async ({ email, password }: { email: string, password: string }): Promise<any> => {
    try {
        const existingUser = await getUserByEmail(email);
        if (!existingUser) {
            throw new Error("Invalid User Credentials!");
        }
        console.log("\nexistingUser : ", existingUser);

        const userData = {
            email,
            password,
            redirectTo: "/",
        };
        await signIn("credentials", userData);
        revalidatePath("/");
    } catch (error: any) {
        console.log("Login_Credentials : ", error)
        return { error: error.message || "An unexpected error occurred." };
    }
};

export const OAuthLogin = async (provider: string) => {
    // try {
    const res = await signIn(provider, {
        callbackUrl: "/",
    });
    console.log("oAUthLoginRes", res);
    // redirect: callback !== "" ? true : false,

    //     router.push(res?.url || "/dashboard");
    // } catch (err) {
    //     toast.error("Something went wrong!", {
    //         id: OAuthTostID,
    //     });
    //     console.log(err);
    // } finally {
    //     setIsLoading(false);
    //     toast.dismiss();
    // }
};