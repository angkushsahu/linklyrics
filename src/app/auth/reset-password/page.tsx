import ResetPasswordForm from "./resetPasswordForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
   title: "Reset Password",
};

export default function ResetPassword() {
   return (
      <section>
         <h1 className="text-3xl font-semibold text-primary mb-4">Reset Password</h1>
         <ResetPasswordForm />
      </section>
   );
}
