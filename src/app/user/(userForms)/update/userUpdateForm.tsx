"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button, Input, Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@root/components";

const userUpdateFormSchema = z.object({
   name: z.string().min(1, { message: "Please enter your name" }),
   email: z.string().min(1, { message: "Please enter your e-mail" }).email({ message: "Please enter a valid e-mail" }),
});

export default function UserUpdate() {
   const userUpdateForm = useForm<z.infer<typeof userUpdateFormSchema>>({
      resolver: zodResolver(userUpdateFormSchema),
      defaultValues: { name: "", email: "" },
   });

   function onUserUpdate(values: z.infer<typeof userUpdateFormSchema>) {
      console.log(values);
   }

   return (
      <Form {...userUpdateForm}>
         <form onSubmit={userUpdateForm.handleSubmit(onUserUpdate)} className="space-y-8">
            <FormField
               control={userUpdateForm.control}
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
               control={userUpdateForm.control}
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
            <Button type="submit" className="w-full">
               Update
            </Button>
         </form>
      </Form>
   );
}
