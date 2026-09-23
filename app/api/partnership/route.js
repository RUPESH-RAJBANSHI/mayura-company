import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectDB from "../../config/db";
import Partnership from "../../config/models/Partnership";

// Check admin authentication
function authenticate(request) {
  try {
    const token = request.cookies.get("adminToken")?.value;

    if (!token) {
      return false;
    }

    jwt.verify(token, process.env.JWT_SECRET);

    return true;
  } catch (error) {
    return false;
  }
}

// GET - Get all partnership inquiries
export async function GET(request) {
  try {
    if (!authenticate(request)) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized. Please login first.",
        },
        { status: 401 },
      );
    }

    await connectDB();

    const partnerships = await Partnership.find().sort({ createdAt: -1 });

    return NextResponse.json(
      {
        success: true,
        count: partnerships.length,
        partnerships,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Get partnerships error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch partnership inquiries",
      },
      { status: 500 },
    );
  }
}

// POST - Create a new partnership inquiry
export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    const { name, email, phone, company, partnershipType, subject, message } =
      body;

    // Validation
    if (!name || !email || !partnershipType || !subject || !message) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Name, email, partnership type, subject and message are required.",
        },
        { status: 400 },
      );
    }

    const partnership = await Partnership.create({
      name,
      email,
      phone,
      company,
      partnershipType,
      subject,
      message,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Partnership inquiry submitted successfully",
        partnership,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Create partnership error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to submit partnership inquiry",
      },
      { status: 500 },
    );
  }
}
