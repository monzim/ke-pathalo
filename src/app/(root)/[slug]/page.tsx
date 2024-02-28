/* eslint-disable @next/next/no-img-element */
import { Card } from "@/components/ui/card";
import { db } from "@/lib/db";
import { InfoIcon } from "lucide-react";
import { cookies } from "next/headers";
import PortalOwnerView from "./_components/owner-message";
import SenderUI from "./_components/sender";

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

  return <PortalOwnerView chatPortal={chatPortal} />;
}
