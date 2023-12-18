"use client";

import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
   AlertDialogTrigger,
   Button,
} from "@root/components";
import { Trash2 } from "lucide-react";

export interface ConfirmActionDialogProps {
   titleText: string;
   textClass: boolean;
   buttonClass?: string;
   onConfirm: () => void;
}

export function ConfirmActionDialog({ onConfirm, titleText, buttonClass, textClass }: ConfirmActionDialogProps) {
   return (
      <AlertDialog>
         <AlertDialogTrigger asChild>
            <Button variant="outline" size="icon" className={buttonClass}>
               <Trash2 className={textClass ? "text-primary cursor-pointer" : ""} />
            </Button>
         </AlertDialogTrigger>
         <AlertDialogContent>
            <AlertDialogHeader>
               <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
               <AlertDialogDescription>
                  Are you sure you want to {titleText}. This action cannot be undone.
               </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
               <AlertDialogCancel>Cancel</AlertDialogCancel>
               <AlertDialogAction onClick={() => console.log("This is awesome")}>{titleText}</AlertDialogAction>
            </AlertDialogFooter>
         </AlertDialogContent>
      </AlertDialog>
   );
}

export function DeleteSection() {
   return <ConfirmActionDialog titleText="Delete Section" onConfirm={() => console.log("Delete Section")} textClass />;
}

export function DeleteLinkFromSection() {
   return (
      <ConfirmActionDialog
         titleText="Delete This Link"
         buttonClass="bg-transparent"
         textClass={false}
         onConfirm={() => console.log("Delete this link")}
      />
   );
}
