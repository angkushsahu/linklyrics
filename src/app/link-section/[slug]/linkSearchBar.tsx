import { Input } from "@root/components";

export interface LinkSearchbar {
   sectionTitle: string;
}

export default function LinkSearchbar({ sectionTitle }: LinkSearchbar) {
   return (
      <section className="mb-8 mt-4">
         <form>
            <Input type="text" placeholder={`Search links from ${sectionTitle} ....`} />
         </form>
      </section>
   );
}
