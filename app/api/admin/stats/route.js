import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

import connectDB from "../../../config/db";
import Admin from "../../../config/models/Admin";
import Product from "../../../config/models/Product";
import Query from "../../../config/models/Query";
import Meeting from "../../../config/models/Meeting";
import Partnership from "../../../config/models/Partnership";
import Application from "../../../config/models/Application";
import Career from "../../../config/models/Career";

export async function GET(request) {
  try {
    // Check admin authentication
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

    // Verify JWT token
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

    // Connect to MongoDB
    await connectDB();

    // Get dashboard statistics
    const [
      totalAdmins,
      activeAdmins,
      totalProducts,
      totalQueries,
      totalMeetings,
      totalPartnerships,
      totalApplications,
    ] = await Promise.all([
      Admin.countDocuments(),
      Admin.countDocuments({ status: true }),
      Product.countDocuments(),
      Query.countDocuments(),
      Meeting.countDocuments(),
      Partnership.countDocuments(),
      Application.countDocuments(),
    ]);

    // Get latest applications
    const recentApplications = await Application.find()
      .populate({
        path: "career",
        select: "title",
        model: "Career",
      })
      .sort({ createdAt: -1 })
      .limit(5);

      // Get recent meetings
      const recentMeetings = await Meeting.find()
      .sort({ createdAt: -1 })
      .limit(5);

    // Return dashboard statistics
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
          totalApplications,
        },
        recentApplications,
        recentMeetings,
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
