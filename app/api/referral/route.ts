// /api/referral
export async function POST(req: Request) {
  const { referrer } = await req.json();

  // Intended rule:
  // "Each user can only be referred once"
  return Response.json({
    creditsAdded: 10,
    message: `Referral applied for ${referrer}`,
  });
}
