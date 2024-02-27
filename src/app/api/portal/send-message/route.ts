import { edgeDB } from "@/lib/db.edge";
import axios, { AxiosError } from "axios";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const prod = process.env.NODE_ENV === "production";

  const res = await req.json();
  const { message, portalId, geo } = res;
  console.log("🚀 ~ POST ~ geo:", geo);

  try {
    const portal = await edgeDB.chatPortal.findUnique({
      where: { id: portalId },
    });
    if (!portal) {
      return new Response("Chat portal not found.", { status: 404 });
    }

    const currentTime = new Date();
    if (portal.openUntil && currentTime > portal?.openUntil) {
      return new Response("Chat portal is closed.", { status: 400 });
    }

    let displayLocation = "";

    try {
      const lat = prod
        ? geo?.latitude ?? req?.geo?.latitude
        : "24.892276675515255";

      console.log("🚀 ~ POST ~ lat:", lat);

      const long = prod
        ? geo?.longitude ?? req?.geo?.longitude
        : "91.90531866971465";

      console.log("🚀 ~ POST ~ long:", long);

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

    await edgeDB.annoMessage.create({
      data: {
        message: message.trim(),
        location: displayLocation,
        chatPortalId: portal.id,
      },
    });

    await edgeDB.chatPortal.update({
      where: { id: portal.id },
      data: {
        lastMessageAt: currentTime,
        totalMessages: { increment: 1 },
      },
    });

    return new Response("Message sent successfully.", { status: 201 });
  } catch (error) {
    console.log("🚀 ~ POST ~ error:", error);
    return new Response("Error sending message. Please try again.", {
      status: 500,
    });
  }
}
