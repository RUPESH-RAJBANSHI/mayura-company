import { NextResponse } from "next/server";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

import connectDB from "../../../config/db";
import Product from "../../config/models/Product";

// ============================
// GET SINGLE PRODUCT
// ============================
export async function GET(request, { params }) {
  try {
    await connectDB();

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

    jwt.verify(token, process.env.JWT_SECRET);

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid product ID",
        },
        { status: 400 },
      );
    }

    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          message: "Product not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        product,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Get single product error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch product",
      },
      { status: 500 },
    );
  }
}

// ============================
// UPDATE PRODUCT
// ============================
export async function PUT(request, { params }) {
  try {
    await connectDB();

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

    jwt.verify(token, process.env.JWT_SECRET);

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid product ID",
        },
        { status: 400 },
      );
    }

    const body = await request.json();

    const { name, description, category, technologies, productUrl, status } =
      body;

    if (!name || !description || !category || !technologies) {
      return NextResponse.json(
        {
          success: false,
          message: "Name, description, category and technologies are required.",
        },
        { status: 400 },
      );
    }

    const product = await Product.findByIdAndUpdate(
      id,
      {
        name,
        description,
        category,
        technologies,
        productUrl: productUrl || "",
        status: status ?? true,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          message: "Product not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Product updated successfully",
        product,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Update product error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update product",
      },
      { status: 500 },
    );
  }
}

// ============================
// DELETE PRODUCT
// ============================
export async function DELETE(request, { params }) {
  try {
    await connectDB();

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

    jwt.verify(token, process.env.JWT_SECRET);

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid product ID",
        },
        { status: 400 },
      );
    }

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          message: "Product not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Product deleted successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Delete product error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete product",
      },
      { status: 500 },
    );
  }
}
