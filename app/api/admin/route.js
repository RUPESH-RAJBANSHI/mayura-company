import { NextResponse } from "next/server";
import connectDB from "../../config/db";
import Admin from "../../config/models/Admin";
import jwt from "jsonwebtoken";

export async function GET(request) {
  try {
    await connectDB();

    const token = request.cookies.get("adminToken")?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized. Please login first.",
        },
        { status: 401 }
      );
    }

    jwt.verify(token, process.env.JWT_SECRET);

    const admins = await Admin.find().select("-password");

    return NextResponse.json(
      {
        success: true,
        count: admins.length,
        admins,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Get admins error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch admins",
      },
      { status: 500 }
    );
  }
}