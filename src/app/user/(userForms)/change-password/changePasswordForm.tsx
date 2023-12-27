"use client";

import { Button, Input, Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@root/components";
import { changePasswordFormSchema, changePasswordFormType } from "@root/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@root/components/ui/use-toast";
import { trpc } from "@root/trpcQuery/clientQuery";
import { useSession } from "next-auth/react";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";

export default function ChangePasswordForm() {
   const { data: session } = useSession();
   const [showPassword, setShowPassword] = useState(false);
   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

   const changePasswordForm = useForm<changePasswordFormType>({
      resolver: zodResolver(changePasswordFormSchema),
      defaultValues: { password: "", confirmPassword: "" },
   });

   const { mutate: changePasswordMutation, isLoading } = trpc.user.changePassword.useMutation({
      onSuccess() {
         toast({ title: "Password updated successfully" });
         changePasswordForm.reset();
      },
      onError(error) {
         toast({ title: error.message, variant: "destructive" });
      },
   });

   function onChangePassword(values: changePasswordFormType) {
      if (isLoading) return;
      if (session && session.user && session.user.id) changePasswordMutation({ id: session.user.id, password: values.password });
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
            <Button type="submit" className="w-full" disabled={isLoading}>
               Change
            </Button>
         </form>
      </Form>
   );
}
