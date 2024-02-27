/* eslint-disable @next/next/no-img-element */
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { ChatPortal } from "@prisma/client";
import { format } from "date-fns";
import SendMessage from "./send-message";
import { db } from "@/lib/db";
import { FrownIcon } from "lucide-react";
import ViewSendMessage from "./view-messages";

interface SenderUIProps {
  portal: ChatPortal;
}

export default async function SenderUI(props: SenderUIProps) {
  const chatPortal = props.portal;
  const isPortalOpen =
    chatPortal?.openUntil && chatPortal?.openUntil > new Date();

  await db.chatPortal.update({
    where: { id: chatPortal.id },
    data: { viewCount: { increment: 1 } },
  });

  return (
    <>
      <section className="mx-auto min-h-screen ">
        <div className="mx-2">
          <Card className="mt-10 w-[90vw] lg:w-[50vw]">
            <CardHeader className="text-center">
              <div>
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                  Portal{" "}
                  <Badge className="text-4xl lg:text-5xl font-mono">
                    {chatPortal.id}
                  </Badge>
                </h1>

                <h1 className="scroll-m-20 text-lg font-medium text-muted-foreground tracking-tight text-center mt-4 lg:text-xl">
                  Welcome to the chat portal anonymous message sender
                </h1>

                <div className="mt-6 text-center space-y-3 font-semibold text-xs">
                  <h3 className="text-destructive">
                    {!isPortalOpen ? (
                      "Portal is closed for new messages"
                    ) : (
                      <span>
                        This portal is open until{" "}
                        <span className="bg-destructive text-destructive-foreground px-2">
                          {format(
                            new Date(chatPortal?.openUntil || new Date()),
                            "do MMM-yy HH:MM:SS"
                          )}
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
                      Oops! You are late. This portal is closed for new
                      messages. You no longer send a message to this portal.
                    </p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        <ViewSendMessage portalID={chatPortal.id} />
      </section>
    </>
  );
}
