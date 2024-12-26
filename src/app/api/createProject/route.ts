import { projectModel } from "@/models";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // check if the user is logged in
    const authToken = request.cookies.get("authToken")?.value;
    if (!authToken) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const projectData = (await request.json()).projectData;

    // create a new project
    const newProject = new projectModel(projectData);
    await newProject.save();

    return NextResponse.json(
      { message: "Project created successfully", project: newProject },
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
