import { BLOCKS, Node, INLINES, MARKS } from "@contentful/rich-text-types";
import Image from "next/image";
import React from "react";

export const richTextRenderOptions = {
  renderNode: {
    [BLOCKS.HEADING_1]: (_node: Node, children: React.ReactNode) => (
      <h1 className="font-bitter text-5xl  text-foreground mb-5">{children}</h1>
    ),
    [BLOCKS.HEADING_2]: (_node: Node, children: React.ReactNode) => (
      <h2 className="font-bitter text-4xl  text-foreground mb-5">{children}</h2>
    ),
    [BLOCKS.HEADING_3]: (_node: Node, children: React.ReactNode) => (
      <h3 className="font-bitter text-3xl  text-foreground mb-5">{children}</h3>
    ),
    [BLOCKS.HEADING_4]: (_node: Node, children: React.ReactNode) => (
      <h4 className="font-bitter text-2xl  text-foreground mb-5">{children}</h4>
    ),

    [BLOCKS.HEADING_5]: (_node: Node, children: React.ReactNode) => (
      <h5 className="font-bitter text-xl  text-foreground mb-5">{children}</h5>
    ),

    [BLOCKS.PARAGRAPH]: (_node: Node, children: React.ReactNode) => (
      <p
        className="font-inter md:text-justify leading-relaxed text-foreground font-light mb-5 "
        style={{ whiteSpace: "pre-wrap" }}
      >
        {children}
      </p>
    ),

    [BLOCKS.UL_LIST]: (_node: Node, children: React.ReactNode) => (
      <ul className="list-disc pl-10 mb-5">{children}</ul>
    ),
    [BLOCKS.OL_LIST]: (_node: Node, children: React.ReactNode) => (
      <ol className="list-disc pl-10 mb-5">{children}</ol>
    ),
    [BLOCKS.LIST_ITEM]: (_node: Node, children: React.ReactNode) => (
      <li className="mb-2">{children}</li>
    ),

    [BLOCKS.HR]: () => <hr className="border-t-2 border-gray-300 my-10" />,

    [INLINES.HYPERLINK]: (node: Node, children: React.ReactNode) => {
      const { uri } = node.data;
      return (
        <a href={uri} className="relative text-blue-600">
          {children}
        </a>
      );
    },
    [BLOCKS.QUOTE]: (_node: Node, children: React.ReactNode) => (
      <blockquote className="text-pink-700 font-semibold border-l-4 border-pink-700  float-start  pr-[2vh] ">
        {children}
      </blockquote>
    ),
    [BLOCKS.EMBEDDED_ASSET]: (node: Node) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { file, title, description } = (node.data.target as any).fields;
      return (
        <div className="my-[1vh] border-b-[1px] border-slate-300 flex  flex-col md:w-full h-[auto] w-full  ">
          <Image
            src={`https:${file.url}`}
            alt={description || title || "Default alt text"}
            width={1000}
            height={1000}
            className="object-cover"
          />
          <p className="font-inter font-extralight italic text-sm md:text-justify leading-relaxed text-foreground m-1 ">
            {description}
          </p>
        </div>
      );
    },

    // Default for inline styles (fallback)
    [INLINES.EMBEDDED_ENTRY]: (_node: Node, children: React.ReactNode) => (
      <span className="font-inter text-foreground">{children}</span>
    ),
  },
  renderMark: {
    [MARKS.BOLD]: (text: React.ReactNode) => (
      <strong className="font-semibold">{text}</strong>
    ),
    [MARKS.ITALIC]: (text: React.ReactNode) => (
      <em className="italic">{text}</em>
    ),
    [MARKS.UNDERLINE]: (text: React.ReactNode) => (
      <span className="underline">{text}</span>
    ),
    [MARKS.CODE]: (text: React.ReactNode) => (
      <code className="bg-gray-100 text-red-600 p-1 rounded">{text}</code>
    ),
    [MARKS.SUPERSCRIPT]: (text: React.ReactNode) => (
      <sup className="[margin-bottom:0!important] [vertical-align:super!important] [font-size:0.75rem!important] [line-height:1!important]">
        {text}
      </sup>
    ),
    [MARKS.SUBSCRIPT]: (text: React.ReactNode) => (
      <sub className="[margin-bottom:0!important] [vertical-align:sub!important] [font-size:0.75rem!important] [line-height:1!important]">
        {text}
      </sub>
    ),

    [MARKS.STRIKETHROUGH]: (text: React.ReactNode) => (
      <del className="line-through">{text}</del>
    ),
  },
};
