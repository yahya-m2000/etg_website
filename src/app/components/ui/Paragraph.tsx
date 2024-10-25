"use client";
import React from "react";
import clsx from "clsx";
import { getTextSizeClass } from "@/lib/common/src/utils";

const Paragraph: React.FC<ParagraphProps> = ({
  title,
  body,
  image,
  isReversed = false,
  isCentered = false,
  buttonUrl,
}) => {
  return (
    <div
      className={clsx("main py-0 flex flex-wrap h-auto", {
        "flex-col": buttonUrl && isCentered,
        "lg:flex-row-reverse": isReversed,
        "lg:flex-row": !isReversed,
        "md:flex-col-reverse": true,
      })}
    >
      {/* Text Section */}
      <div
        className={clsx("flex flex-col flex-[1] justify-center lg:mr-12 ml-0", {
          "lg:mx-auto mx-0": isCentered,
          "md:flex-[0.66]": image,
        })}
      >
        <h2
          className={clsx(
            getTextSizeClass(true, "font-semibold text-3xl text-subtitle mb-4"),
            {
              "text-center": isCentered,
            }
          )}
        >
          {title}
        </h2>
        <p
          className={clsx(
            getTextSizeClass(
              true,
              "font-assistant md:text-lg text-lg text-black"
            ),
            {
              "mx-auto md:max-w-[50vw]": isCentered, // Center text with max width control
            }
          )}
        >
          {body}
        </p>
      </div>

      {/* Image Section */}
      {image && (
        <div
          className="flex-[0.33] rounded-md min-h-[200px] md:mb-[10px] w-full bg-cover bg-center hidden md:block"
          style={{ backgroundImage: `url(${image})` }}
        />
      )}
    </div>
  );
};

export default Paragraph;
