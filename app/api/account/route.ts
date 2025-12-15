// /api/account
export async function GET(req: Request) {
  const user = JSON.parse(req.headers.get("x-user") || "{}");

  if (user.plan === "pro") {
    return Response.json({
      secret: "FLAG{cl13nt_sid3_trust_i5_n0t_auth}",
    });
  }

  return Response.json({ message: "Upgrade to Pro" });
}
