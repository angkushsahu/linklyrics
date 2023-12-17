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
} from "@root/components";

export interface ConfirmActionDialogProps {
   titleText: string;
   onConfirm: () => void;
}

export function ConfirmActionDialog({ onConfirm, titleText }: ConfirmActionDialogProps) {
   return (
      <AlertDialog>
         <AlertDialogTrigger asChild>
            <span className="text-primary cursor-pointer font-semibold">{titleText}</span>
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

export function Logout() {
   return <ConfirmActionDialog titleText="Logout" onConfirm={() => console.log("Logout")} />;
}

export function DeleteAccount() {
   return <ConfirmActionDialog titleText="Delete Account" onConfirm={() => console.log("Delete account")} />;
}
