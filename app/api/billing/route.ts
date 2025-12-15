import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = cookies();
  const credits = Number((await cookieStore).get("credits")?.value || 0);

  if (credits >= 100) {
    return Response.json({
      flag: "FLAG{business_logic_is_security}",
    });
  }

  return Response.json({
    error: "Insufficient credits",
    currentCredits: credits,
  });
}