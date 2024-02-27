import { db } from "@/lib/db";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const cookieStore = cookies();

  const rawuser = cookieStore.get("user")?.value;
  const user = rawuser ? JSON.parse(rawuser) : null;

  if (user) {
    return new Response("already logged in", { status: 400 });
  }

  const body = await req.json();
  const email = body.email;
  const token = body.token;

  if (!email && !token) {
    return new Response("Email and token is required", {
      status: 400,
    });
  }

  // check email is valid with regex and mx lookup
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return new Response("Invalid email", { status: 400 });
  }

  const existingUser = await db.basicUser.findUnique({
    where: { email: email },
  });

  if (!existingUser) {
    return new Response("User not found", { status: 401 });
  }

  // check token is valid
  if (existingUser.token !== token) {
    return new Response("Invalid token", { status: 401 });
  }

  cookieStore.set("user", JSON.stringify(existingUser), {
    path: "/",
    maxAge: 60 * 60 * 24 * 100,
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  return new Response("Logged in", { status: 201 });
}
