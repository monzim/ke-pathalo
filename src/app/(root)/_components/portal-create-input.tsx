"use client";

import { Button } from "@/components/ui/button";
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
import axios, { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function PortalCreateInput() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function createPortal() {
    if (!email || email === "" || email.trim().length < 3) {
      return toast.error(
        "Please enter a valid email to create a portal. It should be at least 3 characters long."
      );
    }

    if (!email.includes("@") || !email.includes(".")) {
      return toast.error(
        "Please enter a valid email to create a portal. We need a valid email to send you the portal token."
      );
    }

    setLoading(true);

    try {
      const res = await axios.post("/api/portal/new", { email: email });
      if (res.status === 201) {
        toast.success("Portal created successfully.");
        toast.info(
          "Please check your email for the portal token. You will need it to authenticate with your portal."
        );
        return router.push("/console");
      }

      throw new Error("Error creating portal. Please try again.");
    } catch (error) {
      if (error instanceof AxiosError) {
        return toast.error(error?.response?.data);
      }

      return toast.error("Error creating portal. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createPortal();
      }}
      className="flex flex-col gap-2 mt-4"
    >
      <Input
        className="mx-auto w-full max-w-[300px] sm:max-w-[400px] tracking-wider text-center"
        placeholder="Enter your email"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        min={3}
        max={20}
      />
      <Button
        disabled={loading}
        className="mx-auto w-full max-w-[300px] mt-1"
        type="submit"
      >
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Open a portal
      </Button>

      <JoinExistingPortalButton />
    </form>
  );
}

export function JoinExistingPortalButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"link"} className="mt-1">
          I already have a portal
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Authenticate with your existing portal</DialogTitle>
          <DialogDescription>
            Enter your email and token to authenticate with your existing
            portal. You can find the token in email sent to you when you created
            the portal.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              className="col-span-3"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="token" className="text-right">
              Token
            </Label>
            <Input
              id="token"
              type="text"
              className="col-span-3"
              onChange={(e) => setToken(e.target.value)}
              value={token}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            disabled={loading}
            onClick={async () => {
              if (!email || email === "" || email.trim().length < 3) {
                return toast.error(
                  "Please enter a valid email to authenticate with your portal. It should be at least 3 characters long."
                );
              }

              if (!email.includes("@") || !email.includes(".")) {
                return toast.error(
                  "Please enter a valid email to authenticate with your portal. We need a valid email to send you the portal token."
                );
              }

              if (!token || token === "" || token.trim().length < 3) {
                return toast.error(
                  "Please enter a valid token to authenticate with your portal. It should be at least 3 characters long."
                );
              }

              setLoading(true);

              try {
                const res = await axios.post("/api/portal/login", {
                  email,
                  token,
                });
                if (res.status === 201) {
                  toast.success("Authenticated successfully.");
                  return router.push("/console");
                }

                throw new Error(
                  "Error authenticating with portal. Please try again."
                );
              } catch (error) {
                if (error instanceof AxiosError) {
                  return toast.error(error?.response?.data);
                }

                return toast.error(
                  "Error authenticating with portal. Please try again."
                );
              } finally {
                setLoading(false);
              }
            }}
          >
            <span>Authenticate</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
