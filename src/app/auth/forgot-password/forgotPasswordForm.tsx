"use client";

import { Button, Input, Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@root/components";
import { ForgotPasswordType, forgotPasswordFormSchema } from "@root/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@root/components/ui/use-toast";
import { trpc } from "@root/trpcQuery/clientQuery";
import { useForm } from "react-hook-form";

export default function ForgotPasswordForm() {
   const forgotPasswordForm = useForm<ForgotPasswordType>({
      resolver: zodResolver(forgotPasswordFormSchema),
      defaultValues: { email: "" },
   });

   const { mutate: forgotPasswordMutation, isLoading } = trpc.auth.forgotPassword.useMutation({
      onSuccess(data) {
         toast({ title: data.message });
      },
      onError(error) {
         toast({ title: error.message, variant: "destructive" });
      },
   });

   function onForgotPassword(values: ForgotPasswordType) {
      if (isLoading) return;
      forgotPasswordMutation({ email: values.email, originUrl: window.location.origin });
   }

   return (
      <Form {...forgotPasswordForm}>
         <form onSubmit={forgotPasswordForm.handleSubmit(onForgotPassword)} className="space-y-8">
            <FormField
               control={forgotPasswordForm.control}
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
            <Button type="submit" className="w-full" disabled={isLoading}>
               Submit
            </Button>
         </form>
      </Form>
   );
}
