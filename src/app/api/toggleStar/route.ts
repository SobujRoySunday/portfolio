import { requireAuth } from "@/lib/auth";
import { connectToMongoDB } from "@/lib/db";
import { isValidObjectId } from "@/lib/validate";
import { projectModel } from "@/models";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const unauthorized = requireAuth(request);
  if (unauthorized) return unauthorized;

  try {
    const { projectId } = await request.json();

    if (!isValidObjectId(projectId)) {
      return NextResponse.json({ message: "Invalid project id" }, { status: 400 });
    }

    await connectToMongoDB();
    const project = await projectModel.findById(projectId);

    if (!project) {
      return NextResponse.json({ message: "Project not found" }, { status: 404 });
    }

    project.isStarred = !project.isStarred;
    await project.save();

    return NextResponse.json(
      { message: "Star toggled successfully", project },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error toggling star:", error);
    return NextResponse.json(
      { message: "Error toggling star" },
      { status: 500 }
    );
  }
}
