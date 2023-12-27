"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren, useState } from "react";
import { trpc } from "@root/trpcQuery/clientQuery";
import { httpBatchLink } from "@trpc/client";

export default function TrpcProvider({ children }: PropsWithChildren) {
   const [queryClient] = useState(() => new QueryClient({}));
   const [trpcClient] = useState(function () {
      return trpc.createClient({
         links: [httpBatchLink({ url: "http://localhost:3000/api/trpc" })],
      });
   });

   return (
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
         <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </trpc.Provider>
   );
}
