import type { Metadata } from "next";
import QuickLinks from "./quickLinks";
import { Separator } from "@root/components";
import AccountDetails from "./accountDetails";

export const metadata: Metadata = {
   title: "User",
};

export default function UserAccount() {
   return (
      <main className="min-h-[80vh] p-6 flex flex-col items-center justify-center">
         <section className="max-w-xl w-full mx-auto mb-6">
            <h1 className="text-primary text-3xl font-semibold mb-4">Account Details</h1>
            <AccountDetails />
         </section>
         <Separator className="max-w-xl w-full" />
         <section className="max-w-xl w-full mx-auto mt-6">
            <h2 className="text-primary text-2xl font-semibold mb-4">Quick Links</h2>
            <QuickLinks />
         </section>
      </main>
   );
}
