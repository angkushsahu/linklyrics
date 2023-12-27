import type { Metadata, Viewport } from "next";
import type { PropsWithChildren } from "react";
import { Inter } from "next/font/google";
import "@root/styles/globals.css";
// wrapper imports
import { NextauthProvider, ThemeProvider, TrpcProvider } from "@root/providers";
import { Toaster } from "@root/components/ui/toaster";
import { getServerSession } from "next-auth";
import { Header } from "@root/components";

const inter = Inter({ subsets: ["latin"] });

const metaVars = {
   title: "Link Lyric",
   description:
      "LinkLyric - A versatile platform to effortlessly organize and curate your links in custom sections. Register and create personalized sections to categorize your links with ease. With LinkLyric, you have the power to control the visibility of each section. Keep it private for your eyes only or make it public, allowing others to explore and discover your curated collection. Showcase your essential profile links, such as Instagram, Facebook, and more, with the added flexibility of choosing who gets to see your curated content. Elevate your link management experience with LinkLyric, where organization meets customization.",
   urlToWebsite: "https://angkushsahu.vercel.app", // needs to be changes after deployment
};

export const viewport: Viewport = {
   width: "device-width",
   initialScale: 1.0,
   maximumScale: 1.0,
   themeColor: "#000000",
   colorScheme: "dark",
};

export const metadata: Metadata = {
   title: {
      default: metaVars.title,
      template: `%s - ${metaVars.title}`,
   },
   description: metaVars.description,
   robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
   },
   keywords:
      "LinkLyric, link organizer, section-based links, link storage, account registration, login, web links, URL manager, curated links",
   manifest: "/site.webmanifest",
   // extra SEO optimisations
   creator: "Angkush Sahu",
   publisher: "Angkush Sahu",
   applicationName: metaVars.title,
   generator: "Next.js and Cyclic",
   referrer: "origin-when-cross-origin",
   metadataBase: new URL(metaVars.urlToWebsite),
   authors: [{ name: "Angkush Sahu", url: "https://angkushsahu.vercel.app" }],
   openGraph: {
      title: metaVars.title,
      description: metaVars.description,
      images: [
         {
            url: "/og_image.png",
            width: 192,
            height: 192,
         },
      ],
   },
};

export default async function RootLayout({ children }: PropsWithChildren) {
   const session = await getServerSession();

   return (
      <html lang="en">
         <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
         <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
         <body className={`${inter.className} antialiased`}>
            <ThemeProvider>
               <TrpcProvider>
                  <NextauthProvider session={session}>
                     <Header />
                     <>{children}</>
                     <Toaster />
                  </NextauthProvider>
               </TrpcProvider>
            </ThemeProvider>
         </body>
      </html>
   );
}
