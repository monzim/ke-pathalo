"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { questions } from "@/lib/questions";
import type { ChatPortal } from "@prisma/client";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Props {
  portal: ChatPortal;
}

export default function SendMessage(props: Props) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [usedIndexes, setUsedIndexes] = useState<number[]>([]);

  async function sendMessage() {
    if (!message || message === "" || message.trim().length < 3) {
      return toast.error(
        "Please enter your message to send. Minimum 3 characters required."
      );
    }

    try {
      setLoading(true);
      const locRes = await axios.get("/api/loc");
      const geo = locRes.data;

      const res = await axios.post("/api/portal/send-message", {
        message: message,
        portalId: props.portal.id,
        geo,
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

  function genRandomQuestion() {
    const total = questions.length;
    const random = Math.floor(Math.random() * total);
    setMessage(questions[random]);
    if (usedIndexes.includes(random)) {
      if (usedIndexes.length === total) {
        setUsedIndexes([]);
      }

      return genRandomQuestion();
    }

    return questions[random];
  }

  return (
    <>
      <Textarea
        placeholder="Type your message here."
        className="w-full min-h-28 bg-transparent"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <AlertDialog>
        <AlertDialogTrigger asChild>
          {message && message.length > 0 && (
            <Button disabled={loading} className="h-10 mt-4 w-full">
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Send
            </Button>
          )}
        </AlertDialogTrigger>
        <AlertDialogContent className="max-w-[96vw] rounded-md lg:max-w-[50vw]">
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to send this message?
            </AlertDialogTitle>
            <AlertDialogDescription>
              <p className="text-destructive">This action cannot be undone.</p>
              <blockquote className="mt-6 border-l-2 pl-6 text-base italic">
                &quot;
                {message.length > 100 ? message.slice(0, 100) + "..." : message}
                &quot;
              </blockquote>
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={sendMessage}>
              Send Message
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="text-center">
        <Button
          disabled={loading}
          variant={"secondary"}
          size={"sm"}
          className="mt-4 max-w-md w-full"
          onClick={genRandomQuestion}
        >
          Random Question
        </Button>
      </div>
    </>
  );
}
