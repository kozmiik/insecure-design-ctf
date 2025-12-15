import { NextResponse } from "next/server";
import { setUser } from "@/app/lib/userStore";

export async function POST() {
  await setUser({
    username: "guest",
    plan: "free",
    credits: 0
  });

  return NextResponse.json({ message: "Demo state reset" });
}
