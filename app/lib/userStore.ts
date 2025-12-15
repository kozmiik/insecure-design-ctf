import { cookies } from "next/headers";

export type User = {
  username: string;
  plan: "free" | "pro";
  credits: number;
};

export async function getUser(): Promise<User> {
  const cookieStore = await cookies();
  const raw = cookieStore.get("user")?.value;

  if (!raw) {
    return { username: "guest", plan: "free", credits: 0 };
  }

  return JSON.parse(raw);
}

export async function setUser(user: User) {
  const cookieStore = await cookies();
  cookieStore.set("user", JSON.stringify(user), {
    httpOnly: false
  });
}
