"use server";
import { cookies } from 'next/headers';
import { SignToken } from '@/lib/jwt';

type ResponseType = {
    status: number;
    message: string;
    formFields?: any;
    response?: any;
}

export const adminLogin = async (previousState: unknown, formData: FormData) => {
    const email = process.env.ADMIN_EMAIL;
    const password = formData.get("password") as string;
    console.log("ADminLogin", { email, password })

    try {
        if (!email || !password) {
            return { status: 422, message: "Invalid Fields!" } as ResponseType
        }

        if (email !== process.env.ADMIN_EMAIL) {
            return { status: 422, message: 'Invalid User' } as ResponseType
        }

        if (password !== process.env.ADMIN_PASSWORD) {
            return { status: 422, message: 'Invalid Password' } as ResponseType
        }

        const token = await SignToken({ email }, "1h");
        const cookieStore = await cookies();
        cookieStore.set('nextmart_admin_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60,
            path: '/admin',
        });

        return { status: 200, message: "Admin Login Successful!" } as ResponseType
    } catch (error: any) {
        console.log("Admin_Login : ", error)
        return { status: 500, message: error.message || "An unexpected error occurred." } as ResponseType;
    }
}