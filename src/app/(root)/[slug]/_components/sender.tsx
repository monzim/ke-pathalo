/* eslint-disable @next/next/no-img-element */
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { db } from "@/lib/db";
import { timeFuture } from "@/lib/utils";
import type { ChatPortal } from "@prisma/client";
import { UserCircle2 } from "lucide-react";
import SendMessage from "./send-message";
import ViewSendMessage from "./view-messages";

interface SenderUIProps {
  portal: ChatPortal;
}

export default async function SenderUI(props: SenderUIProps) {
  const chatPortal = props.portal;
  const isPortalOpen =
    chatPortal?.openUntil && chatPortal?.openUntil > new Date();

  const user = await db.basicUser.findUnique({
    where: { id: chatPortal.user_id },
    select: { email: true },
  });

  const userNames = user?.email.split("@")[0];

  await db.chatPortal.update({
    where: { id: chatPortal.id },
    data: { viewCount: { increment: 1 } },
  });

  return (
    <div className="bg-gradient-to-r from-primary to-fuchsia-500">
      <section className="mx-auto min-h-screen antialiased relative z-10">
        <Card className="mt-10 w-[92vw] lg:w-[50vw] mx-auto ">
          <CardHeader className="text-center">
            <div>
              <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl">
                <Badge className="text-xl lg:text-4xl font-mono">
                  <UserCircle2 className="w-6 h-6 inline-block mr-1" />
                  {userNames}
                </Badge>
              </h1>

              <h1 className="scroll-m-20 text-base font-medium text-muted-foreground tracking-tight text-center mt-2 lg:text-xl lg:mt-4">
                Hey there! You can send a message to {userNames} using this
                portal{" "}
                <span className="bg-secondary p-1 text-secondary-foreground">
                  {chatPortal.id}
                </span>
              </h1>

              <div className="mt-4 text-center space-y-3 font-semibold text-xs">
                <h3 className="text-destructive">
                  {!isPortalOpen ? (
                    "Portal is closed for new messages"
                  ) : (
                    <span>
                      Portal will close in{" "}
                      <span className="bg-destructive text-destructive-foreground px-2">
                        {timeFuture(chatPortal.openUntil)}
                      </span>
                    </span>
                  )}
                </h3>
              </div>
            </div>
          </CardHeader>

          <CardContent className="w-full">
            {isPortalOpen ? (
              <SendMessage portal={chatPortal} />
            ) : (
              <>
                <div className="px-10 space-y-2 mt-5">
                  <img
                    src="https://i.kym-cdn.com/photos/images/newsfeed/001/878/329/dfa.jpg"
                    alt="Not Found"
                    className="w-40 h-40 mx-auto rounded-full"
                  />

                  <p className="text-center text-lg text-muted-foreground">
                    Oops! You are late. This portal is closed for new messages.
                    You no longer send a message to this portal.
                  </p>
                </div>
              </>
            )}
          </CardContent>
        </Card>
        <div className="mx-auto flex justify-center pb-10">
          <ViewSendMessage portalID={chatPortal.id} />
        </div>
      </section>
      <BackgroundBeams />
    </div>
  );
}
