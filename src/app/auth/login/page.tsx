import Link from "next/link";
import LoginForm from "./loginForm";
import type { Metadata } from "next";
import { signupRoute } from "@root/lib";

export const metadata: Metadata = {
   title: "Login",
};

export default function Login() {
   return (
      <section>
         <h1 className="text-3xl font-semibold text-primary mb-4">Login</h1>
         <LoginForm />
         <div className="text-center mt-3">
            <Link href={signupRoute} className="text-muted-foreground text-sm">
               Don't have an account ?
            </Link>
         </div>
      </section>
   );
}
