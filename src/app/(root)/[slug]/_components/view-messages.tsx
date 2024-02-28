"use client";

import { Button } from "@/components/ui/button";
import { timeAgo } from "@/lib/utils";
import { format } from "date-fns";
import { RefreshCcw } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
  portalID: string;
}

interface Message {
  message: string;
  createdAt: string;
}

export default function ViewSendMessage(props: Props) {
  const { portalID } = props;
  const [mounted, setMounted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (mounted) return;
    setMounted(true);
    getMessage();
  }, [mounted, portalID]);

  function getMessage() {
    const messages = JSON.parse(
      localStorage.getItem(`${portalID}_message`) || "[]"
    );

    setMessages(messages);
  }

  return (
    <>
      <div className="mt-4 mx-4">
        <h4 className="scroll-m-20 text-lg underline font-semibold tracking-tight">
          Your Sent Messages
          <Button
            size={"sm"}
            onClick={getMessage}
            variant={"secondary"}
            className="ml-2"
          >
            <RefreshCcw size={18} />
          </Button>
        </h4>

        <div className="mt-4">
          {messages.map((message, i) => (
            <div key={i} className="flex space-x-2 p-1 text-sm">
              <p className="text-muted-foreground">
                {timeAgo(new Date(message.createdAt))}
              </p>
              <p className="font-bold">{message.message}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
