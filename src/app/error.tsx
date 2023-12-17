"use client";

import { Button } from "@root/components";
import BackgroundImage from "./(home)/backgroundImage";

export interface ErrorProps {
   error: Error;
   reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
   return (
      <main>
         <BackgroundImage />
         <section className="min-h-[80vh] px-6 py-4 flex flex-col items-center justify-center">
            <p className="text-xl text-secondary-foreground mb-4">
               {error.name} - {error.message}
            </p>
            <Button type="button" onClick={reset}>
               Try Again
            </Button>
         </section>
      </main>
   );
}
