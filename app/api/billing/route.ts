import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = cookies();
  const credits = Number((await cookieStore).get("credits")?.value || 0);

  if (credits >= 100) {
    return Response.json({
      flag: "FLAG{bus1n3ss_l0gic_iS_s3cur1ty}",
    });
  }

  return Response.json({
    error: "Insufficient credits",
    currentCredits: credits,
  });
}