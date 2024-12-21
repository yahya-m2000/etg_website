import Header from "@/components/Header";
import HeroImage from "@/components/home/HeroImage";
import Footer from "@/components/Footer";
import React from "react";
// import {
//   Share08Icon,
//   PrinterIcon,
//   Download04Icon,
//   Bookmark01Icon,
// } from "hugeicons-react";
import { fetchPublication, fetchPublications } from "@/lib/api/src/contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { richTextRenderOptions } from "@/lib/common/src/ui/richTextRenderOptions";
import { Metadata } from "next";
import Image from "next/image";

type Params = Promise<{
  slug: string;
}>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;

  // Fetch the publication data to generate dynamic metadata
  const publication = await fetchPublication("publication", slug);

  if (!publication) {
    return {
      title: "Insight Not Found",
    };
  }

  const title =
    typeof publication.title === "string" ? publication.title : "Default Title";
  const description =
    typeof publication.description === "string"
      ? publication.description
      : "No description available";

  const altText =
    typeof publication.title === "string"
      ? publication.title
      : "Default Alt Text"; // Ensure alt is a string

  return {
    title,
    description,
    openGraph: {
      title,
      siteName: "The Eastern Trade Group",
      type: "article",
      description,
      url: `https://www.theeasterntradegroup.com/insights/${slug}`,
      images: publication.heroImage
        ? [
            {
              url: publication.heroImage,
              width: 1200,
              height: 630,
              alt: altText,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      site: "https://www.theeasterntradegroup.com",
      title,
      description,
      images: publication.heroImage ? [publication.heroImage] : [],
    },
  };
}

export default async function Insight({ params }: { params: Params }) {
  const { slug } = await params; // Destructure slug from params
  const publication = await fetchPublication("publication", slug);
  const publicationsData = await fetchPublications("publication");
  console.log(publication);
  if (!publication) {
    return <div>404 - Insight not found</div>;
  }

  return (
    <div className="">
      <Header
        logo=""
        navItems={[""]}
        callToAction={[]}
        backgroundColor=""
        textColor="white"
        position="fixed"
        effects={true}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        data={publicationsData || []}
      />
      <div className="relative flex flex-col h-[100vh] justify-center">
        <HeroImage
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          insights={[publication]}
        />
      </div>
      <main className="relative h-auto bg-white text-black">
        <div className="flex flex-col z-20 px-10 lg:px-80 py-10 ">
          {/* Render Rich Text */}
          <div className="">
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-expect-error */}
            {documentToReactComponents(publication.body, richTextRenderOptions)}
          </div>
          <div className="flex flex-row items-center bg-gray-100 p-5 w-full max-w-md">
            {/* Author Image */}
            <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
              <Image
                src={publication.author?.photo || "/assets/image.png"} // Fallback to default profile photo
                alt={publication.author?.name || "Default Profile"}
                className="object-cover w-full h-full"
                width={100}
                height={100}
              />
            </div>

            {/* Author Info */}
            <div className="ml-5">
              <p className="text-sm text-gray-500">Author</p>
              <h4 className="text-lg font-semibold text-gray-800">
                {publication.author?.name}
              </h4>
              <p className="text-sm text-gray-500">
                {publication.author?.role}
              </p>
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </div>
  );
}
