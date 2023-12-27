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
import { toast } from "@root/components/ui/use-toast";
import { signOut, useSession } from "next-auth/react";
import { trpc } from "@root/trpcQuery/clientQuery";
import { homeRoute } from "@root/lib";

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
               <AlertDialogAction onClick={onConfirm}>{titleText}</AlertDialogAction>
            </AlertDialogFooter>
         </AlertDialogContent>
      </AlertDialog>
   );
}

export function Logout() {
   return <ConfirmActionDialog titleText="Logout" onConfirm={() => signOut({ callbackUrl: homeRoute })} />;
}

export function DeleteAccount() {
   const { data: session } = useSession();

   const { mutate: deleteUserMutation } = trpc.user.deleteUser.useMutation({
      onSuccess() {
         signOut({ callbackUrl: homeRoute });
      },
      onError(error) {
         toast({ title: error.message, variant: "destructive" });
      },
   });

   function onAccountDeletion() {
      if (session && session.user && session.user.id) deleteUserMutation({ id: session.user.id });
   }

   return <ConfirmActionDialog titleText="Delete Account" onConfirm={onAccountDeletion} />;
}
