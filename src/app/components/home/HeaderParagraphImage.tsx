"use client";
import Image from "next/image";
import React from "react";
import Button from "../Button";

type Props = {
  title?: string;
  body: string;
  image: string;
  reversed?: boolean;
  callToAction?: () => void;
  quote?: boolean; // New prop to determine if the body is a quote
};

const HeaderParagraphImage = (props: Props) => {
  let preTitle = "";
  let boldTitle = "";
  let postTitle = "";

  if (props.title) {
    [preTitle, boldTitle, postTitle] = props.title.split("|");
  }

  // Function to highlight "THE EASTERN TRADE GROUP" in the body text
  const highlightText = (text: string, highlight: string) => {
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return parts.map((part, index) => {
      if (part.toLowerCase() === highlight.toLowerCase()) {
        return (
          <span key={index} className="font-bold">
            {part}
          </span>
        );
      } else {
        return <React.Fragment key={index}>{part}</React.Fragment>;
      }
    });
  };

  // Function to split the body text into a quote and author if applicable
  const splitBody = (text: string) => {
    // Use a regex to match any hyphen-like character followed by some text indicating an author.
    const delimiterRegex = /\s*[-–—]\s*(.+)/;
    const match = text.match(delimiterRegex);

    if (match) {
      const quote = text.slice(0, match.index).trim(); // Get text before the match (the quote)
      const author = match[1].trim(); // Get the author (text after the hyphen)
      return { quote, author };
    }
    return { quote: text, author: "" };
  };

  // Determine the quote and author if the quote prop is true
  const { quote, author } = props.quote
    ? splitBody(props.body)
    : { quote: props.body, author: "" };

  return (
    <div
      className={`flex lg:h-[600px] h-[1000px] ${
        props.reversed ? "lg:flex-row" : "lg:flex-row-reverse"
      } flex-col-reverse lg:border-b-[0px] border-b-[10px] border-primary`}
    >
      <div className="relative flex flex-1">
        <div className="absolute inset-0 bg-primary z-10 bg-opacity-30 mix-blend-hue" />
        <div className="absolute inset-0 bg-gray-900 z-10 bg-opacity-25 mix-blend-multiply" />
        <Image
          src={props.image}
          fill
          alt={"Hero image for the article"}
          className="z-0 object-cover contrast-more:"
          priority
        />
      </div>
      <div className="flex flex-col flex-1 z-10 justify-center">
        <div className="p-10 md:p-20">
          {props.title && (
            <h4 className="flex flex-col font-bitter font-light text-6xl mb-5">
              {preTitle}
              {boldTitle && <span className=" font-bold">{boldTitle}</span>}
              {postTitle}
            </h4>
          )}

          {/* Render quote or body based on the `quote` prop */}
          {props.quote ? (
            <div className="flex flex-col text-xl mb-5 text-justify">
              <div className="text-6xl mb-2 text-primary font-light">“</div>
              <p>{highlightText(quote, "THE EASTERN TRADE GROUP")}</p>
              {author && (
                <p className="mt-5 font-light italic text-primary">
                  — {author}
                </p>
              )}
            </div>
          ) : (
            <p className="text-xl mb-5 text-justify">
              {highlightText(props.body, "THE EASTERN TRADE GROUP")}
            </p>
          )}

          {props.callToAction && (
            <div className="flex flex-row">
              <Button
                outline={true}
                size="large"
                color="primary"
                onClick={props.callToAction}
                title="Learn More"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeaderParagraphImage;
