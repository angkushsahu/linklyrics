"use client";

import Link from "next/link";
import Image from "next/image";
import { homeRoute } from "@root/lib";
import { useTheme } from "next-themes";

import darkLogo from "@root/assets/darkLogo.svg";
import lightLogo from "@root/assets/lightLogo.svg";

export default function Logo() {
   const { resolvedTheme } = useTheme();

   return (
      <Link href={homeRoute}>
         <Image
            src={resolvedTheme === "light" ? lightLogo : darkLogo}
            alt="Link Lyric Logo"
            priority
            className="w-10 h-10 sm:w-12 sm:h-12"
         />
      </Link>
   );
}
