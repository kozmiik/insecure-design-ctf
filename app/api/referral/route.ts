import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = cookies();

  const currentCredits = Number((await cookieStore).get("credits")?.value || 0);
  const newCredits = currentCredits + 10;

  (await
        // Insecure design: no referral limit, no abuse detection
        cookieStore).set("credits", newCredits.toString(), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });

  return Response.json({
    message: "Referral applied",
    credits: newCredits,
  });
}