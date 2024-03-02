"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MessageCircleQuestion, SparkleIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "../ui/badge";

export default function HowToPopup() {
  const key = "popup:how-to:seen-before";
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const hasVisitedBefore = localStorage.getItem(key);

    if (hasVisitedBefore === null) {
      (async () => {
        await new Promise((resolve) => setTimeout(resolve, 5000));
        setShowPopup(true);
      })();
    }
  }, []);

  const handleClose = () => {
    setShowPopup(false);
    see();
  };

  const see = () => {
    localStorage.setItem(key, "true");
  };

  return (
    <div>
      <AlertDialog defaultOpen={showPopup} open={showPopup}>
        <AlertDialogContent className="text-center max-w-[97vw] rounded-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center">
              <p className="scroll-m-20 text-2xl font-semibold tracking-tight">
                <MessageCircleQuestion className="mr-2 inline-block h-8 w-8 text-primary" />
                How to use
                <span className="ml-2 font-bold text-primary">Ke Pathalo</span>
              </p>

              <ul className="my-6 ml-6 list-disc [&>li]:mt-2 text-start text-sm font-normal">
                <li>
                  1st Create a portal for this you enter your email{" "}
                  <span className="text-destructive">
                    Must be a valid email
                  </span>{" "}
                  cause we will send you a email with token to access your
                  portal from other devices.
                </li>
                <li>
                  A default portal will be created for you with a random name.
                  You can share the link with anyone to send you a message. You
                  can create a unlimited portals.
                </li>
                <li>
                  All the messages will be stored in the portal and you can view
                  them anytime.
                </li>
                <li>
                  You can set time limit to a portal. After the time limit no
                  one can send you a message.
                </li>
                <li>
                  You just need to share portal link with anyone to send you a
                  message.
                  <Badge className="mt-1">
                    https://kepathalo.vercel.app/
                    <span className="">
                      <span className="">YOUR_PORTAL_ID</span>
                    </span>{" "}
                  </Badge>
                </li>
              </ul>

              <blockquote className="mt-6 border-l-2 pl-6 text-base italic">
                &quot;You will be notified via email when someone sends you a
                message. &quot;
              </blockquote>
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription></AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={handleClose}
              className={cn(buttonVariants({}), "w-full")}
            >
              <SparkleIcon className="h-6 w-6 mr-2" />
              Got it
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
