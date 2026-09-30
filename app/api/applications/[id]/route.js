import { NextResponse } from "next/server";
import connectDB from "../../../config/db";
import Application from "../../../config/models/Application";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

// ADMIN AUTHENTICATION
function authenticate(request) {
  const token = request.cookies.get("adminToken")?.value;

  if (!token) {
    throw new Error("Unauthorized");
  }

  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error("Unauthorized");
  }
}

// UPDATE APPLICATION STATUS
export async function PUT(request, { params }) {
  try {
    await connectDB();
    authenticate(request);

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid application ID",
        },
        { status: 400 },
      );
    }

    const body = await request.json();
    const { status } = body;

    const allowedStatuses = ["Pending", "Reviewed", "Shortlisted", "Rejected"];

    if (!allowedStatuses.includes(status)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid application status",
        },
        { status: 400 },
      );
    }

    const application = await Application.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    ).populate({
      path: "career",
      select: "title department location employmentType deadline",
      model: "Career",
    });

    if (!application) {
      return NextResponse.json(
        {
          success: false,
          message: "Application not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Application status updated successfully",
        application,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Update application error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unauthorized or failed to update application",
      },
      { status: 401 },
    );
  }
}

// DELETE APPLICATION
export async function DELETE(request, { params }) {
  try {
    await connectDB();
    authenticate(request);

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid application ID",
        },
        { status: 400 },
      );
    }

    const application = await Application.findByIdAndDelete(id);

    if (!application) {
      return NextResponse.json(
        {
          success: false,
          message: "Application not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Application deleted successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Delete application error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unauthorized or failed to delete application",
      },
      { status: 401 },
    );
  }
}
