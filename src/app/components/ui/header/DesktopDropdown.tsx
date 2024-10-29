import { cleanUrlString } from "@/lib/common/src/utils";
import Link from "next/link";
import clsx from "clsx";
import NavItem from "./NavItem"; // Assuming NavItem is a component you're using

export const DesktopDropdown: React.FC<DropdownMenuProps> = ({
  navigationTabs,
  dropdownOpen,
  dropdownRef,
  isMobile,
  selectedNav,
  setSelectedNav,
  handleNavClick,
  isDark,
}) => {
  const sortedNavigationTabs = [...navigationTabs].sort((a, b) => a.id - b.id);
  return (
    <>
      {/* Desktop Navigation */}
      {!isMobile && (
        <div className="hidden lg:flex items-end">
          {sortedNavigationTabs.map((navItem, index) => (
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
      )}

      {/* Desktop Dropdown */}
      {
        // !isMobile && selectedNav !== null && (
        //   <div
        //     ref={dropdownRef}
        //     className={clsx(
        //       "hidden lg:!block left-0 w-full z-[10] duration-500 ease-in-out",
        //       dropdownOpen
        //         ? "top-full h-auto opacity-100 translate-y-0 backdrop-blur-sm "
        //         : "top-full opacity-0 h-0"
        //     )}
        //   >
        //     <div className="mt-[20px]">
        //       <Link
        //         href={`/${cleanUrlString(navigationTabs[selectedNav]?.title)}`}
        //       >
        //         <h3 className="font-bold font-assistant text-lg  text-gray-500 hover:text-black">
        //           {navigationTabs[selectedNav]?.title}
        //         </h3>
        //       </Link>
        //       <ul>
        //         {/* Conditionally render tabs if they exist */}
        //         {
        //           navigationTabs[selectedNav]?.tabs?.map((tab, index) => (
        //             <li
        //               key={index}
        //               className="text-gray-500 text-lg font-assistant hover:cursor-pointer hover:text-black"
        //             >
        //               <Link
        //                 href={`/${
        //                   navigationTabs[selectedNav]?.slug
        //                 }/${cleanUrlString(tab)}`}
        //               >
        //                 {tab}
        //               </Link>
        //             </li>
        //           )) || <p>No tabs available</p> /* Display message if no tabs */
        //         }
        //       </ul>
        //     </div>
        //   </div>
        // )
      }
    </>
  );
};
export default DesktopDropdown;
