import Logo from "./logo";
import Link from "next/link";
import DropDown from "./dropDown";
import ThemeToggle from "./themeToggle";
import { homeRoute, userProfileRoute } from "@root/lib";

export default function Header() {
   return (
      <header className="py-4 px-4 shadow-lg shadow-gray-100 dark:shadow-neutral-900">
         <section className="center-container flex items-center justify-between">
            <div>
               <Logo />
            </div>
            <nav className="flex items-center gap-x-6">
               <Link href={homeRoute} className="hidden sm:inline">
                  Home
               </Link>
               <Link href={userProfileRoute} className="hidden sm:inline">
                  Account
               </Link>
               <DropDown />
               <ThemeToggle />
            </nav>
         </section>
      </header>
   );
}
