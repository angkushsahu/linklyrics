import BackgroundImage from "./(home)/backgroundImage";
import { Button } from "@root/components";
import { homeRoute } from "@root/lib";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
   title: "Not found",
};

export default function NotFound() {
   return (
      <main>
         <BackgroundImage />
         <section className="min-h-[80vh] px-6 py-4 flex flex-col items-center justify-center">
            <h1 className="text-9xl font-bold text-primary tracking-widest">404</h1>
            <p className="text-lg text-center mt-1 mb-6 text-secondary-foreground">Looks like you are lost, let's settle this</p>
            <Link href={homeRoute} replace>
               <Button type="button">Let's get you to home</Button>
            </Link>
         </section>
      </main>
   );
}
