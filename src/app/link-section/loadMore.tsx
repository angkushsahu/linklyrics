"use client";

export default function LoadMore() {
   function loadMoreItems() {
      console.log("Loading more items ....");
   }

   return (
      <section className="mt-4 text-center">
         <span className="text-muted-foreground cursor-pointer" onClick={loadMoreItems}>
            Load More ....
         </span>
      </section>
   );
}
