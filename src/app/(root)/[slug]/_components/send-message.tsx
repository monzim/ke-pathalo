"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { ChatPortal } from "@prisma/client";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  portal: ChatPortal;
}

export default function SendMessage(props: Props) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!message || message === "" || message.trim().length < 3) {
      return toast.error(
        "Please enter your message to send. Minimum 3 characters required."
      );
    }

    try {
      setLoading(true);
      const res = await axios.post("/api/portal/send-message", {
        message: message,
        portalId: props.portal.id,
      });

      if (res.status === 201) {
        const messages = JSON.parse(
          localStorage.getItem(`${props.portal.id}_message`) || "[]"
        );
        messages.push({ message, createdAt: new Date().toISOString() });
        localStorage.setItem(
          `${props.portal.id}_message`,
          JSON.stringify(messages)
        );

        setMessage("");
        return toast.success("Message sent successfully.");
      }

      throw new Error("Error sending message. Please try again.");
    } catch (error) {
      return toast.error("Error sending message. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Textarea
        placeholder="Type your message here."
        className="w-full"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button
        disabled={loading}
        className="h-10 mt-4 w-full"
        onClick={sendMessage}
      >
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Send
      </Button>
    </>
  );
}
