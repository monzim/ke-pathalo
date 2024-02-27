import { Toaster } from "@/components/ui/sonner";
import { SmileIcon } from "lucide-react";
import type { Metadata } from "next";
import { Shadows_Into_Light_Two } from "next/font/google";
import { cookies } from "next/headers";
import Link from "next/link";
import CreatePortalButton from "./(root)/_components/create-portal-button";
import "./globals.css";

const shadowIntoLight = Shadows_Into_Light_Two({
  weight: ["400"],
  subsets: ["latin"],
});

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
      <body className={shadowIntoLight.className}>
        <div className="flex flex-col min-h-[100dvh]">
          <header className="px-4 lg:px-6 h-14 flex items-center">
            <Link className="flex items-center justify-center" href="/">
              <SmileIcon className="h-6 w-6" />
              <span className="ml-2">Ke Pathalo</span>
            </Link>

            <nav className="ml-auto flex gap-4 sm:gap-6">
              {userExists && <CreatePortalButton />}
            </nav>
          </header>

          {children}

          <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
            <p className="text-xs text-muted-foreground">
              © 2024 monzim.com All rights reserved.
            </p>
            <nav className="sm:ml-auto flex gap-4 sm:gap-6">
              <Link
                className="text-xs hover:underline underline-offset-4"
                href="https://monzim.com"
              >
                Terms of Service
              </Link>
              <Link
                className="text-xs hover:underline underline-offset-4"
                href="https://monzim.com"
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
