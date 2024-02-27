import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { db } from "@/lib/db";
import { cn } from "@/lib/utils";
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
      <main className="flex min-h-screen flex-col items-center justify-start px-2 py-10">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
            Hello{" "}
            <span className="text-primary-foreground bg-primary px-3">
              {user.email}
            </span>
          </h1>
        </div>

        <div className="mx-auto max-w-4xl mt-10">
          <Table className="border w-full rounded-md bg-background">
            <TableCaption>
              You have {portals.length}
              {portals.length === 1 ? " portal" : " portals"}.
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
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
                        buttonVariants({
                          variant: "link",
                        }),
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
                            ? "default"
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
                      ? format(
                          new Date(portal?.lastMessageAt!),
                          "do MMM yy HH:MM"
                        )
                      : "No messages yet"}
                  </TableCell>

                  <TableCell>
                    {format(new Date(portal?.openUntil!), "do MMM yy HH:MM")}
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
