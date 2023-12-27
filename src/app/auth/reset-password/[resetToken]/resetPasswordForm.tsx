"use client";

import { Button, Input, Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@root/components";
import { ResetPasswordType, resetPasswordFormSchema } from "@root/validations";
import { useParams, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@root/components/ui/use-toast";
import { trpc } from "@root/trpcQuery/clientQuery";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { loginRoute } from "@root/lib";
import { useState } from "react";

export default function ResetPasswordForm() {
   const router = useRouter();
   const params: { resetToken: string } = useParams();
   const [showPassword, setShowPassword] = useState(false);
   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

   const resetPasswordForm = useForm<ResetPasswordType>({
      resolver: zodResolver(resetPasswordFormSchema),
      defaultValues: { password: "", confirmPassword: "" },
   });

   const { mutate: resetPasswordMutation, isLoading } = trpc.auth.resetPassword.useMutation({
      onSuccess(data) {
         toast({ title: data.message });
         resetPasswordForm.reset();
         router.replace(loginRoute);
      },
      onError(error) {
         toast({ title: error.message, variant: "destructive" });
      },
   });

   function onResetPassword(values: ResetPasswordType) {
      if (isLoading) return;
      resetPasswordMutation({ password: values.password, resetUrl: params.resetToken });
   }

   return (
      <Form {...resetPasswordForm}>
         <form onSubmit={resetPasswordForm.handleSubmit(onResetPassword)} className="space-y-8">
            <FormField
               control={resetPasswordForm.control}
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
               control={resetPasswordForm.control}
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
               Reset
            </Button>
         </form>
      </Form>
   );
}
