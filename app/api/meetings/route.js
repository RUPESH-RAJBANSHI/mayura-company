import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectDB from "../../config/db";
import Meeting from "../../config/models/Meeting";

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

// GET - Get all meetings
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

    const meetings = await Meeting.find().sort({ createdAt: -1 });

    return NextResponse.json(
      {
        success: true,
        count: meetings.length,
        meetings,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Get meetings error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch meetings",
      },
      { status: 500 },
    );
  }
}

// POST - Create a new meeting request
export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    const { name, email, phone, company, date, time, subject, message } = body;

    // Validation
    if (!name || !email || !date || !time || !subject) {
      return NextResponse.json(
        {
          success: false,
          message: "Name, email, date, time and subject are required.",
        },
        { status: 400 },
      );
    }

    const meeting = await Meeting.create({
      name,
      email,
      phone,
      company,
      date,
      time,
      subject,
      message,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Meeting request submitted successfully",
        meeting,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Create meeting error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to submit meeting request",
      },
      { status: 500 },
    );
  }
}
