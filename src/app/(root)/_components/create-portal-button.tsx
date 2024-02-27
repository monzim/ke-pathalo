"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import axios, { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function CreatePortalButton() {
  const router = useRouter();
  const pathName = usePathname();
  const [loading, setLoading] = useState(false);
  const [days, setDays] = useState(10);

  if (pathName !== "/console") {
    return (
      <Link href={"/console"} className={cn(buttonVariants())}>
        Console
      </Link>
    );
  }

  async function createPortal() {
    if (!days || days < 1 || days > 300) {
      return toast.error(
        "Please enter the number of days to create a portal. Minimum 1 day and maximum 300 days required."
      );
    }

    setLoading(true);

    try {
      const res = await axios.post("/api/portal/new", { days });
      if (res.status === 201) {
        toast.success("Portal created successfully.");
        document?.getElementById("close-dialog")?.click();

        return router.refresh();
      }

      if (res.status === 400) {
        return toast.error(res.data);
      }

      throw new Error("Error creating portal. Please try again.");
    } catch (error) {
      return toast.error("Error creating portal. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create portal</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a new portal</DialogTitle>
          <DialogDescription>
            Create a new portal for getting new annomus messages.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="portal-name" className="col-span-1">
              How long should the portal be open? (in days)
            </Label>
            <Input
              type="number"
              min={1}
              max={300}
              defaultValue={10}
              className="col-span-3 font-mono"
              placeholder="Open until in days"
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            disabled={loading}
            onClick={createPortal}
            className="w-full max-w-md"
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
