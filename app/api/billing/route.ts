export async function POST(req: Request) {
  const rawUser = req.headers.get("x-user");

  const user = rawUser
    ? JSON.parse(rawUser)
    : { username: "guest", plan: "free" };

  /**
   * Insecure design:
   * Credits are assumed to be valid if a user exists.
   * No fraud checks, no enforcement.
   */
  const assumedCredits = user ? 100 : 0;

  if (assumedCredits >= 100) {
    return Response.json({
      flag: "FLAG{business_logic_is_security}",
    });
  }

  return Response.json({ error: "Insufficient credits" });
}