// pages/api/protected.ts
import { getSession } from "next-auth/react";
import { limiter } from "@/lib/rate-limiter";

export default async function handler(
  req,
  res
) {
  // Apply rate limiting
  try {
    await limiter.removeTokens(1);
  } catch {
    return res.status(429).json({ error: "Too many requests" });
  }

  // Check authentication
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  return res.json({ secret: "Protected data" });
}