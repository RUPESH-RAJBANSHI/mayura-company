import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import connectDB from "../../../config/db";
import Meeting from "../../../config/models/Meeting";

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

// GET - Get single meeting
export async function GET(request, { params }) {
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

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid meeting ID",
        },
        { status: 400 },
      );
    }

    const meeting = await Meeting.findById(id);

    if (!meeting) {
      return NextResponse.json(
        {
          success: false,
          message: "Meeting not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        meeting,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Get single meeting error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch meeting",
      },
      { status: 500 },
    );
  }
}

// PUT - Update meeting
export async function PUT(request, { params }) {
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

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid meeting ID",
        },
        { status: 400 },
      );
    }

    const body = await request.json();

    const allowedStatuses = ["Pending", "Confirmed", "Completed", "Cancelled"];

    if (body.status && !allowedStatuses.includes(body.status)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid status",
        },
        { status: 400 },
      );
    }

    const meeting = await Meeting.findByIdAndUpdate(
      id,
      {
        ...(body.name !== undefined && { name: body.name }),
        ...(body.email !== undefined && { email: body.email }),
        ...(body.phone !== undefined && { phone: body.phone }),
        ...(body.company !== undefined && {
          company: body.company,
        }),
        ...(body.date !== undefined && { date: body.date }),
        ...(body.time !== undefined && { time: body.time }),
        ...(body.subject !== undefined && {
          subject: body.subject,
        }),
        ...(body.message !== undefined && {
          message: body.message,
        }),
        ...(body.status !== undefined && {
          status: body.status,
        }),
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!meeting) {
      return NextResponse.json(
        {
          success: false,
          message: "Meeting not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Meeting updated successfully",
        meeting,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Update meeting error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update meeting",
      },
      { status: 500 },
    );
  }
}

// DELETE - Delete meeting
export async function DELETE(request, { params }) {
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

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid meeting ID",
        },
        { status: 400 },
      );
    }

    const meeting = await Meeting.findByIdAndDelete(id);

    if (!meeting) {
      return NextResponse.json(
        {
          success: false,
          message: "Meeting not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Meeting deleted successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Delete meeting error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete meeting",
      },
      { status: 500 },
    );
  }
}
