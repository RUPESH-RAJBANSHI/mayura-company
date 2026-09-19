import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import connectDB from "../../../config/db";
import Query from "../../../config/models/Query";

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

// GET - Get single query
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
          message: "Invalid query ID",
        },
        { status: 400 },
      );
    }

    const query = await Query.findById(id);

    if (!query) {
      return NextResponse.json(
        {
          success: false,
          message: "Query not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        query,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Get single query error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch query",
      },
      { status: 500 },
    );
  }
}

// PUT - Update query
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
          message: "Invalid query ID",
        },
        { status: 400 },
      );
    }

    const body = await request.json();

    const allowedStatuses = ["New", "Read", "Replied"];

    if (body.status && !allowedStatuses.includes(body.status)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid status",
        },
        { status: 400 },
      );
    }

    const query = await Query.findByIdAndUpdate(
      id,
      {
        ...(body.name !== undefined && { name: body.name }),
        ...(body.email !== undefined && { email: body.email }),
        ...(body.phone !== undefined && { phone: body.phone }),
        ...(body.subject !== undefined && { subject: body.subject }),
        ...(body.message !== undefined && { message: body.message }),
        ...(body.status !== undefined && { status: body.status }),
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!query) {
      return NextResponse.json(
        {
          success: false,
          message: "Query not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Query updated successfully",
        query,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Update query error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update query",
      },
      { status: 500 },
    );
  }
}

// DELETE - Delete query
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
          message: "Invalid query ID",
        },
        { status: 400 },
      );
    }

    const query = await Query.findByIdAndDelete(id);

    if (!query) {
      return NextResponse.json(
        {
          success: false,
          message: "Query not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Query deleted successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Delete query error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete query",
      },
      { status: 500 },
    );
  }
}
