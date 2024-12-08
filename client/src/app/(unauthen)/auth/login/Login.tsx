"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { Button } from "@nextui-org/react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

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
  const cleaned = phone.replace(/\D/g, "");

  // Check if the phone number starts with 0 and replace it with +84
  if (cleaned.startsWith("0")) {
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
    );
  }

  return (
    <Card className="w-full max-w-md mx-4 text-white z-10 bg-transparent border-none">
      <CardHeader className="flex flex-col justify-center items-center gap-1">
        <img src="/logoImage.png" width={60} height={60} />
        <CardTitle className="text-2xl text-center">Sign-in</CardTitle>
        <p className="text-zinc-400 text-center text-sm">
          Đăng nhập để tiếp tục trải nghiệm nào
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Nhập số điện thoại"
                        className="bg-transparent border-b-slate-400 border-b-[1px] border-t-0 border-r-0 border-l-0 rounded-none text-white placeholder:text-zinc-400"
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
                        renderRight={
                          <div
                            onClick={() => {
                              setShow({
                                ...show,
                                showPass: !show.showPass,
                              });
                            }}
                            className="opacity-50 cursor-pointer hover:opacity-100"
                          >
                            {show.showPass ? (
                              <AiFillEyeInvisible size={20} />
                            ) : (
                              <AiFillEye size={20} />
                            )}
                          </div>
                        }
                        value={field.value}
                        onChange={field.onChange}
                        id="password"
                        placeholder="Nhập mật khẩu"
                        type={show.showPass ? "text" : "password"}
                        autoCapitalize="none"
                        autoComplete="password"
                        autoCorrect="off"
                        className="bg-transparent border-b-slate-400 border-b-[1px] border-t-0 border-r-0 border-l-0 rounded-none text-white placeholder:text-zinc-400"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-center w-full my-4">
              <Button
                type="submit"
                className="w-[60%] rounded-full h-[50px] text-white text-base font-medium mt-2 transition-colors transition-transform transition-shadow transition-all duration-500 bg-left hover:bg-right hover:shadow-[#A958FE] hover:shadow-lg data-[hover=true]:opacity-100"
                style={{
                  backgroundSize: "200% auto",
                  backgroundImage:
                    "var(--button_primary_background_color, linear-gradient(90deg, #A958FE, #DA5EF0 50%, #A958FE))",
                }}
              >
                Đăng nhập
              </Button>
            </div>

            <div className="text-center">
              <Link
                href="#"
                className="text-purple-500 hover:text-purple-400 text-sm"
              >
                Quên mật khẩu?
              </Link>
            </div>

            <div className="text-center space-y-2 text-sm">
              <p className="text-zinc-400">
                Bằng cách chọn "Đăng nhập tài khoản", bạn đồng ý với các{" "}
                <Link
                  href="#"
                  className="text-purple-500 hover:text-purple-400"
                >
                  Điều khoản sử dụng
                </Link>{" "}
                và{" "}
                <Link
                  href="#"
                  className="text-purple-500 hover:text-purple-400"
                >
                  Chính sách riêng tư
                </Link>{" "}
                của Skylark.
              </p>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default Login;
