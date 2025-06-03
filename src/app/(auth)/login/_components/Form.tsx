"use client"

import { login } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoginSchema } from "@/validations/vaildations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form"
import { toast } from "sonner";
import zod from "zod"

export default function Form() {
    const [showPassword, setShowPassword] = useState(false);

    type LoginForm = zod.infer<typeof LoginSchema>


    const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({ resolver: zodResolver(LoginSchema) });

    const onSubmit: SubmitHandler<LoginForm> = async (user) => {
        const response = await login(user);
        if (response?.status === 200) {
            return toast.success(response.message)
        } else {
            return toast.error(response?.data.message)
        }

    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
                <label htmlFor="">Email</label>
                <div className="relative">

                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                    <Input
                        type="email"
                        placeholder="Email"
                        className={`pl-10 border-2 ${errors.email ? "border-red-500 focus:ring-red-500 focus:outline-red-500 focus:border-red-500" : ""}`}
                        {...register("email", { required: true })}
                    />
                </div>
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="">Password</label>
                <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                    <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        className={`pl-10 border-2 ${errors.password ? "border-red-500 focus:ring-red-500 focus:outline-red-500 focus:border-red-500" : ""}`}
                        {...register("password", { required: true })}
                    />
                    {showPassword ? <EyeOff onClick={() => setShowPassword(false)} className="absolute right-3 cursor-pointer top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                        : <Eye onClick={() => setShowPassword(true)} className="absolute right-3 cursor-pointer top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                    }
                </div>
                {errors.password && <p className="text-red-500">{errors.password.message}</p>}

            </div>
            <Button type="submit" className="bg-[#3B82F6] hover:bg-[#7ca8b8]">Submit</Button>
        </form>
    )
}
