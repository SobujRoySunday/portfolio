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

    const projectId = (await request.json()).projectId;

    // toggle the star for the project
    await connectToMongoDB();
    const project = await projectModel.findOne({ _id: projectId });
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
