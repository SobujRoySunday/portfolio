import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export const POST = async (req: Request) => {
  try {
    const { image } = await req.json();

    if (!image) {
      return NextResponse.json({ error: "Image is required" }, { status: 400 });
    }

    const uploadedImage = await cloudinary.uploader.upload(image, {
      folder: "portfolio", // Optional: Organize your uploads
    });

    return NextResponse.json({ url: uploadedImage.secure_url });
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
};
