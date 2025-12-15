import { NextResponse } from "next/server";
import { getUser } from "@/app/lib/userStore";

export async function POST() {
  const user = await getUser();

  if (user.credits >= 100) {
    return NextResponse.json({
      flag: "FLAG{bus1n3ss_l0gic_is_s3cur1ty}"
    });
  }

  return NextResponse.json({
    error: "Not enough credits"
  });
}
