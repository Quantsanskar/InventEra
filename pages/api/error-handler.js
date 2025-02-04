// lib/error-handler.js
import { NextApiResponse } from "next";

export function handleError(res, error) {
  console.error(error);
  
  if (error.code === "P2002") {
    return res.status(409).json({
      error: "Conflict",
      message: "Unique constraint violation",
      field: error.meta?.target?.[0],
    });
  }

  return res.status(500).json({
    error: "InternalServerError",
    message: "An unexpected error occurred",
  });
}