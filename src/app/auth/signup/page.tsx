import Link from "next/link";
import type { Metadata } from "next";
import SignupForm from "./signupForm";
import { loginRoute } from "@root/lib";

export const metadata: Metadata = {
   title: "Signup",
};

export default function Signup() {
   return (
      <section>
         <h1 className="text-3xl font-semibold text-primary mb-4">Signup</h1>
         <SignupForm />
         <div className="text-center mt-3">
            <Link href={loginRoute} className="text-muted-foreground text-sm">
               Login instead ?
            </Link>
         </div>
      </section>
   );
}
