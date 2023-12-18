"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { Pencil, Plus } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from "@root/components";
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@root/components";

export interface CreateSectionProps {
   action: "Create";
}

export interface UpdateSectionProps {
   action: "Update";
   sectionTitle: string;
}

export type EditSectionProps = CreateSectionProps | UpdateSectionProps;

const editSectionSchema = z.object({
   title: z.string().min(1, { message: "Please enter a suitable title for new section" }),
   description: z.string().optional(),
   color: z.string().optional(),
});

export default function EditSection(props: EditSectionProps) {
   const editSectionForm = useForm<z.infer<typeof editSectionSchema>>({
      resolver: zodResolver(editSectionSchema),
      defaultValues: { title: "", description: "", color: "#e11d48" },
   });

   function onSectionCreation(values: z.infer<typeof editSectionSchema>) {
      console.log("Creating section");
   }

   function onSectionUpdation(values: z.infer<typeof editSectionSchema>) {
      console.log("Updating section");
   }

   const creationRoute = props.action === "Create";
   const formAction = creationRoute ? onSectionCreation : onSectionUpdation;

   return (
      <Dialog>
         <DialogTrigger asChild>
            {creationRoute ? (
               <Button
                  type="button"
                  className="fixed bottom-4 right-3 rounded-full w-12 h-12 shadow-md sm:static sm:w-auto sm:h-auto sm:rounded-none"
               >
                  <Plus className="sm:mr-2 h-5 w-5" /> <span className="hidden sm:block">{props.action} Section</span>
               </Button>
            ) : (
               <Button variant="outline" size="icon" className="text-primary hover:text-primary">
                  <Pencil />
               </Button>
            )}
         </DialogTrigger>
         <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
               <DialogTitle className="text-xl text-primary">{props.action} Section</DialogTitle>
            </DialogHeader>
            {/* form starts here */}
            <Form {...editSectionForm}>
               <form onSubmit={editSectionForm.handleSubmit(formAction)} className="space-y-8">
                  <FormField
                     control={editSectionForm.control}
                     name="title"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Section Title</FormLabel>
                           <FormControl>
                              <Input placeholder="e.g. Instagram links" {...field} type="text" />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={editSectionForm.control}
                     name="description"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Section Description (optional)</FormLabel>
                           <FormControl>
                              <Input placeholder="e.g. Here are my instagram links" {...field} type="text" />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={editSectionForm.control}
                     name="color"
                     render={({ field }) => (
                        <FormItem className="flex items-center gap-x-6 flex-wrap">
                           <FormLabel>Section Color (optional)</FormLabel>
                           <FormControl>
                              <Input
                                 placeholder="e.g. Choose a color"
                                 {...field}
                                 type="color"
                                 className="w-11 mt-0 cursor-pointer"
                              />
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
