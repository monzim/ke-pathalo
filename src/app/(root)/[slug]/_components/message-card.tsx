"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Meteors } from "@/components/ui/meteors";
import { ScrollArea } from "@/components/ui/scroll-area";
import { timeAgo } from "@/lib/utils";
import { AnnoMessage } from "@prisma/client";
import { format } from "date-fns";
import { CameraIcon, MapPin, UserCircleIcon } from "lucide-react";
import html2canvas from "html2canvas";

interface Props {
  message: AnnoMessage | null;
  index: number;
}

export default function MessageCard(props: Props) {
  const message = props.message;
  const i = props.index;

  if (!message) {
    return null;
  }

  async function messageToScreenshot() {
    const canvas = await html2canvas(
      document.getElementById(`message-${message?.id}`)!
    );

    const screenshot = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = screenshot;
    a.download = `kepathalo-${message?.id}.png`;
    a.click();
  }

  return (
    <div className=" w-full relative overflow-hidden">
      <div className="absolute inset-0 h-full  w-full bg-gradient-to-r from-primary to-secondary transform scale-[0.80]  rounded-full blur-3xl opacity-30" />

      <Card className="relative shadow-xl px-4 py-2 h-full overflow-hidden flex flex-col justify-end items-start bg-transparent space-y-2">
        <div className="flex items-center gap-2 relative z-50 justify-between w-full">
          <div>
            <UserCircleIcon className="w-6 h-6 rounded-lg" />
            <p className="text-xs text-muted-foreground">
              {timeAgo(message.createdAt)}
            </p>
          </div>

          <Dialog>
            <DialogTrigger>
              <CameraIcon className="w-5 h-5 m-1 text-primary" />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Download Screenshot</DialogTitle>
                <DialogDescription>
                  Download a screenshot of this message
                </DialogDescription>
              </DialogHeader>

              <ScrollArea className="h-72">
                <section
                  id={`message-${message.id}`}
                  className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 aspect-[9/16] m-2 p-5 rounded-md mx-auto flex flex-col justify-center items-center"
                >
                  <div className="flex flex-col items-center">
                    <UserCircleIcon className="w-10 h-10 rounded-lg mb-2 drop-shadow-2xl" />
                    <p className="text-sm mb-2">
                      {format(
                        new Date(message.createdAt),
                        "d MMMM yyyy 'at' HH:mm"
                      )}
                    </p>

                    <div className="text-sm text-black bg-white p-2 shadow-lg mt-2">
                      Kepathalo.monzim.com
                    </div>
                  </div>

                  <p className="text-base text-center mx-6 mb-4 line-clamp-[14] mt-5 drop-shadow-sm font-semibold p-10 rounded-md">
                    {message.message}
                  </p>
                  <p className="text-sm text-slate-200 text-center mx-12">
                    {message.location === "" ? "No location" : message.location}
                  </p>

                  {/* show the portal id */}
                  <p className="text-xs text-slate-200 text-center mx-auto mt-2 font-bold">
                    Portal ID {message.chatPortalId}
                  </p>
                </section>
              </ScrollArea>
              <DialogFooter>
                <Button onClick={messageToScreenshot}>Download</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {message.message.length > 300 ? (
          <ScrollArea className="h-72">
            <blockquote className="py-2 border-l-2 pl-6 italic capitalize font-semibold relative z-50 text-base">
              {message.message}
            </blockquote>
          </ScrollArea>
        ) : (
          <blockquote className="py-2 border-l-2 pl-6 italic capitalize font-semibold relative z-50 text-base">
            {message.message}
          </blockquote>
        )}

        <p className="text-xs text-destructive items-center flex justify-start relative z-50 ">
          <MapPin className="w-4 h-4 inline mr-1" />
          {message.location === "" ? "No location" : message.location}
        </p>

        {/* Meaty part - Meteor effect */}
        <Meteors number={i * 5 < 40 ? i * 5 : i} />
      </Card>
    </div>
  );
}
