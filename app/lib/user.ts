// lib/user.ts

export type User = {
  username: string;
  plan: "free" | "pro";
  credits: number;
};
