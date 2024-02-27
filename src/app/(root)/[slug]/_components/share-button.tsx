"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Share2 } from "lucide-react";
import { toast } from "sonner";

interface ShareButtonProps {
  portalId: string;
}

export default function ShareButton(props: ShareButtonProps) {
  return (
    <aside className="fixed bottom-4 end-4 z-50 flex">
      <Button
        onClick={() => {
          navigator.clipboard.writeText(
            `${window.location.origin}/${props.portalId}`
          );

          return toast.success("Link copied to clipboard");
        }}
        className={cn("rounded-full py-6 text-base")}
      >
        <Share2 size={20} className="mr-1" />
        Share
      </Button>
    </aside>
  );
}
