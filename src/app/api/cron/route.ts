import { db } from "@/lib/db";
import { redis } from "@/lib/redis";
import { sendEmail } from "@/lib/send-email";
import type { NextRequest } from "next/server";
import NotificationEmail from "./notification-email";

const LAST_CHECK_KEY = "ke-pathalo:cron_lastCheck";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  const res = await redis.get(LAST_CHECK_KEY);
  const now = new Date();
  const lastCheck = res ? new Date(parseInt(res)) : new Date(0);

  const chatportals = await db.chatPortal.findMany({
    where: { lastMessageAt: { gt: lastCheck } },
  });

  const userIds = chatportals.map((chatportal) => chatportal.user_id);
  const uniqueUserIds = [...new Set(userIds)];

  for (const userId of uniqueUserIds) {
    const portals = chatportals.filter(
      (chatportal) => chatportal.user_id === userId
    );

    const user = await db.basicUser.findUnique({ where: { id: userId } });
    sendEmail({
      to: [user?.email!],
      subject: "Ke Pathalo | New Messages in Your Chat Portal",
      plainText: "",
      html: NotificationEmail(portals),
    });
  }

  await redis.set(LAST_CHECK_KEY, now.getTime().toString());
  return Response.json({
    success: true,
    message: "Cron job ran successfully",
    lastCheck: lastCheck.toISOString(),
    now: now.toISOString(),
    totalChatPortals: chatportals.length,
    uniqueUserIds: uniqueUserIds.length,
    users: uniqueUserIds,
  });
}
