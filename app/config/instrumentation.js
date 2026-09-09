export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const connectDB = (await import("./app/config/db.js")).default;

    await connectDB();

    console.log("🚀 MongoDB is ready!");
  }
}