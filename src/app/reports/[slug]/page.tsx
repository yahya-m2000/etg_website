import Header from "@/components/Header";
import HeroImage from "@/components/home/HeroImage";
import Footer from "@/components/Footer";
import React from "react";
import {
  Share08Icon,
  PrinterIcon,
  Download04Icon,
  Bookmark01Icon,
} from "hugeicons-react";
import { fetchPublication, fetchPublications } from "@/lib/api/src/contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { richTextRenderOptions } from "@/lib/common/src/ui/richTextRenderOptions";

interface ReportProps {
  params: { slug: string }; // Explicitly define params type
}

export default async function Report({ params }: ReportProps) {
  const { slug } = params; // Destructure slug from params
  const publication = await fetchPublication("publication", slug);
  const publicationsData = await fetchPublications("publication");

  if (!publication) {
    return <div>404 - Insight not found</div>;
  }

  return (
    <div className="">
      <Header
        logo=""
        navItems={[""]}
        callToAction={["Learn More", "Get Started"]}
        backgroundColor=""
        textColor="white"
        position="fixed"
        effects={true}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        data={publicationsData || []}
      />
      <div className="relative flex flex-col h-[100vh] justify-center">
        <HeroImage
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          insights={[publication]}
        />
      </div>
      <main className="relative h-auto bg-white text-black">
        <div className=" z-20 px-0 md:px-40 py-10 ">
          <div className="flex flex-row py-5 text-slate-400 text-xs justify-center">
            {/* Share Icon */}
            <div className="flex flex-col items-center mr-2.5">
              <Share08Icon size={18} className="mb-2.5" />
              <p className="">Share</p>
            </div>

            {/* Print Icon */}
            <div className="flex flex-col items-center mr-2.5">
              <PrinterIcon size={18} className="mb-2.5" />
              <p className="">Print</p>
            </div>

            {/* Download Icon */}

            <a
              className="flex flex-col items-center mr-2.5"
              download
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              href={publication.pdfDownload}
            >
              <Download04Icon size={18} className="mb-2.5" />

              <p className="">Download</p>
            </a>

            {/* Save Icon */}
            <div className="flex flex-col items-center mr-2.5">
              <Bookmark01Icon size={18} className="mb-2.5" />
              <p className="">Save</p>
            </div>
          </div>
          {/* Render Rich Text */}
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment*/}
          {/* @ts-ignore */}
          <div className="">
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-expect-error */}
            {documentToReactComponents(publication.body, richTextRenderOptions)}
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
}
