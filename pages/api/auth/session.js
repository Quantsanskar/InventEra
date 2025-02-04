// pages/api/auth/session.js
import { getToken } from "next-auth/jwt";

export default async function handler(
  req,
  res
) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    return res.status(200).json({ authenticated: false });
  }

  return res.status(200).json({
    authenticated: true,
    user: {
      id: token.id,
      email: token.email,
      profileComplete: token.profileComplete,
    },
  });
}