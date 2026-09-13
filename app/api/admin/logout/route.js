import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const response = NextResponse.json(
      {
        success: true,
        message: "Admin logged out successfully",
      },
      { status: 200 },
    );

    // Delete the JWT cookie
    response.cookies.set("adminToken", "", {
      httpOnly: true,
      expires: new Date(0),
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Logout error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Logout failed",
      },
      { status: 500 },
    );
  }
}
