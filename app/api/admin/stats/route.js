import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

import connectDB from "../../../config/db";
import Admin from "../../../config/models/Admin";
import Product from "../../../config/models/Product";
import Query from "../../../config/models/Query";
import Meeting from "../../../config/models/Meeting";
import Partnership from "../../../config/models/Partnership";

export async function GET(request) {
  try {
    //Check admin authentication
    const token = request.cookies.get("adminToken")?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized. Please login first.",
        },
        { status: 401 },
      );
    }

    //Verify JWT token
    try {
      jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized. Invalid or expired token.",
        },
        { status: 401 },
      );
    }

    //Connect to MongoDB
    await connectDB();

    // 4. Get live statistics from MongoDB
    const [
      totalAdmins,
      activeAdmins,
      totalProducts,
      totalQueries,
      totalMeetings,
      totalPartnerships,
    ] = await Promise.all([
      Admin.countDocuments(),
      Admin.countDocuments({ status: true }),
      Product.countDocuments(),
      Query.countDocuments(),
      Meeting.countDocuments(),
      Partnership.countDocuments(),
    ]);

    //Return dashboard statistics
    return NextResponse.json(
      {
        success: true,
        stats: {
          totalAdmins,
          activeAdmins,
          totalProducts,
          totalQueries,
          totalMeetings,
          totalPartnerships,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Dashboard stats error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch dashboard statistics.",
      },
      { status: 500 },
    );
  }
}
