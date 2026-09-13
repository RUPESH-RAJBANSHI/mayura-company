import { NextResponse } from "next/server";
import connectDB from "../../../config/db";
import Admin from "../../../config/models/Admin";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export async function GET(request, { params }) {
  try {
    await connectDB();

    // Check JWT token
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

    // Verify token
    jwt.verify(token, process.env.JWT_SECRET);

    // Get admin ID from URL
    const { id } = await params;

    // Validate MongoDB ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid admin ID",
        },
        { status: 400 },
      );
    }

    // Find admin by ID and hide password
    const admin = await Admin.findById(id).select("-password");

    if (!admin) {
      return NextResponse.json(
        {
          success: false,
          message: "Admin not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        admin,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Get single admin error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch admin",
      },
      { status: 500 },
    );
  }
}
{
  /* PUT method to update a single admin by ID */
}
export async function PUT(request, { params }) {
  try {
    await connectDB();

    // Check JWT token
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
    jwt.verify(token, process.env.JWT_SECRET);

    // Get admin ID from URL
    const { id } = await params;

    // Validate MongoDB ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid admin ID",
        },
        { status: 400 },
      );
    }

    // Get data from request body
    const { name, email, role, status } = await request.json();

    // Find and update admin
    const updatedAdmin = await Admin.findByIdAndUpdate(
      id,
      {
        name,
        email,
        role,
        status,
      },
      {
        returnDocument: "after",
        runValidators: true,
      },
    ).select("-password");

    // Admin not found
    if (!updatedAdmin) {
      return NextResponse.json(
        {
          success: false,
          message: "Admin not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Admin updated successfully",
        admin: updatedAdmin,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Update admin error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update admin",
      },
      { status: 500 },
    );
  }
}

{
  /* DELETE method to delete a single admin by ID */
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();

    // Check JWT token
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
    jwt.verify(token, process.env.JWT_SECRET);

    // Get admin ID from URL
    const { id } = await params;

    // Validate MongoDB ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid admin ID",
        },
        { status: 400 },
      );
    }

    // Find and delete admin
    const deletedAdmin = await Admin.findByIdAndDelete(id);

    // Admin not found
    if (!deletedAdmin) {
      return NextResponse.json(
        {
          success: false,
          message: "Admin not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Admin deleted successfully",
        admin: {
          id: deletedAdmin._id,
          name: deletedAdmin.name,
          email: deletedAdmin.email,
          role: deletedAdmin.role,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Delete admin error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete admin",
      },
      { status: 500 },
    );
  }
}
