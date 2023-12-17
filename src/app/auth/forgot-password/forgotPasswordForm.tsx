"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button, Input, Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@root/components";

const forgotPasswordFormSchema = z.object({
   email: z.string().min(1, { message: "Please enter your e-mail" }).email({ message: "Please enter a valid e-mail" }),
});

export default function ForgotPasswordForm() {
   const forgotPasswordForm = useForm<z.infer<typeof forgotPasswordFormSchema>>({
      resolver: zodResolver(forgotPasswordFormSchema),
      defaultValues: { email: "" },
   });

   function onForgotPassword(values: z.infer<typeof forgotPasswordFormSchema>) {
      console.log(values);
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
            <Button type="submit" className="w-full">
               Submit
            </Button>
         </form>
      </Form>
   );
}
