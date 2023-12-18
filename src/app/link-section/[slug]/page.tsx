import Link from "next/link";
import CopyLink from "./copyLink";
import EditLink from "./editLink";
import EditSection from "../editSection";
import LinkSearchbar from "./linkSearchBar";
import { Separator } from "@root/components";
import { DeleteLinkFromSection, DeleteSection } from "./confirmAction";

export interface LinksProps {
   params: {
      slug: string;
   };
}

export default function Links({ params: { slug } }: LinksProps) {
   const sectionTitle = "Some random title",
      description =
         "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores, possimus dolorem obcaecati in illo sint nulla unde sapiente. Tempore maiores voluptas tenetur doloribus eaque optio sed magnam officiis rem sit!",
      link = "https://angkushsahu.vercel.app";

   const arr: Array<number> = [];
   for (let i = 0; i < 5; i++) arr.push(i);

   return (
      <main className="center-container pt-8 pb-12 px-4">
         <section className="flex flex-wrap items-center gap-x-6">
            <h1 className="text-primary text-3xl font-semibold mb-2">{sectionTitle + " "}</h1>
            <div>
               <EditSection action="Update" sectionTitle={sectionTitle} />
               <DeleteSection />
            </div>
            <p className="text-muted-foreground mt-4">{description}</p>
         </section>
         <LinkSearchbar sectionTitle={sectionTitle} />
         <section className="space-y-6">
            {arr.map((val) => (
               <article key={val} className="bg-neutral-100 dark:bg-card shadow-sm px-4 py-6 sm:p-6 rounded">
                  <div className="flex flex-wrap items-center justify-between gap-x-16 gap-y-2">
                     <Link href={link} rel="noopener noreferrer" target="_blank" className="text-lg break-all">
                        https://angkushsahu.vercel.app
                     </Link>
                     <div className="text-muted-foreground">
                        <CopyLink link={link} />
                        <EditLink action="Update" title="Hello world" />
                        <DeleteLinkFromSection />
                     </div>
                  </div>
                  <Separator className="my-3 h-1" />
                  <p className="text-muted-foreground">{description}</p>
               </article>
            ))}
         </section>
         <EditLink action="Create" />
      </main>
   );
}
