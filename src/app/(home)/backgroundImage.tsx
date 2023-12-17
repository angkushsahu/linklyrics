"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import darkBackground from "@root/assets/home-background-dark.svg";
import lightBackground from "@root/assets/home-background-light.svg";

export default function BackgroundImage() {
   const { resolvedTheme } = useTheme();

   return (
      <Image
         src={resolvedTheme === "light" ? lightBackground : darkBackground}
         alt="Background"
         priority
         className="fixed bottom-0 w-full -z-10"
      />
   );
}
