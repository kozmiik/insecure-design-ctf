// app/api/reset/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();

  cookieStore.set(
    "user",
    JSON.stringify({
      username: "guest",
      plan: "free",
      credits: 0
    }),
    { httpOnly: false }
  );

  return NextResponse.json({
    message: "Demo state reset"
  });
}
