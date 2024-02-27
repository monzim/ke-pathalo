import { db } from "@/lib/db";
import { NextRequest } from "next/server";
import { nanoid } from "nanoid";
import { cookies } from "next/headers";
import { sendEmail } from "@/lib/send-email";
import emailTemplate from "./html_email";

export async function POST(req: NextRequest) {
  const cookieStore = cookies();

  const rawuser = cookieStore.get("user")?.value;
  const user = rawuser ? JSON.parse(rawuser) : null;

  if (user) {
    // check user is valid
    const existingUser = await db.basicUser.findUnique({
      where: { id: user.id },
    });

    if (!existingUser) {
      cookieStore.set("user", "", { path: "/", maxAge: 0 });
      return new Response("Invalid user", { status: 401 });
    }

    const json = await req.json();
    const days = json.days || 10;

    await db.chatPortal.create({
      data: {
        id: nanoid(5),
        user_id: user?.id,
        openUntil: new Date(Date.now() + 1000 * 60 * 60 * 24 * days), // 7 days
      },
    });

    return new Response("Portal created", { status: 201 });
  }

  const body = await req.json();
  const email = body.email;

  if (!email) {
    return new Response("Email is required", {
      status: 400,
    });
  }

  // check email is valid with regex and mx lookup
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return new Response("Invalid email", { status: 400 });
  }

  ///// NOT DOING MX LOOKUP FOR NOW CAUSE IT'S SLOW we have 10sec to respond for vercel serverless functions
  // // mx lookup
  // const domain = email.split("@")[1];
  // const mx = await fetch(`https://dns.google/resolve?name=${domain}&type=MX`);
  // const mxJson = await mx.json();
  // if (!mxJson.Answer) {
  //   return new Response("Invalid email", { status: 400 });
  // }

  const existingUser = await db.basicUser.findUnique({
    where: { email: email },
  });

  if (existingUser) {
    return new Response("User already exists with the same email", {
      status: 400,
    });
  }

  const newUser = await db.basicUser.create({
    data: { email: email, token: nanoid(8) },
  });

  // NOTE: This is optional i am using my own email service
  sendEmail({
    to: [email],
    subject: "Your Ke-Pathalo token is here",
    html: emailTemplate(newUser?.token),
    plainText: "",
  });

  cookieStore.set("user", JSON.stringify(newUser), {
    path: "/",
    maxAge: 60 * 60 * 24 * 100,
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  await db.chatPortal.create({
    data: {
      id: nanoid(5),
      user_id: newUser.id,
      openUntil: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
    },
  });
  return new Response("Portal created", { status: 201 });
}
