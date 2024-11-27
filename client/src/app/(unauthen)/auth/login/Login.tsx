"use client";

import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import * as z from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';
import Loader from "@/components/Loader";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";


const formSchema = z.object({
    phone: z.string().min(1, {
        message: "Vui lòng nhập Email",
    }),
    password: z.string().min(1, {
        message: "Vui lòng nhập Password",
    }),
});

function formatPhoneNumber(phone: string): string {
    // Remove non-numeric characters
    const cleaned = phone.replace(/\D/g, '');
    
    // Check if the phone number starts with 0 and replace it with +84
    if (cleaned.startsWith('0')) {
        return `+84${cleaned.substring(1)}`;
    }
    return phone; // Return as is if it doesn't start with 0
}



const Login = ({ className }: { className?: string }) => {

    const router = useRouter();
    const [isLoading, setIsLoading] = React.useState(false);
    const [show, setShow] = React.useState({
        showPass: false,
    });

    const form = useForm<z.infer<typeof formSchema>>({
        defaultValues: {
            phone: "",
            password: "",
        },
    });

    async function onSubmit(data) {
        const formattedPhone = formatPhoneNumber(data.phone); // Format the phone number
        console.log(data);
        setIsLoading(true);

        const res = await signIn("credentials", {
            phone: formattedPhone,
            password: data.password,
            redirect: false,
        });
        setIsLoading(false);

        if (res?.error) {
            // toast.error(res.error);
            console.log(res.error);
        } else {
            console.log(res);
            toast.success("Đăng nhập thành công");
            router.push("/");
            router.refresh();
        }
    }

    if (isLoading) {
        return (
            <div className="w-full flex flex-col items-center justify-center">
                <Loader />
            </div>
        )
    }


    return (
        <Card className="w-full max-w-md mx-4 bg-zinc-900 text-white border-zinc-800">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl text-center">Đăng nhập</CardTitle>
                <p className="text-zinc-400 text-center text-sm">
                    Đăng nhập với tài khoản Skylark của bạn
                </p>
            </CardHeader>
            <CardContent className="space-y-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="Nhập số điện thoại"
                                                className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                value={field.value}
                                                onChange={field.onChange}
                                                type="password"
                                                placeholder="Nhập mật khẩu"
                                                className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button className="w-full bg-zinc-800 hover:bg-zinc-700 text-white mt-2">
                            ĐĂNG NHẬP
                        </Button>

                        <div className="text-center">
                            <Link href="#" className="text-purple-500 hover:text-purple-400 text-sm">
                                Quên mật khẩu?
                            </Link>
                        </div>

                        <div className="text-center space-y-2 text-sm">
                            <p className="text-zinc-400">
                                Bằng cách chọn "Đăng nhập tài khoản", bạn đồng ý với các{" "}
                                <Link href="#" className="text-purple-500 hover:text-purple-400">
                                    Điều khoản sử dụng
                                </Link>{" "}
                                và{" "}
                                <Link href="#" className="text-purple-500 hover:text-purple-400">
                                    Chính sách riêng tư
                                </Link>{" "}
                                của Skylark.
                            </p>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card >
    )
}

export default Login