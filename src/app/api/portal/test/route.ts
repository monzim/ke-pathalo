import { NextRequest } from "next/server";
// import { geolocation } from "@vercel/edge";

// export const runtime = "edge";

export async function GET(req: NextRequest) {
  console.log("🚀 ~ GET ~ req:", { req });
  return new Response(JSON.stringify(req), {
    headers: {
      "content-type": "application/json",
    },
  });
}

export async function POST(req: Request) {
  console.log("🚀 ~ POST ~ req:", { req });
  return new Response(JSON.stringify(req), {
    headers: {
      "content-type": "application/json",
    },
  });
}
