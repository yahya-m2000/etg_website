"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { Menu04Icon } from "hugeicons-react";
import Drawer from "./Drawer";
import Link from "next/link";

const ICON_SIZE = 24;

interface Props {
  logo?: string;
  navItems: string[];
  callToAction?: string[];
  backgroundColor: string;
  position: string;
  textColor: string;
  effects?: boolean;
  data: Publications[]; // Use the Publications type here
}

const Header: React.FC<Props> = ({
  logo,
  backgroundColor,
  position,
  textColor,
  effects,
  data,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [hoveredType, setHoveredType] = useState<string | null>(null);

  const filteredData = Array.isArray(data)
    ? data.filter(
        (item) =>
          Array.isArray(item.type) &&
          item.type.some(
            (t: string) => t.toLowerCase() === (hoveredType || "").toLowerCase()
          )
      )
    : hoveredType
    ? [data].filter(
        (item) =>
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          Array.isArray(item.type) &&
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          item.type.some(
            (t: string) => t.toLowerCase() === (hoveredType || "").toLowerCase()
          )
      )
    : [];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.1);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDrawer = () => {
    setOpenDrawer(!openDrawer);
    setHoveredType("");
  };

  return (
    <div
      className={`z-50 flex flex-1 fixed top-0 left-0 w-full items-center py-5 px-10 md:px-20 transition-all duration-200 ${
        scrolled && effects
          ? "bg-white border-b-[1px] border-black border-opacity-20"
          : `bg-${backgroundColor}`
      } ${position} ${effects ? "transition-duration-1000" : ""}`}
    >
      <div className="flex">
        <Menu04Icon
          size={ICON_SIZE}
          className={`cursor-pointer ${
            scrolled
              ? "text-foreground"
              : effects
              ? "text-white"
              : "text-foreground"
          }`}
          onClick={handleDrawer}
        />
      </div>
      <div className="flex items-center justify-center flex-1">
        <Link href={"/"}>
          {logo ? (
            <Image src={logo} alt="Logo" width={100} height={100} />
          ) : (
            <h1
              className={`logo flex flex-col transition-all ${
                scrolled && effects
                  ? "text-base text-foreground"
                  : `text-${textColor}`
              }`}
            >
              THE EASTERN <span>TRADE GROUP</span>
            </h1>
          )}
        </Link>
      </div>
      {openDrawer && (
        <Drawer
          handleDrawer={handleDrawer}
          setHoveredType={setHoveredType}
          hoveredType={hoveredType}
          filteredData={filteredData}
          ICON_SIZE={ICON_SIZE}
        />
      )}
    </div>
  );
};

export default Header;
