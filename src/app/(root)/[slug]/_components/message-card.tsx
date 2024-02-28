"use client";

import { Card } from "@/components/ui/card";
import { Meteors } from "@/components/ui/meteors";
import { ScrollArea } from "@/components/ui/scroll-area";
import { timeAgo } from "@/lib/utils";
import { AnnoMessage } from "@prisma/client";
import { MapPin, UserCircleIcon } from "lucide-react";

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

  return (
    <div className=" w-full relative overflow-hidden">
      <div className="absolute inset-0 h-full  w-full bg-gradient-to-r from-primary to-secondary transform scale-[0.80]  rounded-full blur-3xl opacity-30" />

      <Card className="relative shadow-xl px-4 py-2 h-full overflow-hidden flex flex-col justify-end items-start bg-transparent space-y-2">
        <div className="flex items-center gap-2 relative z-50">
          <UserCircleIcon className="w-6 h-6 rounded-lg" />
          <p className="text-xs text-muted-foreground">
            {timeAgo(message.createdAt)}
          </p>
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
