"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import * as z from "zod";

import { Button, Input, Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@root/components";

const signupFormSchema = z
   .object({
      name: z.string().min(1, { message: "Please enter your name" }),
      email: z.string().min(1, { message: "Please enter your e-mail" }).email({ message: "Please enter a valid e-mail" }),
      password: z.string().min(1, { message: "Please enter password" }),
      confirmPassword: z.string().min(1, { message: "Please re-enter password" }),
   })
   .refine((data) => data.password === data.confirmPassword, { path: ["confirmPassword"], message: "Passwords do not match" });

export default function SignupForm() {
   const [showPassword, setShowPassword] = useState(false);
   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

   const signupForm = useForm<z.infer<typeof signupFormSchema>>({
      resolver: zodResolver(signupFormSchema),
      defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
   });

   function onSignup(values: z.infer<typeof signupFormSchema>) {
      console.log(values);
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
            <Button type="submit" className="w-full">
               Signup
            </Button>
         </form>
      </Form>
   );
}
