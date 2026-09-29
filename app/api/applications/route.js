import { NextResponse } from "next/server";
import connectDB from "../../config/db";
import Application from "../../config/models/Application";
import Career from "../../config/models/Career";
import jwt from "jsonwebtoken";

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

// GET ALL APPLICATIONS (ADMIN ONLY)
export async function GET(request) {
  try {
    await connectDB();
    authenticate(request);

    const applications = await Application.find()
      .populate({
        path: "career",
        select: "title department location employmentType deadline",
        model: "Career",
      })
      .sort({ createdAt: -1 });

    return NextResponse.json(
      {
        success: true,
        count: applications.length,
        applications,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Get applications error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unauthorized or failed to fetch applications",
      },
      { status: 401 },
    );
  }
}

// SUBMIT JOB APPLICATION (PUBLIC)
export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    const { career, applicantName, email, phone, coverLetter, resumeUrl } =
      body;

    if (!career || !applicantName?.trim() || !email?.trim() || !phone?.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Career, applicant name, email, and phone are required.",
        },
        { status: 400 },
      );
    }

    const vacancy = await Career.findById(career);

    if (!vacancy || !vacancy.status) {
      return NextResponse.json(
        {
          success: false,
          message: "This vacancy is not available for applications.",
        },
        { status: 404 },
      );
    }

    if (new Date(vacancy.deadline) < new Date()) {
      return NextResponse.json(
        {
          success: false,
          message: "The application deadline has passed.",
        },
        { status: 400 },
      );
    }

    const application = await Application.create({
      career,
      applicantName,
      email,
      phone,
      coverLetter: coverLetter || "",
      resumeUrl: resumeUrl || "",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Job application submitted successfully.",
        application,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Submit application error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to submit job application.",
      },
      { status: 500 },
    );
  }
}
