import { Card } from "@/components/ui/card";
import { db } from "@/lib/db";
import { InfoIcon } from "lucide-react";
import { cookies } from "next/headers";
import PortalOwnerView from "./_components/owner-message";
import SenderUI from "./_components/sender";
import { Metadata } from "next";

const seo_keywords = [
  "monzim",
  "ke-pathalo",
  "কে পাঠালো ",
  "bangla",
  "ngl",
  "anonymous",
  "messaging",
  "Anonymous messaging platform",
  "Send anonymous messages",
  "Secret message exchange",
  "Private message service",
  "Anonymous communication",
  "Untraceable messaging",
  "Stealthy message sender",
  "Hidden identity messaging",
  "IP-based location tracking",
  "Confidential message delivery",
  "Secure anonymous chat",
  "Covert message exchange",
  "Incognito messaging",
  "Masked sender communication",
  "Private chat with friends",
  "Anonymous chatroom",
  "Concealed identity messaging",
  "IP tracking for approximate location",
  "Anonymous message service",
  "Secretive message delivery",
  "azraf",
  "send-anonymous-messages",
  "send-secret-messages",
  "friendship",
  "love",
  "send messages to friends",
  "get messages",
  "sender location",
  "github",
  "monzim project",
];

export const metadata: Metadata = {
  metadataBase: new URL("https://kepathalo.monzim.com"),
  alternates: {
    canonical: "/",
    languages: { "en-US": "/en-US" },
  },
  title: "কে পাঠালো | Ke Pathalo",
  description:
    "Send anonymous messages to your friends and get messages from them. No one will know who sent the message. It's a secret!",
  openGraph: {
    images:
      "https://cdn-monzim-com.azureedge.net/public-com/public/a4823e70-e126-11ee-8c85-331c038f3ef5",
  },
  keywords: seo_keywords,
};

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
