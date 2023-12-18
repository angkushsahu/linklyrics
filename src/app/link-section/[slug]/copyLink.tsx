"use client";

import { Copy } from "lucide-react";
import { Button } from "@root/components";
import { useToast } from "@root/components/ui/use-toast";

export interface CopyLinkProps {
   link: string;
}

export default function CopyLink({ link }: CopyLinkProps) {
   const { toast } = useToast();

   async function copyLinkUtil() {
      try {
         await window.navigator.clipboard.writeText(link);
         toast({ title: "Link copied to clipboard" });
      } catch (error: unknown) {
         if (error instanceof Error) toast({ title: error.message, variant: "destructive" });
      }
   }

   return (
      <Button size="icon" variant="outline" className="bg-transparent" onClick={copyLinkUtil}>
         <Copy />
      </Button>
   );
}
