"use client";

import { Button } from "@/components/ui/button";
import { RotateCwIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  icon?: boolean;
}

export default function RefreshButton(props: Props) {
  const router = useRouter();
  function refresh() {
    router.refresh();
  }

  if (props.icon) {
    return (
      <Button onClick={refresh} variant={"secondary"} size={"sm"}>
        <RotateCwIcon className="w-4 h-4" />
      </Button>
    );
  }

  return (
    <Button
      onClick={refresh}
      size={"sm"}
      variant={"secondary"}
      className="mt-4"
    >
      Refresh
    </Button>
  );
}
