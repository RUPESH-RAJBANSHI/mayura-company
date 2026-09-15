import { NextResponse } from "next/server";
import connectDB from "../../config/db";

import jwt from "jsonwebtoken";
import Product from "../../config/models/product";

// ============================
// GET ALL PRODUCTS
// ============================
export async function GET(request) {
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

    const products = await Product.find().sort({
      createdAt: -1,
    });

    return NextResponse.json(
      {
        success: true,
        count: products.length,
        products,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Get products error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch products",
      },
      { status: 500 },
    );
  }
}

// ============================
// CREATE PRODUCT
// ============================
export async function POST(request) {
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

    const product = await Product.create({
      name,
      description,
      category,
      technologies,
      productUrl: productUrl || "",
      status: status ?? true,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Product created successfully",
        product,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Create product error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create product",
      },
      { status: 500 },
    );
  }
}
