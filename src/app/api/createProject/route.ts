import { requireAuth } from "@/lib/auth";
import { connectToMongoDB } from "@/lib/db";
import { validateProjectInput } from "@/lib/validate";
import { projectModel } from "@/models";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const unauthorized = requireAuth(request);
  if (unauthorized) return unauthorized;

  try {
    const body = await request.json();
    const validated = validateProjectInput(body?.projectData);
    if (!validated.ok) {
      return NextResponse.json({ message: validated.error }, { status: 400 });
    }

    await connectToMongoDB();
    const newProject = await projectModel.create(validated.value);

    return NextResponse.json(
      { message: "Project created successfully", project: newProject },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { message: "Error creating project" },
      { status: 500 }
    );
  }
}
