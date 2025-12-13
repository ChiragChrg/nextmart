"use client";

import { useState, useEffect, useTransition } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import { registerUser } from "@/app/actions/AuthActions";
import Input from "../CustomUI/Input";
import SubmitButton from "../CustomUI/SubmitButton";
import { z } from "zod";

const registerSchema = z
    .object({
        username: z.string().min(3, "Username must be at least 3 characters long"),
        email: z.string().email("Invalid email format"),
        password: z
            .string()
            .min(6, "Password must be at least 6 characters long")
            .max(20, "Password must not exceed 20 characters")
            .regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[a-zA-Z\d@$!%*?&]{6,}$/,
                "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
            ),
        confirm_password: z.string(),
    })
    .refine((data) => data.password === data.confirm_password, {
        message: "Passwords do not match",
        path: ["confirm_password"],
    });

type RegisterFormData = z.infer<typeof registerSchema>;
type RegisterFormErrors = Partial<Record<keyof RegisterFormData, string>>;

const RegisterForm = () => {
    const [formData, setFormData] = useState<RegisterFormData>({
        username: "",
        email: "",
        password: "",
        confirm_password: "",
    });

    const [errors, setErrors] = useState<RegisterFormErrors>({});
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        if (Object.keys(errors).length > 0) {
            Object.values(errors).forEach((error) => {
                if (error) {
                    toast.error(error);
                }
            });
        }
    }, [errors]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (
            name === "username" ||
            name === "email" ||
            name === "password" ||
            name === "confirm_password"
        ) {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const result = registerSchema.safeParse(formData);

        if (!result.success) {
            const errorMessages: RegisterFormErrors = {};

            result.error.issues.forEach((issue) => {
                const key = issue.path[0];

                if (
                    key === "username" ||
                    key === "email" ||
                    key === "password" ||
                    key === "confirm_password"
                ) {
                    errorMessages[key] = issue.message;
                }
            });

            setErrors(errorMessages);
            return;
        }

        setErrors({});

        startTransition(async () => {
            const formDataObj = new FormData();
            formDataObj.append("username", formData.username);
            formDataObj.append("email", formData.email);
            formDataObj.append("password", formData.password);
            formDataObj.append("confirm_password", formData.confirm_password);

            const response = await registerUser(formDataObj);

            if (response.status === 201) {
                toast.success(response.message);
                redirect("/login");
            } else {
                toast.error(response.message);
            }
        });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-background py-4 sm:p-4 pt-8 flex flex-col gap-8 sm:gap-4 w-full sm:max-w-md"
        >
            <div className="flex flex-col">
                <Input
                    type="text"
                    label="Username"
                    name="username"
                    placeholder="Enter your name"
                    value={formData.username}
                    onChange={handleChange}
                />
                {errors.username && (
                    <p className="text-red-500 text-sm">{errors.username}</p>
                )}
            </div>

            <div className="flex flex-col">
                <Input
                    type="email"
                    label="Email"
                    name="email"
                    placeholder="example@email.com"
                    value={formData.email}
                    onChange={handleChange}
                />
                {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                )}
            </div>

            <div className="flex flex-col">
                <Input
                    type="password"
                    label="Password"
                    name="password"
                    placeholder="Enter Password"
                    value={formData.password}
                    onChange={handleChange}
                />
                {errors.password && (
                    <p className="text-red-500 text-sm">{errors.password}</p>
                )}
            </div>

            <div className="flex flex-col">
                <Input
                    type="password"
                    label="Confirm Password"
                    name="confirm_password"
                    placeholder="Confirm Password"
                    value={formData.confirm_password}
                    onChange={handleChange}
                />
                {errors.confirm_password && (
                    <p className="text-red-500 text-sm">{errors.confirm_password}</p>
                )}
            </div>

            <SubmitButton text="Create Account" pending={isPending} />

            <div className="w-full flex gap-2 justify-center">
                Already have an account?
                <Link
                    href="/login"
                    className="text-primaryClr font-bold capitalize tracking-wider"
                >
                    Login
                </Link>
            </div>
        </form>
    );
};

export default RegisterForm;
