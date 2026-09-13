import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(request) {
  try {
    // Get adminToken from HTTP-only cookie
    const token = request.cookies.get("adminToken")?.value;

    // No token
    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized. Please login first.",
        },
        { status: 401 },
      );
    }

    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    return NextResponse.json(
      {
        success: true,
        message: "Welcome to the admin dashboard",
        admin: decoded,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Unauthorized. Invalid or expired token.",
      },
      { status: 401 },
    );
  }
}
