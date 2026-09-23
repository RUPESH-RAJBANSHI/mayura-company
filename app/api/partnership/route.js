import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectDB from "../../config/db";
import Partnership from "../../config/models/Partnership";

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

// GET - Get all partnerships
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

    const partnerships = await Partnership.find().sort({
      createdAt: -1,
    });

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

// POST - Create partnership inquiry
export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    const { name, email, phone, company, partnershipType, subject, message } =
      body;

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

// PUT - Update partnership status
export async function PUT(request) {
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

    const body = await request.json();

    const { id, status } = body;

    const allowedStatuses = [
      "New",
      "Contacted",
      "In Progress",
      "Completed",
      "Rejected",
    ];

    // Check required fields
    if (!id || !status) {
      return NextResponse.json(
        {
          success: false,
          message: "Partnership ID and status are required.",
        },
        { status: 400 },
      );
    }

    // Check valid status
    if (!allowedStatuses.includes(status)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid partnership status.",
        },
        { status: 400 },
      );
    }

    // Find and update partnership
    const partnership = await Partnership.findByIdAndUpdate(
      id,
      {
        status,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    // Partnership not found
    if (!partnership) {
      return NextResponse.json(
        {
          success: false,
          message: "Partnership inquiry not found.",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Partnership status updated successfully.",
        partnership,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Update partnership error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update partnership status.",
      },
      { status: 500 },
    );
  }
}
