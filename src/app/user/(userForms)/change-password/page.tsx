import ChangePasswordForm from "./changePasswordForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
   title: "Change Password",
};

export default function ChangePassword() {
   return (
      <section>
         <h1 className="text-3xl font-semibold text-primary mb-4">Change Password</h1>
         <ChangePasswordForm />
      </section>
   );
}
