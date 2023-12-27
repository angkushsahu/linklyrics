"use client";

import {
   Button,
   Input,
   Form,
   FormControl,
   FormDescription,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
   Skeleton,
} from "@root/components";
import { UserUpdateFormType, userUpdateFormSchema } from "@root/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@root/components/ui/use-toast";
import { trpc } from "@root/trpcQuery/clientQuery";
import { useSession } from "next-auth/react";
import { userProfileRoute } from "@root/lib";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

function SkeletonComponent() {
   return <Skeleton className="h-10 w-full" />;
}

export default function UserUpdate() {
   const [sessionLoaded, setSessionLoaded] = useState(false);
   const { data: session, update: updateSession } = useSession();
   const router = useRouter();

   const userUpdateForm = useForm<UserUpdateFormType>({
      resolver: zodResolver(userUpdateFormSchema),
      defaultValues: { name: "", email: "" },
   });

   useEffect(() => {
      userUpdateForm.reset({ email: session?.user.email, name: session?.user.name });
      if (session?.user) setSessionLoaded(true);
   }, [session, session?.user]);

   const { mutate: updateUser, isLoading } = trpc.user.updateUser.useMutation({
      async onSuccess(data) {
         if (session && session.user) {
            await updateSession({ ...session, user: { ...session.user, name: data.user.name, email: data.user.email } });
            toast({ title: "Updated user successfully" });
            router.push(userProfileRoute);
         }
      },
      onError(error) {
         toast({ title: error.message, variant: "destructive" });
      },
   });

   function onUserUpdate(values: UserUpdateFormType) {
      if (isLoading) return;
      if (session && session.user && session.user.id) updateUser({ id: session.user.id as string, ...values });
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
                        {sessionLoaded ? <Input placeholder="e.g. John Doe" {...field} type="text" /> : <SkeletonComponent />}
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
                        {sessionLoaded ? (
                           <Input placeholder="e.g. johndoe@gmail.com" {...field} type="email" />
                        ) : (
                           <SkeletonComponent />
                        )}
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            {sessionLoaded ? (
               <Button type="submit" className="w-full" disabled={isLoading}>
                  Update
               </Button>
            ) : (
               <Skeleton className="h-10 w-full bg-primary" />
            )}
         </form>
      </Form>
   );
}
