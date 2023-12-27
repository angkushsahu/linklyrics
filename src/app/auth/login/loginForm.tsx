"use client";

import { Button, Input, Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@root/components";
import { LoginFormType, loginFormSchema } from "@root/validations";
import { forgotPasswordRoute, homeRoute } from "@root/lib";
import { toast } from "@root/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "@root/trpcQuery/clientQuery";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";

export default function LoginForm() {
   const [showPassword, setShowPassword] = useState(false);

   const loginForm = useForm<LoginFormType>({
      resolver: zodResolver(loginFormSchema),
      defaultValues: { email: "", password: "" },
   });

   const { mutate: loginMutation, isLoading } = trpc.auth.login.useMutation({
      async onSuccess(data) {
         try {
            const response = await signIn("credentials", { email: data.user.email, callbackUrl: homeRoute });
            if (response && response.ok) {
               toast({ title: "User logged in successfully" });
               loginForm.reset();
            } else if (response && response.error) toast({ title: `${response?.error}`, variant: "destructive" });
         } catch (error: unknown) {
            if (error instanceof Error) toast({ title: error.message, variant: "destructive" });
         }
      },
      onError(error) {
         toast({ title: error.message, variant: "destructive" });
      },
   });

   function onLogin(values: LoginFormType) {
      if (isLoading) return;
      loginMutation(values);
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
            <Button type="submit" className="w-full" disabled={isLoading}>
               Login
            </Button>
         </form>
      </Form>
   );
}
