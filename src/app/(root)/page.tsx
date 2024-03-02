import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LockIcon, MapPinned, MessageSquareIcon } from "lucide-react";
import { Mina } from "next/font/google";
import { cookies } from "next/headers";
import Link from "next/link";
import PortalCreateInput from "./_components/portal-create-input";
import HowToPopup from "@/components/popup/how-to";

const mina = Mina({
  weight: ["700"],
  subsets: ["bengali"],
  variable: "--mina",
});

export default function Home() {
  const cookieStore = cookies();
  const rawuser = cookieStore.get("user")?.value;
  const user = rawuser ? JSON.parse(rawuser) : null;
  const userExists = !!user;

  return (
    <>
      <div className="absolute top-0 -z-10 h-full w-full">
        <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(173,109,244,0.5)] opacity-50 blur-[80px]"></div>
      </div>

      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container flex flex-col items-center justify-center space-y-4 px-4 md:px-6">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Welcome to{" "}
                <span
                  className={cn(
                    "text-primary-foreground font-extrabold bg-primary px-2",
                    mina.className
                  )}
                >
                  কে পাঠালো
                </span>
              </h1>
              <p className="max-w-[600px] pt-4 text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed  ">
                The app for sending anonymous messages. Express yourself without
                revealing your identity.
              </p>
            </div>

            <div className="mx-auto w-full max-w-sm space-y-2">
              {userExists ? (
                <div className="flex flex-col gap-2 mt-4">
                  <Link
                    href={"/console"}
                    className={cn(
                      buttonVariants(),
                      "mt-4 mx-auto w-full max-w-[300px]"
                    )}
                  >
                    View your portals
                  </Link>
                </div>
              ) : (
                <PortalCreateInput />
              )}
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid items-center gap-6 px-4 md:px-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Features
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed ">
                The app is packed with features to make your messaging
                experience secure and fun.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center gap-2">
                <LockIcon className="h-10 w-10" />
                <h3 className="text-xl font-bold">Secure</h3>
                <p className="text-sm text-muted-foreground">
                  Messages are not encrypted and your identity is protected.
                </p>
              </div>

              <div className="flex flex-col items-center gap-2">
                <MessageSquareIcon className="h-10 w-10" />
                <h3 className="text-xl font-bold">Anonymous</h3>
                <p className="text-sm text-muted-foreground">
                  Send messages without revealing your identity.
                </p>
              </div>

              <div className="flex flex-col items-center gap-2">
                <MapPinned className="h-10 w-10" />
                <h3 className="text-xl font-bold">Location</h3>
                <p className="text-sm text-muted-foreground">
                  Get partial location of the sender
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <HowToPopup />
    </>
  );
}
