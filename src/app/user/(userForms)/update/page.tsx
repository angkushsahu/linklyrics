import UserUpdateForm from "./userUpdateForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
   title: "User Update",
};

export default function UserUpdate() {
   return (
      <section>
         <h1 className="text-3xl font-semibold text-primary mb-4">Update Account</h1>
         <UserUpdateForm />
      </section>
   );
}
