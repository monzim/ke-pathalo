import { NextRequest } from "next/server";
import { geolocation } from "@vercel/edge";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const geo = geolocation(req);
  console.log("🚀 ~ GET ~ geo:", geo);

  console.log("🚀 ~ GET ~ req:", { geo });
  return new Response(JSON.stringify(geo), {
    headers: {
      "content-type": "application/json",
    },
  });
}
