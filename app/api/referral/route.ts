import { NextResponse } from "next/server";
import { getUser, setUser } from "@/app/lib/userStore";

export async function POST() {
  const user = await getUser();

  user.credits += 10;

  await setUser(user);

  return NextResponse.json({ credits: user.credits });
}
