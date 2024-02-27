import { geolocation } from "@vercel/edge";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const geo = geolocation(req);

  return new Response(JSON.stringify(geo), {
    headers: {
      "content-type": "application/json",
    },
  });
}
