import Link from "next/link";
import Logo from "./logo";
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
               <Link href={homeRoute}>Home</Link>
               <Link href={userProfileRoute}>Account</Link>
               <ThemeToggle />
            </nav>
         </section>
      </header>
   );
}
