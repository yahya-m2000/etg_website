"use client";
import React, { useState } from "react";
import clsx from "clsx";
import Paragraph from "@/components/ui/Paragraph";
import { getTextSizeClass } from "@/lib/common/src/utils";

type ContentTabsProps = {
  aboutUsData: {
    title: string;
    body: string;
    image?: string;
  }[];
};

const ContentTabs: React.FC<ContentTabsProps> = ({ aboutUsData }) => {
  // State to track selected tab; default to the first tab
  const [selectedTab, setSelectedTab] = useState<string>(aboutUsData[0]?.title);

  return (
    <div className="flex min-h-[50vh] flex-row items-center">
      {/* Title Tabs */}
      <div className="w-1/4 border-r border-gray-200">
        {aboutUsData.map((section, index) => (
          <div
            key={index}
            className={clsx(
              getTextSizeClass(false, "text-lg"),
              "truncate",
              "p-4 cursor-pointer",
              selectedTab === section.title
                ? "text-primary font-bold"
                : "text-gray-500",
              "hover:text-primary"
            )}
            onClick={() => setSelectedTab(section.title)}
          >
            {section.title}
          </div>
        ))}
      </div>

      {/* Content Section */}
      <div className="w-3/4 ">
        {aboutUsData.map(
          (section, index) =>
            selectedTab === section.title && (
              <Paragraph
                key={index}
                title={section.title}
                body={section.body}
                image={section.image ?? ""}
                isReversed={false}
                isCentered={false}
              />
            )
        )}
      </div>
    </div>
  );
};

export default ContentTabs;
