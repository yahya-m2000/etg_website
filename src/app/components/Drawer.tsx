import React, { useEffect, useRef } from "react";
import { ArrowRight02Icon, Cancel01Icon, Search01Icon } from "hugeicons-react";
import { useRouter } from "next/navigation"; // Next.js 13+ App Router navigation
import Image from "next/image";
import { getPublicationUrl } from "@/lib/common/src/utils";
import Link from "next/link";

interface DrawerProps {
  handleDrawer: () => void;
  setHoveredType: React.Dispatch<React.SetStateAction<string | null>>;
  hoveredType: string | null;
  filteredData: Publications[]; // Use the Publications type here
  ICON_SIZE: number;
}

const Drawer: React.FC<DrawerProps> = ({
  handleDrawer,
  setHoveredType,
  filteredData,
  ICON_SIZE,
  hoveredType,
}) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const rightPanelRef = useRef<HTMLDivElement>(null);

  // Handle search functionality when Enter is pressed
  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim() !== "") {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      handleDrawer(); // Close the drawer after search
    }
  };

  // Prevent scroll propagation to parent elements
  useEffect(() => {
    const rightPanel = rightPanelRef.current;
    if (!rightPanel) return;

    const handleWheel = (e: WheelEvent) => {
      // Check if scrolling is needed
      const { scrollTop, scrollHeight, clientHeight } = rightPanel;

      // Scrolling down and already at the bottom
      if (e.deltaY > 0 && scrollTop + clientHeight >= scrollHeight) {
        e.preventDefault();
      }
      // Scrolling up and already at the top
      else if (e.deltaY < 0 && scrollTop <= 0) {
        e.preventDefault();
      }
      // Otherwise, prevent scrolling from propagating to parent
      else {
        e.stopPropagation();
      }
    };

    rightPanel.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      rightPanel.removeEventListener("wheel", handleWheel);
    };
  }, [hoveredType]); // Re-add event listener when hoveredType changes

  return (
    <div className="fixed inset-0 z-50" onClick={(e) => e.stopPropagation()}>
      <div className="z-0 absolute inset-0 backdrop-blur-[2px] bg-black w-[100vw] h-[100vh] bg-opacity-50" />
      <div className="z-10 flex flex-col fixed top-0 left-0 md:w-[700px] w-full h-[100vh] bg-black">
        {/* Drawer Header */}
        <div className="flex flex-row border-b-[1px] border-gray-700 ">
          <div
            className={`flex flex-[0.3] justify-center border-gray-700 border-r-[0.5px] py-10`}
          >
            <Cancel01Icon
              size={ICON_SIZE}
              className="cursor-pointer text-white hover:text-red-600"
              onClick={handleDrawer}
            />
          </div>
          <div className="relative flex flex-[0.7] items-center h-full p-10 ">
            <Search01Icon size={ICON_SIZE} className="absolute" color="white" />
            <input
              className="w-full pl-10 text-white font-inter bg-transparent border-none border-b-2 border-white focus:outline-none focus:border-b-2 focus:border-white"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
            />
          </div>
        </div>

        {/* Drawer Body */}
        <div className="flex flex-1 flex-row overflow-hidden">
          {/* Left Panel */}
          <div className="flex flex-col flex-[0.4] ">
            <div className="flex flex-col">
              {["Insights", "Reports", "Projects", "Services", "Contact"].map(
                (title) => {
                  const lowerTitle = title.toLowerCase();
                  const isClickable =
                    lowerTitle === "services" || lowerTitle === "contact";

                  return isClickable ? (
                    <Link
                      href={`/${lowerTitle}`}
                      key={title}
                      onMouseEnter={() => setHoveredType(null)}
                    >
                      <div
                        className={`flex flex-row justify-between items-center px-10 md:px-20 py-5 
            hover:bg-gray-900 active:bg-gray-600 group cursor-pointer`}
                        // Clear hoveredType for clickable items
                      >
                        <h2 className="text-white text-xl font-inter font-light">
                          {title}
                        </h2>
                      </div>
                    </Link>
                  ) : (
                    <div
                      key={title}
                      className={`flex flex-row justify-between items-center px-10 md:px-20 py-5 
          ${
            hoveredType === title.toLowerCase().slice(0, -1)
              ? "bg-gray-900"
              : "hover:bg-gray-900 active:bg-gray-800"
          } group`}
                      onMouseEnter={() =>
                        setHoveredType(title.toLowerCase().slice(0, -1))
                      }
                    >
                      <h2 className="text-white text-xl font-inter font-light">
                        {title}
                      </h2>
                      <ArrowRight02Icon
                        size={ICON_SIZE}
                        color="white"
                        className="transform group-hover:translate-x-2 transition-all duration-300"
                      />
                    </div>
                  );
                }
              )}
            </div>

            {/* About Us Section */}
            <div className="flex flex-col md:px-20 px-10 pd:mx-20 py-5 border-t-[1px] border-gray-700">
              {[{ label: "About us", href: "/about" }].map((link) => (
                <Link key={link.href} href={link.href} className="mb-1.25">
                  <h6 className="flex flex-row text-gray-300 font-extralight hover:text-white">
                    {link.label}
                  </h6>
                </Link>
              ))}
            </div>
          </div>

          {/* Right Panel */}
          <div
            ref={rightPanelRef}
            className={`flex flex-col flex-[0.6] border-l-[0.5px] border-gray-700 overflow-y-auto max-h-[calc(100vh-80px)]`}
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(255, 255, 255, 0.3) transparent",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {filteredData.map((item, index) => (
              <Link
                href={getPublicationUrl(item.type + "s", item.title, item.id)}
                key={item.id}
              >
                <div
                  key={index}
                  className="flex md:flex-row flex-col justify-center border-b-[1px] border-gray-700 p-5 hover:bg-gray-900 active:bg-gray-800 cursor-pointer"
                >
                  <div className="md:pr-5">
                    <div className="relative md:w-[10vw] w-auto h-[100px]  bg-white">
                      <Image
                        className="z-0 object-cover"
                        src={
                          item.heroImage
                            ? `${item.heroImage}`
                            : "/default-image.jpg" // Fallback image in case heroImage is missing
                        }
                        alt={`Background image for ${item.title}`}
                        fill // Adjust layout for modern usage
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  </div>
                  <div className="text-white">
                    <h6 className="font-bold text-lg">{item.title}</h6>
                    {/* <p className="text-sm font-light text-gray-600 uppercase">
                      {item.tags?.join(", ")}
                    </p> */}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
