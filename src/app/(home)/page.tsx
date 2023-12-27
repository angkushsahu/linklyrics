import { linkSectionRoute, signupRoute } from "@root/lib";
import BackgroundImage from "./backgroundImage";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Button } from "@root/components";
import Link from "next/link";

export default async function Home() {
   const session = await getServerSession();
   if (session) redirect(linkSectionRoute);

   return (
      <main>
         <BackgroundImage />
         <section className="center-container px-5 py-4 flex flex-col items-center justify-center min-h-[80vh] text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-primary drop-shadow-xl">Link Lyric</h1>
            <p className="sm:text-xl max-w-[48ch] text-secondary-foreground mt-6">
               LinkLyric - Organize, Curate, Showcase. Create personalized link sections, control visibility, and showcase your
               curated content. Elevate your link management experience with LinkLyric.
            </p>
            <h2 className="text-5xl mt-12 mb-8">It's completely free</h2>
            <Link href={signupRoute}>
               <Button type="button">Start your journey now !!!!</Button>
            </Link>
         </section>
      </main>
   );
}
