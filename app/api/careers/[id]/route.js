import { NextResponse } from "next/server";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

import connectDB from "../../../config/db";
import Career from "../../../config/models/Career";

function authenticate(request) {
  const token = request.cookies.get("adminToken")?.value;

  if (!token) {
    return false;
  }

  jwt.verify(token, process.env.JWT_SECRET);

  return true;
}

// ============================
// GET SINGLE CAREER
// ============================
export async function GET(request, { params }) {
  try {
    await connectDB();

    authenticate(request);

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid career ID",
        },
        { status: 400 },
      );
    }

    const career = await Career.findById(id);

    if (!career) {
      return NextResponse.json(
        {
          success: false,
          message: "Career vacancy not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        career,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Get single career error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch career vacancy",
      },
      { status: 500 },
    );
  }
}

// ============================
// UPDATE CAREER
// ============================
export async function PUT(request, { params }) {
  try {
    await connectDB();

    authenticate(request);

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid career ID",
        },
        { status: 400 },
      );
    }

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

    const career = await Career.findByIdAndUpdate(
      id,
      {
        title,
        department,
        location,
        employmentType,
        salary: salary || "",
        requirements,
        description,
        deadline,
        status: status ?? true,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!career) {
      return NextResponse.json(
        {
          success: false,
          message: "Career vacancy not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Career vacancy updated successfully",
        career,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Update career error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update career vacancy",
      },
      { status: 500 },
    );
  }
}

// ============================
// DELETE CAREER
// ============================
export async function DELETE(request, { params }) {
  try {
    await connectDB();

    authenticate(request);

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid career ID",
        },
        { status: 400 },
      );
    }

    const career = await Career.findByIdAndDelete(id);

    if (!career) {
      return NextResponse.json(
        {
          success: false,
          message: "Career vacancy not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Career vacancy deleted successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Delete career error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete career vacancy",
      },
      { status: 500 },
    );
  }
}
