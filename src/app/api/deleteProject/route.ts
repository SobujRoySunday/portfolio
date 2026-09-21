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
    const { deletedCount } = await projectModel.deleteOne({ _id: projectId });

    if (deletedCount === 0) {
      return NextResponse.json({ message: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Project deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json(
      { message: "Error deleting project" },
      { status: 500 }
    );
  }
}
