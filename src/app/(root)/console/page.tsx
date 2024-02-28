import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { logout } from "@/lib/actions";
import { db } from "@/lib/db";
import { cn, timeAgo, timeFuture } from "@/lib/utils";
import { format } from "date-fns";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page() {
  const cookieStore = cookies();
  const rawuser = cookieStore.get("user")?.value;
  const user = rawuser ? JSON.parse(rawuser) : null;
  const userExists = !!user;

  if (!userExists) {
    return redirect("/");
  }

  const portals = await db.chatPortal.findMany({
    where: { user_id: user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>

      <main className="flex min-h-screen flex-col items-center justify-start px-2 py-10">
        <Card className="text-center px-10 pt-4">
          <h1 className="font-bold tracking-tight lg:flex justify-center items-center gap-2">
            <p className="text-secondary-foreground bg-secondary px-3">
              {user.email}
            </p>
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Joined on {format(new Date(user.createdAt), "do MMM yy")} and
            created {portals.length}{" "}
            {portals.length === 1 ? "portal" : "portals"}.
          </p>

          <form action={logout}>
            <Button variant={"link"} type="submit" className="text-destructive">
              logout
            </Button>
          </form>
        </Card>

        <div className="mx-auto mt-10 w-full max-w-5xl">
          <Table className="border w-full rounded-md bg-background">
            {/* <TableCaption>
              You have {portals.length}
              {portals.length === 1 ? " portal" : " portals"}.
            </TableCaption> */}
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px] text-center">Portal</TableHead>
                <TableHead>Info</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Message</TableHead>
                <TableHead>Open Until</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {portals.map((portal) => (
                <TableRow key={portal.id}>
                  <TableCell className="font-medium">
                    <Link
                      href={`/${portal.id}`}
                      className={cn(
                        buttonVariants({ size: "sm" }),
                        "tracking-widest font-mono font-medium"
                      )}
                    >
                      {portal.id}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <div className="text-start text-xs">
                      <p className="font-medium">
                        View:{" "}
                        <span className="font-bold">{portal.viewCount}</span>
                      </p>
                      <p className="text-sm">
                        Messages:{" "}
                        <span className="font-bold">
                          {portal.totalMessages}
                        </span>
                      </p>
                    </div>
                  </TableCell>

                  <TableCell>
                    <Badge
                      variant={
                        portal.openUntil
                          ? new Date(portal.openUntil) > new Date()
                            ? "outline"
                            : "destructive"
                          : "default"
                      }
                    >
                      {portal.openUntil
                        ? new Date(portal.openUntil) > new Date()
                          ? "Open"
                          : "Closed"
                        : "Open"}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    {portal?.lastMessageAt
                      ? timeAgo(portal?.lastMessageAt)
                      : "No messages yet"}
                  </TableCell>

                  <TableCell className="line-clamp-2">
                    {timeFuture(portal?.openUntil)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </>
  );
}
