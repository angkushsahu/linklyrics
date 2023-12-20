"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Link from "next/link";
import * as z from "zod";

import { Button, Input, Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@root/components";
import { forgotPasswordRoute } from "@root/lib";

const loginFormSchema = z.object({
   email: z.string().min(1, { message: "Please enter your e-mail" }).email({ message: "Please enter a valid e-mail" }),
   password: z.string().min(1, { message: "Please enter password" }),
});

export default function LoginForm() {
   const [showPassword, setShowPassword] = useState(false);

   const loginForm = useForm<z.infer<typeof loginFormSchema>>({
      resolver: zodResolver(loginFormSchema),
      defaultValues: { email: "", password: "" },
   });

   function onLogin(values: z.infer<typeof loginFormSchema>) {
      console.log(values);
   }

   return (
      <Form {...loginForm}>
         <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-8">
            <FormField
               control={loginForm.control}
               name="email"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Enter your E-mail</FormLabel>
                     <FormControl>
                        <Input placeholder="e.g. johndoe@gmail.com" {...field} type="email" />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={loginForm.control}
               name="password"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Password</FormLabel>
                     <div className="relative isolate">
                        <FormControl>
                           <Input placeholder="Enter a strong password" {...field} type={showPassword ? "text" : "password"} />
                        </FormControl>
                        <span
                           className="absolute top-1/2 right-3 left-auto -translate-y-1/2 cursor-pointer"
                           onClick={() => setShowPassword((prev) => !prev)}
                        >
                           {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </span>
                     </div>
                     <FormMessage />
                     <div className="text-right">
                        <Link href={forgotPasswordRoute} className="text-muted-foreground text-xs">
                           Forgot Password ?
                        </Link>
                     </div>
                  </FormItem>
               )}
            />
            <Button type="submit" className="w-full">
               Login
            </Button>
         </form>
      </Form>
   );
}
