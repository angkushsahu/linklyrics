import ForgotPasswordForm from "./forgotPasswordForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
   title: "Forgot Password",
};

export default function ForgotPassword() {
   return (
      <section>
         <h1 className="text-3xl font-semibold text-primary mb-4">Forgot Password</h1>
         <ForgotPasswordForm />
      </section>
   );
}
