import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { requireAuth } from "@/lib/auth";

const ALLOWED_MIME_TYPES = ["image/png", "image/jpeg", "image/webp", "image/gif"];
const MAX_BYTES = 5 * 1024 * 1024;

const DATA_URL_PATTERN = /^data:([a-z]+\/[a-z0-9.+-]+);base64,([A-Za-z0-9+/=]+)$/i;

export async function POST(request: NextRequest) {
  const unauthorized = requireAuth(request);
  if (unauthorized) return unauthorized;

  try {
    const { image } = await request.json();

    if (typeof image !== "string" || image.length === 0) {
      return NextResponse.json({ error: "Image is required" }, { status: 400 });
    }

    const match = DATA_URL_PATTERN.exec(image);
    if (!match) {
      return NextResponse.json(
        { error: "Image must be a base64 data URL" },
        { status: 400 }
      );
    }

    const [, mimeType, base64Data] = match;
    if (!ALLOWED_MIME_TYPES.includes(mimeType.toLowerCase())) {
      return NextResponse.json(
        { error: `Unsupported image type: ${mimeType}` },
        { status: 400 }
      );
    }

    // Decoded length without materialising the buffer.
    const padding = base64Data.endsWith("==") ? 2 : base64Data.endsWith("=") ? 1 : 0;
    const byteLength = (base64Data.length * 3) / 4 - padding;
    if (byteLength > MAX_BYTES) {
      return NextResponse.json(
        { error: `Image must be smaller than ${MAX_BYTES / (1024 * 1024)}MB` },
        { status: 413 }
      );
    }

    const uploadedImage = await cloudinary.uploader.upload(image, {
      folder: "portfolio",
      resource_type: "image",
    });

    return NextResponse.json({ url: uploadedImage.secure_url });
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
