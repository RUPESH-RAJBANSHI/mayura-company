import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectDB from "../../config/db";
import Query from "../../config/models/Query";

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

// GET - Get all queries
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

    const queries = await Query.find().sort({ createdAt: -1 });

    return NextResponse.json(
      {
        success: true,
        count: queries.length,
        queries,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Get queries error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch queries",
      },
      { status: 500 },
    );
  }
}

// POST - Create a new query
export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    const { name, email, phone, subject, message } = body;

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        {
          success: false,
          message: "Name, email, subject and message are required.",
        },
        { status: 400 },
      );
    }

    const query = await Query.create({
      name,
      email,
      phone,
      subject,
      message,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Query submitted successfully",
        query,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Create query error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to submit query",
      },
      { status: 500 },
    );
  }
}
