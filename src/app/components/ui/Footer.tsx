"use client";
import React from "react";
import clsx from "clsx";
import { footerData } from "@/lib/constants";
import SocialMediaLinks from "../pages/insights/SocialMediaLinks";

type FooterProps = {
  isDark?: boolean;
};

const Footer: React.FC<FooterProps> = ({ isDark }) => {
  return (
    <footer
      className={clsx(isDark ? "bg-black" : "bg-background-paper", "py-8")}
    >
      <div className="main grid grid-cols-2 lg:grid-cols-4 gap-8">
        {footerData.map((section, idx) => (
          <div
            key={idx}
            // className={clsx(
            //   idx === 0 ? "lg:row-span-2" : "",
            //   idx === 2 ? "lg:row-span-2" : ""
            // )}
          >
            {/* Section Heading */}
            {/* <h4
              // className={clsx(
              //   "font-assistant font-bold uppercase text-lg mb-4",
              //   isDark ? "text-white" : "text-black"
              // )}
            >
              {section.heading}
            </h4> */}
            <ul>
              {section.links.map((link, linkIdx) => (
                <li key={linkIdx} className="mb-2">
                  <a
                    href={link.url}
                    className={clsx(
                      "font-assistant font-bold uppercase text-lg mb-4",
                      isDark ? "text-white" : "text-black"
                    )}
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="flex font-assistant px-[4vw] justify-between items-center">
        <p
          className={clsx(
            "font-assistant text-sm",
            isDark ? "text-white" : "text-black"
          )}
        >
          Copyright © 2024 The Eastern Trade Group LLC. All rights reserved.{" "}
          <a href="/privacy-policy" className="hover:underline font-bold">
            Privacy Policy{" "}
          </a>
          and{" "}
          <a href="/terms-of-service" className="hover:underline font-bold">
            Terms of Use
          </a>
        </p>

        <SocialMediaLinks title={""} heroImage={""} currentUrl={""} />
      </div>
    </footer>
  );
};

export default Footer;
