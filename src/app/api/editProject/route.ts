import { requireAuth } from "@/lib/auth";
import { connectToMongoDB } from "@/lib/db";
import { isValidObjectId, validateProjectInput } from "@/lib/validate";
import { projectModel } from "@/models";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const unauthorized = requireAuth(request);
  if (unauthorized) return unauthorized;

  try {
    const { projectId, projectData } = await request.json();

    if (!isValidObjectId(projectId)) {
      return NextResponse.json({ message: "Invalid project id" }, { status: 400 });
    }

    const validated = validateProjectInput(projectData);
    if (!validated.ok) {
      return NextResponse.json({ message: validated.error }, { status: 400 });
    }

    await connectToMongoDB();
    const project = await projectModel.findByIdAndUpdate(
      projectId,
      validated.value,
      { new: true, runValidators: true }
    );

    if (!project) {
      return NextResponse.json({ message: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Project edited successfully", project },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error editing project:", error);
    return NextResponse.json(
      { message: "Error editing project" },
      { status: 500 }
    );
  }
}
