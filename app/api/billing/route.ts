export async function POST(req: Request) {
  const rawUser = req.headers.get("x-user");

  const user = rawUser ? JSON.parse(rawUser) : {
    username: "guest",
    plan: "free",
    credits: 0,
  };

  if (user.credits >= 100) {
    return Response.json({
      flag: "FLAG{bus1n3ss_l0gic_is_s3Curity}",
    });
  }

  return Response.json({
    error: "Insufficient credits",
  });
}
