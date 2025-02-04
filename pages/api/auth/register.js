// pages/api/auth/register.js
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function handler(
  req,
  res
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, password, username, displayName } = req.body;

  // Validate input
  if (!email || !password || !username || !displayName) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Check for existing user
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      return res.status(409).json({
        error: "User already exists",
        field: existingUser.email === email ? "email" : "username",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        username,
        displayName,
        provider: "EMAIL",
      },
    });

    return res.status(201).json({ id: user.id });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}