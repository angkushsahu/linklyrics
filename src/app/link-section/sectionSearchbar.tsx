import { Input } from "@root/components";

export default function SectionSearchbar() {
   return (
      <section className="mb-8 mt-4">
         <form>
            <Input type="text" placeholder="Search link sections ...." />
         </form>
      </section>
   );
}
