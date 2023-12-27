import Link from "next/link";
import { Menu } from "lucide-react";
import { homeRoute, userProfileRoute } from "@root/lib";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@root/components";

export default function DropDown() {
   return (
      <DropdownMenu>
         <DropdownMenuTrigger>
            <Menu className="block sm:hidden" />
         </DropdownMenuTrigger>
         <DropdownMenuContent>
            <DropdownMenuItem>
               <Link href={homeRoute} className="flex-1">
                  Home
               </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
               <Link href={userProfileRoute} className="flex-1">
                  Account
               </Link>
            </DropdownMenuItem>
         </DropdownMenuContent>
      </DropdownMenu>
   );
}
