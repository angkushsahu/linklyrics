"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import * as z from "zod";

import { Button, Input, Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@root/components";

const changePasswordFormSchema = z
   .object({
      password: z.string().min(1, { message: "Please enter password" }),
      confirmPassword: z.string().min(1, { message: "Please re-enter password" }),
   })
   .refine((data) => data.password === data.confirmPassword, { path: ["confirmPassword"], message: "Passwords do not match" });

export default function ChangePasswordForm() {
   const [showPassword, setShowPassword] = useState(false);
   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

   const changePasswordForm = useForm<z.infer<typeof changePasswordFormSchema>>({
      resolver: zodResolver(changePasswordFormSchema),
      defaultValues: { password: "", confirmPassword: "" },
   });

   function onChangePassword(values: z.infer<typeof changePasswordFormSchema>) {
      console.log(values);
   }

   return (
      <Form {...changePasswordForm}>
         <form onSubmit={changePasswordForm.handleSubmit(onChangePassword)} className="space-y-8">
            <FormField
               control={changePasswordForm.control}
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
               control={changePasswordForm.control}
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
               Change
            </Button>
         </form>
      </Form>
   );
}
