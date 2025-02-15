'use client'
import { cn } from "@/lib/utils"
import { useState, SetStateAction, Dispatch } from "react"

interface InputProps {
    label?: string,
    type: "text" | "email" | "password" | "number",
    name?: string,
    placeholder?: string,
    defaultValue?: string,
    required?: boolean,
    disabled?: boolean,
    className?: string,
    min?: number,
    max?: number,
    value?: string,
    setValue?: Dispatch<SetStateAction<any>>
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    ref?: React.RefObject<HTMLInputElement | null>
}


const Input = ({ label, type, name, placeholder, defaultValue, required = true, disabled = false, className, min, max, value, setValue, onChange, ref }: InputProps) => {
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const TogglePassword = () => {
        setShowPassword(prev => !prev)
    }

    return (
        <label className={cn('relative border border-primaryClr_Lite sm:focus-within:border-primaryClr rounded p-1 flex flex-col w-full', className)}>
            {label && <span className='absolute top-[-0.9em] text-[0.9em] bg-background px-1 text-slate-500'>{label}</span>}
            <input
                type={showPassword ? "text" : type}
                name={name}
                placeholder={placeholder}
                defaultValue={defaultValue}
                value={value}
                required={required}
                disabled={disabled}
                onChange={(e) => {
                    setValue?.(e.target.value);
                    onChange?.(e);
                }}
                min={min}
                max={max}
                ref={ref}
                className='text-[1em] bg-background text-textClr px-2 py-1 border-none outline-none disabled:text-muted-foreground' />

            {type === "password" &&
                <div className="p-1 mr-2 w-fit absolute right-0 cursor-pointer" onClick={TogglePassword}>
                    {showPassword ?
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        :
                        <svg xmlns="http://</svg>www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                        </svg>
                    }
                </div>
            }

        </label>
    )
}

export default Input