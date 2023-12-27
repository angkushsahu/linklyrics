"use client";

import { useSession } from "next-auth/react";
import { Skeleton } from "@root/components";
import { useEffect, useState } from "react";

function SkeletonComponent() {
   return <Skeleton className="h-6 w-96" />;
}

export default function AccountDetails() {
   const [sessionLoaded, setSessionLoaded] = useState(false);
   const { data: session } = useSession();

   useEffect(() => {
      if (session?.user) setSessionLoaded(true);
   }, [session, session?.user]);

   const profileItems = [
      { key: "Name", value: session?.user.name },
      { key: "E-mail", value: session?.user.email },
      { key: "Joined On", value: session?.user.createdAt },
   ];

   return (
      <section className="space-y-1">
         {profileItems.map(({ key, value }) => (
            <div className="flex items-center gap-x-2" key={key}>
               <span className="text-muted-foreground">{key}:</span> {sessionLoaded ? value : <SkeletonComponent />}
            </div>
         ))}
      </section>
   );
}
