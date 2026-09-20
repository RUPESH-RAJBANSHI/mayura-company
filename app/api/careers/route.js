import { NextResponse } from "next/server";
import connectDB from "../../config/db";
import Career from "../../config/models/Career";
import jwt from "jsonwebtoken";

// CHECK AUTHENTICATION
function authenticate(request) {
  const token = request.cookies.get("adminToken")?.value;

  if (!token) {
    return false;
  }

  jwt.verify(token, process.env.JWT_SECRET);

  return true;
}

// GET ALL CAREERS
export async function GET(request) {
  try {
    await connectDB();

    authenticate(request);

    const careers = await Career.find().sort({
      createdAt: -1,
    });

    return NextResponse.json(
      {
        success: true,
        count: careers.length,
        careers,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Get careers error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unauthorized or failed to fetch careers",
      },
      { status: 401 },
    );
  }
}

// CREATE CAREER
export async function POST(request) {
  try {
    await connectDB();

    authenticate(request);

    const body = await request.json();

    const {
      title,
      department,
      location,
      employmentType,
      salary,
      requirements,
      description,
      deadline,
      status,
    } = body;

    if (
      !title ||
      !department ||
      !location ||
      !requirements ||
      !description ||
      !deadline
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Title, department, location, requirements, description and deadline are required.",
        },
        { status: 400 },
      );
    }

    const career = await Career.create({
      title,
      department,
      location,
      employmentType: employmentType || "Full-time",
      salary: salary || "",
      requirements,
      description,
      deadline,
      status: status ?? true,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Career vacancy created successfully",
        career,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Create career error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create career vacancy",
      },
      { status: 500 },
    );
  }
}
