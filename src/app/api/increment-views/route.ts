import { NextResponse } from "next/server";
import { incrementViews } from "@/lib/api/src/contentful";

export async function POST(request: Request) {
  try {
    const { publicationId } = await request.json();

    if (!publicationId) {
      return NextResponse.json({ message: "Missing publication ID" }, { status: 400 });
    }

    // Call the function to increment views
    const updatedViews = await incrementViews(publicationId);

    return NextResponse.json({ success: true, views: updatedViews });
  } catch (error) {
    console.error("Error incrementing views:", error);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
