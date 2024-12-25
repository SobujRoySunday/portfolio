import { connectToMongoDB } from "@/lib/db";
import { projectModel } from "@/models";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToMongoDB();
    const projects = await projectModel.find({});
    return NextResponse.json(
      { message: "Projects fetched successfully", projects },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { message: "Error fetching projects" },
      { status: 500 }
    );
  }
}
