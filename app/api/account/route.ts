import { cookies } from "next/headers";

type User = {
  username: string;
  plan: "free" | "pro";
};

export async function GET(req: Request) {
  const rawUser = req.headers.get("x-user");

  // Insecure design: trusting client-supplied identity
  const user: User = rawUser
    ? JSON.parse(rawUser)
    : { username: "guest", plan: "free" };

  const cookieStore = cookies();
  const credits = Number((await (await cookieStore).get("credits"))?.value || 0);

  // Legitimate "account status" response
  const accountStatus = {
    username: user.username,
    plan: user.plan,
    credits,
  };

  // Flag logic is NOT here
  if (user.plan === "pro") {
    return Response.json({
      ...accountStatus,
      secret: "FLAG{cl1ent_sid3_tru5t_i5_n0t_auth}",
    });
  }

  return Response.json(accountStatus);
}