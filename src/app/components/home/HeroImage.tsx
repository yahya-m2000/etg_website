"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { formatDate, getPublicationUrl } from "@/lib/common/src/utils";
import Link from "next/link";

export default function HeroImage({ insights }: { insights: Publications[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (currentIndex < insights.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex(0);
      }
    }, 10000);

    return () => clearInterval(intervalId);
  }, [currentIndex, insights.length]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (type: string, title: string) => {
    const kebabCaseTitle = title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    window.location.href = `/${type}/${kebabCaseTitle}`;
  };

  const calculateOpacity = () => {
    const maxOpacityScroll = 300;
    const opacity = Math.max(0, 1 - scrollY / maxOpacityScroll);
    return opacity;
  };

  return (
    <>
      <div className={"fixed top-0 left-0 right-0 h-screen min-h-[500px] z-0"}>
        <div className="absolute inset-0 bg-black z-10 bg-opacity-75 mix-blend-multiply" />
        {insights.map((insight, i) => (
          <div
            key={i}
            style={{ display: i === currentIndex ? "block" : "none" }}
          >
            <Image
              className="object-cover saturate-50"
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-expect-error
              src={insight.heroImage}
              alt={`Background image for ${insight.title}`}
              fill
            />
          </div>
        ))}
      </div>

      <div
        className={`relative z-10 flex flex-col justify-center  ${
          isHomePage
            ? " px-10 md:px-20 lg:w-[50vw] min-h-[800px] h-screen lg:items-start items-center "
            : "h-screen items-center "
        }`}
      >
        {insights.map((insight, i) => (
          <div key={i}>
            {i === currentIndex && (
              <div
                className={`text-white ${
                  isHomePage
                    ? ""
                    : "items-center flex flex-col transition-transform transform-gpu duration-700 ease-in-out"
                }`}
                style={{
                  transform: !isHomePage ? "translateY(20px)" : "",
                  opacity: !isHomePage ? calculateOpacity() : 1,
                }}
              >
                <p
                  className={`font-inter font-bold uppercase ${
                    isHomePage ? "mb-2.5" : "hidden"
                  }`}
                  style={{ opacity: !isHomePage ? calculateOpacity() : 1 }}
                >
                  {insight.type.slice(0, -1)}
                </p>
                <Link
                  href={getPublicationUrl(
                    insight.type + "s",
                    insight.title,
                    insight.id
                  )}
                  key={insight.id}
                >
                  <h4
                    className={`font-bitter font-extrabold text-5xl cursor-pointer  ${
                      isHomePage
                        ? "mb-2.5 hover:underline"
                        : "transition-opacity duration-500 text-center mb-2.5 "
                    }`}
                    style={{ opacity: !isHomePage ? calculateOpacity() : 1 }}
                    onClick={() =>
                      handleClick(insight.type + "s", insight.title)
                    }
                  >
                    {insight.title}
                  </h4>
                </Link>
                <p
                  className={`font-inter font-light italic ${
                    isHomePage ? "" : "hidden"
                  }`}
                  style={{ opacity: !isHomePage ? calculateOpacity() : 1 }}
                >
                  {insight.description}
                </p>
                <div className={`flex ${isHomePage ? "flex-col" : "flex-row"}`}>
                  <p
                    className={`font-inter font-light ${
                      isHomePage ? "hidden" : "mr-2.5"
                    }`}
                    style={{ opacity: !isHomePage ? calculateOpacity() : 1 }}
                  >
                    {insight.author}
                  </p>
                  <p
                    className={`font-inter font-light  ${
                      isHomePage ? "mb-2.5 italic" : ""
                    }`}
                    style={{ opacity: !isHomePage ? calculateOpacity() : 1 }}
                  >
                    {formatDate(insight.date)}
                  </p>
                </div>
                {/* {isHomePage && (
                  <Button
                    outline
                    size="heroImage"
                    title={"Learn More"}
                    color="white"
                    onClick={() =>
                      handleClick(insight.type + "s", insight.title)
                    }
                  />
                )} */}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
