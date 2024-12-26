import { connectToMongoDB } from "@/lib/db";
import { projectModel } from "@/models";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // check if the user is logged in
    const authToken = request.cookies.get("authToken")?.value;
    if (!authToken) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();
    const projectId = data.projectId;
    const projectData = data.projectData;

    // edit the project
    await connectToMongoDB();
    const project = await projectModel.findOne({ _id: projectId });
    project.name = projectData.name;
    project.description = projectData.description;
    project.image = projectData.image;
    project.url = projectData.url;
    await project.save();

    return NextResponse.json(
      { message: "Project edited successfully" },
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
