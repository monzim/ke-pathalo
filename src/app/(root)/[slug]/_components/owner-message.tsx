/* eslint-disable @next/next/no-img-element */
import { Badge } from "@/components/ui/badge";
import { db } from "@/lib/db";
import { timeAgo, timeFuture } from "@/lib/utils";
import type { ChatPortal } from "@prisma/client";
import MessageCard from "./message-card";
import RefreshButton from "./refresh-button";
import ShareButton from "./share-button";

interface Props {
  chatPortal: ChatPortal;
}

export default async function PortalOwnerView(props: Props) {
  const chatPortal = props.chatPortal;

  const messages = await db.annoMessage.findMany({
    where: { chatPortalId: chatPortal.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      {/* <div className="opacity-60 absolute inset-0 -z-10 h-full w-full  bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-red-400 opacity-20 blur-[100px]"></div>
      </div> */}

      <main className="min-h-screen">
        <div className="flex flex-col p-4 gap-4 md:grid md:grid-rows-[auto,1fr]  md:p-6 max-w-4xl mx-auto">
          <div>
            <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl my-3">
              Portal{" "}
              <Badge
                variant={"outline"}
                className="text-3xl lg:text-4xl font-mono rounded"
              >
                {chatPortal.id}
              </Badge>
            </h1>

            <Badge className="text-sm  font-mono rounded">
              https://kepathalo.monzim.com/{chatPortal.id}
            </Badge>

            <div className="mt-6 text-xs space-y-2">
              <p>
                <span>Created </span> {timeAgo(chatPortal.createdAt)}{" "}
              </p>

              <p>
                <span>Open for</span>{" "}
                <span className="bg-destructive text-destructive-foreground p-1">
                  {timeFuture(chatPortal.openUntil)}
                </span>
              </p>
            </div>

            <div className="mt-6 text-end flex justify-between items-center">
              <div className="flex-col space-y-1 text-start lg:flex">
                <p className="font-medium">View {chatPortal.viewCount}</p>
                <RefreshButton icon={true} />
              </div>

              <div>
                <h2 className="text-2xl font-bold">Messages</h2>
                <p className="text-xs text-muted-foreground">
                  In total {messages.length} messages received
                </p>
              </div>
            </div>
          </div>

          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center gap-4 border bg-background rounded-md py-20">
              <img
                src="https://i.kym-cdn.com/photos/images/newsfeed/001/384/531/8ed.jpg"
                alt="Empty"
                className="h-32 w-32 rounded-full object-cover shadow-md"
              />

              <div className="max-w-xl text-center mx-10">
                <p className="text-base text-muted-foreground">
                  Looks like you are not so much popular. No messages yet. Share
                  your portal link with your friends and ask them to send
                </p>

                <RefreshButton />
              </div>
            </div>
          )}

          <div className="flex flex-col gap-4">
            {messages.map((message, i) => (
              <MessageCard key={message.id} message={message} index={i} />
            ))}
          </div>
        </div>

        <ShareButton portalId={chatPortal.id} />
      </main>
    </>
  );
}
