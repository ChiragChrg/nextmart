"use server";

import { prisma } from "@/prisma";
import { saltAndHashPassword } from "@/lib/utils";

type ResponseType = {
    status: number;
    message: string;
    formFields?: any;
    response?: any;
}

export const getUserByEmail = async (email: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (user) {
            const { password, ...restInfo } = user
            return {
                ...restInfo,
                createdAt: user.createdAt.toISOString(),
                updatedAt: user.updatedAt.toISOString(),
            };
        }

        return null;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const registerUser = async (previousState: unknown, formData: FormData) => {
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirm_password") as string;
    console.log("User_Reg_Init", { username, email, password, confirmPassword })

    const formFields = { username, email, password, confirmPassword }

    try {
        if (!username || !email || !password || !confirmPassword) {
            return { status: 422, message: "Invalid User Registration Fields!", formFields } as ResponseType
        }

        if (password !== confirmPassword) {
            return { status: 422, message: 'Password and Confirm Password do not match', formFields } as ResponseType
        }

        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            return { status: 409, message: "User Email already exists!", formFields } as ResponseType
        }

        const hashedPassword = saltAndHashPassword(password)
        const newUser = await prisma.user.create({
            data: {
                name: username,
                email: email,
                password: hashedPassword
            }
        })

        console.log("New_User", newUser)

        return { status: 201, message: "User Registered Successfully!" } as ResponseType
    } catch (error: any) {
        console.log("User_Register : ", error)
        return { status: 500, message: error.message || "An unexpected error occurred.", formFields } as ResponseType;
    }
}