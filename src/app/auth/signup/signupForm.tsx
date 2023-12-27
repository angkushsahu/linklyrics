"use client";

import { Button, Input, Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@root/components";
import { SignupFormType, signupFormSchema } from "@root/validations";
import { toast } from "@root/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "@root/trpcQuery/clientQuery";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { homeRoute } from "@root/lib";
import { useState } from "react";

export default function SignupForm() {
   const [showPassword, setShowPassword] = useState(false);
   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

   const signupForm = useForm<SignupFormType>({
      resolver: zodResolver(signupFormSchema),
      defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
   });

   const { mutate: signupMutation, isLoading } = trpc.auth.register.useMutation({
      async onSuccess(data) {
         try {
            const response = await signIn("credentials", { email: data.user.email, callbackUrl: homeRoute });
            if (response && response.ok) {
               toast({ title: "Registered user successfully" });
               signupForm.reset();
            } else if (response && response.error) toast({ title: `${response.error}`, variant: "destructive" });
         } catch (error: unknown) {
            if (error instanceof Error) toast({ title: error.message, variant: "destructive" });
         }
      },
      onError(error) {
         toast({ title: error.message, variant: "destructive" });
      },
   });

   function onSignup(values: SignupFormType) {
      if (isLoading) return;
      signupMutation(values);
   }

   return (
      <Form {...signupForm}>
         <form onSubmit={signupForm.handleSubmit(onSignup)} className="space-y-8">
            <FormField
               control={signupForm.control}
               name="name"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>User Name</FormLabel>
                     <FormControl>
                        <Input placeholder="e.g. John Doe" {...field} type="text" />
                     </FormControl>
                     <FormDescription>This is your public display name.</FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={signupForm.control}
               name="email"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>User E-mail</FormLabel>
                     <FormControl>
                        <Input placeholder="e.g. johndoe@gmail.com" {...field} type="email" />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={signupForm.control}
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
                  </FormItem>
               )}
            />
            <FormField
               control={signupForm.control}
               name="confirmPassword"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Confirm Password</FormLabel>
                     <div className="relative isolate">
                        <FormControl>
                           <Input
                              placeholder="Re-enter your password"
                              {...field}
                              type={showConfirmPassword ? "text" : "password"}
                           />
                        </FormControl>
                        <span
                           className="absolute top-1/2 right-3 left-auto -translate-y-1/2 cursor-pointer"
                           onClick={() => setShowConfirmPassword((prev) => !prev)}
                        >
                           {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </span>
                     </div>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
               Signup
            </Button>
         </form>
      </Form>
   );
}
