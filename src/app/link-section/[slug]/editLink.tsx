"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { Pencil, Plus } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from "@root/components";
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@root/components";

export interface CreateLinkProps {
   action: "Create";
}

export interface UpdateLinkProps {
   action: "Update";
   title: string;
}

export type EditLinkProps = CreateLinkProps | UpdateLinkProps;

const editLinkSchema = z.object({
   link: z.string().min(1, { message: "Required field" }).url({ message: "Please enter a link" }),
   description: z.string().optional(),
});

export default function EditLink(props: EditLinkProps) {
   const editLinkForm = useForm<z.infer<typeof editLinkSchema>>({
      resolver: zodResolver(editLinkSchema),
      defaultValues: { link: "", description: "" },
   });

   function onLinkCreation(values: z.infer<typeof editLinkSchema>) {
      console.log("Creating link");
   }

   function onLinkUpdation(values: z.infer<typeof editLinkSchema>) {
      console.log("Updating link");
   }

   const creationRoute = props.action === "Create";
   const formAction = creationRoute ? onLinkCreation : onLinkUpdation;

   return (
      <Dialog>
         <DialogTrigger asChild>
            {creationRoute ? (
               <Button type="button" className="fixed bottom-4 right-3 rounded-full w-12 h-12 shadow-md">
                  <Plus className="h-12 w-12" />
               </Button>
            ) : (
               <Button variant="outline" size="icon" className="bg-transparent">
                  <Pencil />
               </Button>
            )}
         </DialogTrigger>
         <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
               <DialogTitle className="text-xl text-primary">{props.action} Link</DialogTitle>
            </DialogHeader>
            {/* form starts here */}
            <Form {...editLinkForm}>
               <form onSubmit={editLinkForm.handleSubmit(formAction)} className="space-y-8">
                  <FormField
                     control={editLinkForm.control}
                     name="link"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Enter link</FormLabel>
                           <FormControl>
                              <Input placeholder="e.g. https://instagram.com/johndoe" {...field} type="text" />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={editLinkForm.control}
                     name="description"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Link Description (optional)</FormLabel>
                           <FormControl>
                              <Input placeholder="e.g. This is the link to my instagram feed" {...field} type="text" />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <Button type="submit" className="w-full">
                     {props.action}
                  </Button>
               </form>
            </Form>
            {/* form ends here */}
         </DialogContent>
      </Dialog>
   );
}
