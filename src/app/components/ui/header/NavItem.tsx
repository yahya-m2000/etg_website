import clsx from "clsx";
import React from "react";

const NavItem: React.FC<NavItemProps> = ({
  label,
  isDark,
  dropdownOpen,
  onClick,
  isSelected,
  isInDrawer = false, // default to false if not passed
}) => (
  <p
    onClick={onClick}
    className={clsx(
      // Use the font-assistant and universal styles
      "font-assistant font-medium text-lg cursor-pointer transition-all duration-300",
      isInDrawer
        ? "text-white mb-[10px] px-4 text-xl bg-black hover:bg-primary"
        : "lg:mr-[2vw] mt-[20px]",
      // hover-underline

      // Conditional text color classes
      // isSelected
      //   ? "text-primary"
      //   : // : dropdownOpen
      //   // ? "text-black"
      isDark ? "text-white" : "text-black"
    )}
  >
    {label}
  </p>
);

export default NavItem;
