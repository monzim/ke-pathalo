/* eslint-disable @next/next/no-img-element */
import { Badge } from "@/components/ui/badge";
import { db } from "@/lib/db";
import { format } from "date-fns";
import { InfoIcon, MapPin, UserCircleIcon } from "lucide-react";
import { cookies } from "next/headers";
import SenderUI from "./_components/sender";
import ShareButton from "./_components/share-button";
import { Card } from "@/components/ui/card";

export default async function Page({ params }: { params: { slug: string } }) {
  const chatPortal = await db.chatPortal.findUnique({
    where: { id: params.slug },
  });

  if (!chatPortal) {
    return (
      <div className="min-h-screen mx-auto flex justify-center items-center">
        <Card className="text-center p-10">
          <InfoIcon size={100} className="mx-auto" />
          <h2 className="text-2xl font-bold mt-4">Not Found</h2>
          <p className="text-muted-foreground mt-2">
            {" "}
            The chat portal you are looking for does not exist.
          </p>
        </Card>
      </div>
    );
  }

  const cookieStore = cookies();
  const rawuser = cookieStore.get("user")?.value;
  const user = rawuser ? JSON.parse(rawuser) : null;
  const userID = user?.id;

  if (chatPortal.user_id !== userID) {
    return <SenderUI portal={chatPortal} />;
  }

  const messages = await db.annoMessage.findMany({
    where: { chatPortalId: chatPortal.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <div className="opacity-60 absolute inset-0 -z-10 h-full w-full  bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-red-400 opacity-20 blur-[100px]"></div>
      </div>

      <main className="min-h-screen">
        <div className="flex flex-col p-4 gap-4 md:grid md:grid-rows-[auto,1fr]  md:p-6 max-w-4xl mx-auto">
          <div>
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl my-3">
              Portal{" "}
              <Badge
                variant={"outline"}
                className="text-4xl lg:text-5xl font-mono rounded"
              >
                {chatPortal.id}
              </Badge>
            </h1>

            <Badge className="text-md font-bold  font-mono rounded">
              https://kepathalo.monzim.com/{chatPortal.id}
            </Badge>

            <div className="mt-6">
              <p>
                <span>Created At:</span>{" "}
                {format(new Date(chatPortal.createdAt), "do MMM-yy HH:MM:SS")}
              </p>

              <p>
                <span>Open until:</span>{" "}
                <span className="text-xs bg-destructive text-destructive-foreground p-1">
                  {format(new Date(chatPortal.createdAt), "do MMM-yy HH:MM:SS")}
                </span>
              </p>
            </div>

            <div className="mt-6 text-end flex justify-between items-center">
              <p>View {chatPortal.viewCount}</p>
              <div>
                <h2 className="text-2xl font-bold">Messages</h2>
                <p className="text-xs text-muted-foreground">
                  In total {messages.length} messages received
                </p>
              </div>
            </div>
          </div>

          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center gap-4 border bg-background rounded-md py-6">
              <img
                src="https://i.kym-cdn.com/photos/images/newsfeed/001/384/531/8ed.jpg"
                alt="Empty"
                className="h-32 w-32 rounded-full object-cover shadow-md"
              />
              <p className="text-lg text-muted-foreground">
                Looks like you are not so much popular. No messages yet.
              </p>

              <p>
                Share your portal link with your friends and ask them to send
              </p>

              <Badge className="text-lg font-bold bg-primary font-mono">
                https://kepathalo.monzim.com/{chatPortal.id}
              </Badge>
            </div>
          )}

          <div className="flex flex-col gap-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className="space-y-2 border p-2 rounded-md px-4 bg-background"
              >
                <div className="flex items-center gap-2">
                  <UserCircleIcon className="w-6 h-6 rounded-lg " />
                  <p className="text-xs to-muted-foreground">
                    {format(new Date(message.createdAt), "do MMM-yy HH:MM:SS")}
                  </p>
                </div>

                <blockquote className="mt-6 border-l-2 pl-6 italic capitalize">
                  {message.message}
                </blockquote>
                <p className="text-xs text-destructive items-center flex justify-start">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  {message.location ?? "No location"}
                </p>
              </div>
            ))}
          </div>
        </div>

        <ShareButton portalId={chatPortal.id} />
      </main>
    </>
  );
}
