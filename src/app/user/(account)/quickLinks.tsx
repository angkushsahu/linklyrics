import { changePasswordRoute, updateProfileRoute } from "@root/lib";
import { Logout, DeleteAccount } from "./confirmActionDialog";
import Link from "next/link";

export default function QuickLinks() {
   return (
      <section className="grid sm:grid-cols-2">
         <div className="flex items-center justify-center p-3 border-2 border-muted-foreground rounded-t-xl sm:rounded-tr-none">
            <Link href={updateProfileRoute}>Update Profile</Link>
         </div>
         <div className="flex items-center justify-center p-3 border-2 border-muted-foreground border-t-0 sm:rounded-tr-xl sm:border-t-2 sm:border-l-0">
            <Link href={changePasswordRoute}>Change Password</Link>
         </div>
         <div className="flex items-center justify-center p-3 border-2 border-muted-foreground border-t-0 sm:rounded-bl-xl">
            <Logout />
         </div>
         <div className="flex items-center justify-center p-3 border-2 border-muted-foreground border-t-0 rounded-b-xl sm:border-l-0 sm:rounded-bl-none">
            <DeleteAccount />
         </div>
      </section>
   );
}
