"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Input from "../CustomUI/Input";
import SubmitButton from "../CustomUI/SubmitButton";
import toast from "react-hot-toast";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { z } from "zod";

// Zod validation schema
const loginSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});

const LoginForm = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validate form with Zod
        const result = loginSchema.safeParse(formData);
        if (!result.success) {
            const errorMessages: Record<string, string> = {};
            result.error.issues.forEach((issue) => {
                errorMessages[issue.path[0]] = issue.message;
            });
            setErrors(errorMessages);
            return;
        }

        // Clear previous errors before submitting
        setErrors({});
        const LoginToastID = toast.loading("Logging in...");
        setIsLoading(true);

        try {
            const res = await signIn("credentials", {
                email: formData.email,
                password: formData.password,
                redirect: false,
            });

            console.log({ res })

            if (res?.status === 200 && res?.error === null) {
                toast.success("Logged in Successfully!", { id: LoginToastID });
                router.push(callbackUrl ? decodeURIComponent(callbackUrl) : "/");
            } else {
                toast.error("Invalid Email or Password", { id: LoginToastID });
            }
        } catch (err) {
            toast.error("Invalid Email or Password", { id: LoginToastID });
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleLogin}
            className="bg-background py-4 sm:p-4 pt-8 flex flex-col gap-8 sm:gap-4 w-full sm:max-w-md"
        >
            <div className="flex flex-col">
                <Input
                    type="email"
                    name="email"
                    label="Email"
                    placeholder="example@email.com"
                    value={formData.email}
                    onChange={handleChange}
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            <div className="flex flex-col gap-2">
                <Input
                    type="password"
                    name="password"
                    label="Password"
                    placeholder="Enter Password"
                    value={formData.password}
                    onChange={handleChange}
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                <div className="text-primaryClr text-[0.9em] sm:text-[0.8em] w-full flex justify-end">
                    Forgot Password?
                </div>
            </div>

            <SubmitButton text="Login" pending={isLoading} />

            <div className="w-full flex gap-2 justify-center">
                New to NextMart?
                <Link href="/register" className="text-primaryClr font-bold capitalize tracking-wider">
                    Register
                </Link>
            </div>
        </form>
    );
};

export default LoginForm;