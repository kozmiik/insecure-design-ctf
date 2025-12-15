import { NextResponse } from "next/server";
import { getUser } from "@/app/lib/userStore";

export async function GET() {
  const user = await getUser();
  return NextResponse.json({ credits: user.credits });
}
