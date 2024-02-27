import { db } from "@/lib/db";
import axios, { AxiosError } from "axios";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const res = await req.json();
  const { message, portalId } = res;

  try {
    const portal = await db.chatPortal.findUnique({ where: { id: portalId } });
    if (!portal) {
      return new Response("Chat portal not found.", { status: 404 });
    }

    const currentTime = new Date();
    if (portal.openUntil && currentTime > portal?.openUntil) {
      return new Response("Chat portal is closed.", { status: 400 });
    }

    let displayLocation = "";

    try {
      const lat = process.env.NODE_ENV === "development";
      console.log("🚀 ~ POST ~ lat:", lat);
      "24.892276675515255" ?? req.geo?.latitude;
      const long = process.env.NODE_ENV === "development";
      console.log("🚀 ~ POST ~ long:", long);
      "91.90531866971465" ?? req.geo?.longitude;

      const location = await axios.get(
        `https://geocode.maps.co/reverse?lat=${lat}&lon=${long}&api_key=${process.env.GEOCODE_MAPS_API_KEY}`
      );

      console.log("🚀 ~ POST ~ location", location.data);
      displayLocation = location.data.display_name;
    } catch (error) {
      console.log("🚀 ~ POST ~ location get error:", { error });
      if (error instanceof AxiosError) {
        const { response } = error;
        console.error(response?.data);
      }

      console.error(error);
    }

    await db.annoMessage.create({
      data: {
        message: message.trim(),
        location: displayLocation,
        chatPortalId: portal.id,
      },
    });

    await db.chatPortal.update({
      where: { id: portal.id },
      data: {
        lastMessageAt: currentTime,
        totalMessages: { increment: 1 },
      },
    });

    return new Response("Message sent successfully.", { status: 201 });
  } catch (error) {
    return new Response("Error sending message. Please try again.", {
      status: 500,
    });
  }
}
