import { Toaster } from "@/components/ui/sonner";
import { SmileIcon } from "lucide-react";
import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import { cookies } from "next/headers";
import Link from "next/link";
import CreatePortalButton from "./(root)/_components/create-portal-button";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import Script from "next/script";

const quickSand = Quicksand({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const seo_keywords = [
  "monzim",
  "ke-pathalo",
  "কে পাঠালো ",
  "bangla",
  "ngl",
  "anonymous",
  "messaging",
  "Anonymous messaging platform",
  "Send anonymous messages",
  "Secret message exchange",
  "Private message service",
  "Anonymous communication",
  "Untraceable messaging",
  "Stealthy message sender",
  "Hidden identity messaging",
  "IP-based location tracking",
  "Confidential message delivery",
  "Secure anonymous chat",
  "Covert message exchange",
  "Incognito messaging",
  "Masked sender communication",
  "Private chat with friends",
  "Anonymous chatroom",
  "Concealed identity messaging",
  "IP tracking for approximate location",
  "Anonymous message service",
  "Secretive message delivery",
  "azraf",
  "send-anonymous-messages",
  "send-secret-messages",
  "friendship",
  "love",
  "send messages to friends",
  "get messages",
  "sender location",
  "github",
  "monzim project",
];

export const metadata: Metadata = {
  metadataBase: new URL("https://kepathalo.monzim.com"),
  alternates: {
    canonical: "/",
    languages: { "en-US": "/en-US" },
  },
  title: "কে পাঠালো | Ke Pathalo",
  description:
    "The app for sending anonymous messages. Get senders partial address without revealing your identity",
  openGraph: {
    images:
      "https://cdn-monzim-com.azureedge.net/public-com/og/other-sites/Ke-Pathalo-OG.jpg",
  },
  keywords: seo_keywords,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const rawuser = cookieStore.get("user")?.value;
  const user = rawuser ? JSON.parse(rawuser) : null;
  const userExists = !!user;

  return (
    <html lang="en" className="dark">
      <Script
        defer
        src="https://analytics.us.umami.is/script.js"
        data-website-id="8b7d3dfa-a7b2-4986-8fd2-8aecdbbb3327"
      />

      <body className={quickSand.className}>
        <div className="flex flex-col min-h-[100dvh]">
          <header className="px-4 lg:px-6 h-14 flex items-center z-10">
            <Link className="flex items-center justify-center" href="/">
              <SmileIcon className="h-6 w-6" />
              <span className="ml-2">Ke Pathalo</span>
            </Link>

            <nav className="ml-auto flex gap-4 sm:gap-6">
              {userExists && <CreatePortalButton />}
            </nav>
          </header>

          {children}
          <Analytics />

          <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
            <p className="text-xs text-muted-foreground">
              © 2024 monzim.com All rights reserved.
            </p>
            <nav className="sm:ml-auto flex gap-4 sm:gap-6">
              <Link
                className="text-xs hover:underline underline-offset-4"
                href="https://monzim.com/terms-and-conditions"
              >
                Terms of Service
              </Link>
              <Link
                className="text-xs hover:underline underline-offset-4"
                href="https://monzim.com/privacy-policy"
              >
                Privacy
              </Link>
            </nav>
          </footer>
        </div>
      </body>
      <Toaster />
    </html>
  );
}
