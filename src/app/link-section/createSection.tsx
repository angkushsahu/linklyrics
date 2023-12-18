"use client";

import * as z from "zod";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from "@root/components";
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@root/components";

const createSectionSchema = z.object({
   title: z.string().min(1, { message: "Please enter a suitable title for new section" }),
   description: z.string().optional(),
   color: z.string().optional(),
});

export default function CreateSection() {
   const createSectionForm = useForm<z.infer<typeof createSectionSchema>>({
      resolver: zodResolver(createSectionSchema),
      defaultValues: { title: "", description: "", color: "#e11d48" },
   });

   function onSectionCreation(values: z.infer<typeof createSectionSchema>) {
      console.log(values);
   }

   return (
      <Dialog>
         <DialogTrigger asChild>
            <Button
               type="button"
               className="fixed bottom-4 right-3 rounded-full w-12 h-12 shadow-md sm:static sm:w-auto sm:h-auto sm:rounded-none"
            >
               <Plus className="sm:mr-2 h-5 w-5" /> <span className="hidden sm:block">Add Section</span>
            </Button>
         </DialogTrigger>
         <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
               <DialogTitle className="text-xl text-primary">Create Section</DialogTitle>
            </DialogHeader>
            {/* form starts here */}
            <Form {...createSectionForm}>
               <form onSubmit={createSectionForm.handleSubmit(onSectionCreation)} className="space-y-8">
                  <FormField
                     control={createSectionForm.control}
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
                     control={createSectionForm.control}
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
                     control={createSectionForm.control}
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
                     Create
                  </Button>
               </form>
            </Form>
            {/* form ends here */}
         </DialogContent>
      </Dialog>
   );
}
