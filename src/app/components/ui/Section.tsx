"use client";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { richTextRenderOptions } from "@/lib/common/src/ui/richTextRenderOptions";
import Image from "next/image";
import clsx from "clsx";
import { useEffect, useRef } from "react";
import { getTextSizeClass } from "@/lib/common/src/utils";

const text = "text-black font-assistant";

type CallToAction = {
  label: string;
  url: string;
};

type SectionProps = {
  section: {
    id: number;
    title: string;
    body: any;
    quote?: boolean;
    author?: string;
    image?: string;
    callToActions?: CallToAction[];
  };
  isReversed?: boolean;
};

const Section: React.FC<SectionProps> = ({ section, isReversed }) => {
  const isRichText = section.body?.nodeType === "document";
  const hasImage = !!section.image;
  const isHighlighted = section.id === 1;
  const isQuote = section.quote === true;
  const backdropRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (backdropRef.current && imageRef.current) {
        const scrollPosition = window.scrollY;
        backdropRef.current.style.transform = `translateY(${
          scrollPosition * 0.2
        }px)`;
        imageRef.current.style.transform = `translateY(${
          scrollPosition * -0.1
        }px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      className={clsx(
        !isQuote &&
          "flex flex-col-reverse lg:flex-row lg:items-center lg:justify-between mb-8 py-12 lg:py-16 lg:align-middle",
        isReversed && "lg:flex-row-reverse",
        isHighlighted && "mb-16",
        isQuote && "flex flex-col items-center justify-center text-center mb-16"
      )}
    >
      {hasImage && isQuote && (
        <div className="flex flex-1 justify-center align-middle mb-2 order-first">
          <div ref={imageRef}>
            <Image
              src={section.image as string}
              alt={section.title}
              width={150}
              height={150}
              objectFit="cover"
              className={clsx(
                "transition-transform duration-500 ease-in-out transform group-hover:translate-y-[-10px] rounded-full w-[150px] h-[150px]"
              )}
            />
          </div>
        </div>
      )}

      <div className="flex-[0.50] w-full lg:pr-10 ">
        {/* Section Title and Subtitle */}
        <h2
          className={clsx(
            getTextSizeClass(isHighlighted, "text-2xl"),
            "font-semibold mb-2 text-primary",
            text
          )}
        >
          {section.title}
        </h2>

        {/* Section Body */}
        <div
          className={clsx(
            "flex flex-col my-10 lg:my-0",
            isHighlighted && "bg-opacity-90"
          )}
        >
          {isRichText ? (
            documentToReactComponents(section.body, richTextRenderOptions)
          ) : isQuote ? (
            <>
              <blockquote
                className={clsx(
                  " border-l-4 pl-4 text-primary border-primary",
                  getTextSizeClass(isHighlighted, "text-2xl"),
                  "font-semibold",
                  text
                )}
              >
                {section.body}
              </blockquote>
              <h6
                className={clsx(
                  getTextSizeClass(isHighlighted, "text-xl"),
                  "font-semibold mb-2 mt-4",
                  text
                )}
              >
                — {section.author}
              </h6>
            </>
          ) : (
            <p
              className={clsx(getTextSizeClass(isHighlighted, "text-lg"), text)}
            >
              {section.body}
            </p>
          )}
        </div>

        {section.callToActions && section.callToActions.length > 0 && (
          <div className="flex flex-wrap gap-4 mt-6">
            {section.callToActions.map((cta, index) => (
              <a
                key={index}
                href={cta.url}
                className="px-6 py-3 bg-secondary text-white hover:bg-primary transition-colors duration-300"
              >
                {cta.label}
              </a>
            ))}
          </div>
        )}
      </div>

      {hasImage && !isQuote && (
        <div
          className={clsx(
            "relative w-full h-[300px] lg:h-auto lg:min-h-[500px] lg:flex-[0.50] lg:mb-0 mb-[2vh] group"
          )}
        >
          <div
            ref={imageRef}
            // absolute inset-0
            className=" lg:w-[40vw] w-[100vw] h-[90%] mx-auto my-auto overflow-hidden"
          >
            <Image
              src={section.image ?? ""}
              alt={section.title}
              layout="fill"
              objectFit="cover"
              // className={clsx(
              //   "transition-transform duration-500 ease-in-out transform group-hover:translate-y-[-10px]"
              // )}
            />
            {/* Hover overlay */}
            {/* <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out flex items-end pb-10 justify-center bg-opacity-10 bg-black">
              <p
                className={clsx(
                  getTextSizeClass(isHighlighted, "text-lg"),
                  "text-white"
                )}
              >
                {isHighlighted ? "Highlighted Section" : "Placeholder Text"}
              </p>
            </div> */}
          </div>
        </div>
      )}
    </section>
  );
};

export default Section;
