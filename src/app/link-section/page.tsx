import Link from "next/link";
import LoadMore from "./loadMore";
import CreateSection from "./createSection";
import SectionSearchbar from "./sectionSearchbar";

export default function LinkSection() {
   const arr: Array<number> = [];
   for (let i = 0; i < 5; i++) arr.push(i);

   return (
      <main className="center-container pt-8 pb-12 px-4">
         <section className="flex items-center justify-between">
            <h1 className="text-primary text-3xl font-semibold">Link Section</h1>
            <CreateSection />
         </section>
         <SectionSearchbar />
         <section className="space-y-6">
            {arr.map((val) => (
               <Link href={"/"} key={val} className="bg-neutral-100 dark:bg-card shadow-sm px-4 py-6 sm:p-6 rounded block">
                  <article>
                     <p className="mb-2 text-xl font-semibold">This is a section title</p>
                     <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit pariatur facilis eligendi nobis natus.
                        Dignissimos et numquam similique modi deleniti cumque atque accusamus aut dolorem earum corporis,
                        voluptatem temporibus nesciunt.
                     </p>
                  </article>
               </Link>
            ))}
         </section>
         <LoadMore />
      </main>
   );
}
