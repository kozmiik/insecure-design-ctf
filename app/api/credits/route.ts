import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = cookies();
  const credits = Number((await cookieStore).get("credits")?.value || 0);

  return Response.json({ credits });
}
