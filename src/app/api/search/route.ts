import { NextResponse } from "next/server";
import { fetchPublications } from "@/lib/api/src/contentful";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json(
      { message: "Query parameter is required." },
      { status: 400 }
    );
  }

  try {
    const publications = await fetchPublications("publication");

    const filteredResults = publications.filter((pub) =>
      pub.title.toLowerCase().includes(query.toLowerCase())
    );

    return NextResponse.json(filteredResults, { status: 200 });
  } catch (error) {
    console.error("Error fetching search results:", error);
    return NextResponse.json(
      { message: "Error fetching search results." },
      { status: 500 }
    );
  }
}
