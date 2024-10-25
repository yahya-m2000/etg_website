"use client";
import { useState, useRef, useCallback, useEffect } from "react";
import clsx from "clsx";
import Logo from "./Logo";
import DrawerToggle from "./DrawerToggle";
import MobileDrawer from "./MobileDrawer";
import DesktopDropdown from "./DesktopDropdown";
import NavItem from "./NavItem";

import Link from "next/link";

interface HeaderProps {
  isDark?: boolean;
  navigationTabs: {
    title: string;
    slug: string;
    tabs?: string[];
  }[];
}

const Header: React.FC<HeaderProps> = ({ isDark = false, navigationTabs }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedNav, setSelectedNav] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false); // Don't initialize with window.innerWidth
  const headerRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDrawer = useCallback(() => {
    setDrawerOpen((prev) => !prev);
  }, []);

  const handleNavClick = (navIndex: number) => {
    if (selectedNav === navIndex) {
      setSelectedNav(null);
      setDropdownOpen(false);
    } else {
      setSelectedNav(navIndex);
      setDropdownOpen(true);
    }
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setSelectedNav(null);
    setDropdownOpen(false); // Ensure overlay closes when drawer is closed
  };

  useEffect(() => {
    // Only run this code on the client side
    if (typeof window !== "undefined") {
      const handleResize = () => {
        const isNowMobile = window.innerWidth < 1024;
        setIsMobile(isNowMobile);

        // Close both drawer and dropdown when switching from mobile to desktop
        if (!isNowMobile) {
          setDrawerOpen(false);
          setDropdownOpen(false);
          setSelectedNav(null);
        }
      };

      handleResize(); // Check on mount
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        headerRef.current &&
        dropdownRef.current &&
        !headerRef.current.contains(event.target as Node) &&
        !dropdownRef.current.contains(event.target as Node) &&
        !drawerOpen // Ignore clicks if drawer is open
      ) {
        setDropdownOpen(false);
        setSelectedNav(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen, drawerOpen]);

  return (
    <>
      {/* Overlay for dropdown and drawer */}
      {/* {(dropdownOpen || drawerOpen) && (
        <div
          className="fixed inset-0 bg-slate-200 bg-opacity-25 z-[50] backdrop-brightness-50 duration-750"
          onClick={closeDrawer} // Close the drawer and dropdown when overlay is clicked
        />
      )} */}

      <header
        ref={headerRef}
        className={clsx(
          "absolute main flex flex-row lg:flex-col justify-between lg-justify-normal left-0 w-full z-[50] transition-all duration-300 ease-in-out"
          // dropdownOpen ? "lg:shadow-lg lg:bg-white" : ""
        )}
      >
        <Logo isDark={isDark} dropdownOpen={dropdownOpen} />

        <DrawerToggle isDark={isDark} toggleDrawer={toggleDrawer} />
        {isMobile && (
          <MobileDrawer
            drawerOpen={drawerOpen}
            closeDrawer={closeDrawer}
            navigationTabs={navigationTabs}
            selectedNav={selectedNav}
            handleNavClick={handleNavClick}
            drawerRef={drawerRef}
            dropdownRef={dropdownRef}
            isDark={isDark}
          />
        )}
        <DesktopDropdown
          navigationTabs={navigationTabs}
          dropdownOpen={dropdownOpen}
          dropdownRef={dropdownRef}
          isMobile={isMobile}
          selectedNav={selectedNav}
          handleNavClick={handleNavClick}
          isDark={isDark}
          setSelectedNav={setSelectedNav}
        />
        {/* {!isMobile && (
          <div className="hidden lg:flex items-end">
            {navigationTabs.map((navItem, index) => (
              <Link href={`/${navItem.slug}`} key={index} passHref>
                <NavItem
                  label={navItem.title}
                  isDark={isDark}
                  onClick={() => setSelectedNav(index)}
                  isSelected={selectedNav === index}
                  dropdownOpen={false}
                />
              </Link>
            ))}
          </div>
        )} */}
      </header>
    </>
  );
};

export default Header;
