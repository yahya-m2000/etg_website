import router from "next/navigation";

export function cleanUrlString(str: string) {
  
  // Trim the string first and check if it's a single word
  const trimmedStr = str.trim();

  // If it's a single word, return it in lowercase without further modification
  if (!trimmedStr.includes(" ")) {
    return trimmedStr.toLowerCase();
  }

  // Otherwise, apply kebab-case transformations for multi-word strings
  return trimmedStr
    .toLowerCase() // Convert to lowercase
    .replace(/[.\(\)]/g, "") // Remove dots, parentheses
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with a single hyphen
    .trim(); // Remove trailing hyphens
}

export const getImageUrl = (url: string | undefined) => {
  return url
    ? url.startsWith("//")
      ? `https:${url}`
      : url
    : "https://via.placeholder.com/300";
};

export const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-UK", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export const checkIsMobile = () => window.innerWidth < 1024;

export const getTextSizeClass = (isHighlighted: boolean, baseClass: string) => {
  switch (baseClass) {
    case "text-base":
      return isHighlighted ? "text-lg" : "text-base"
    case "text-lg":
      return isHighlighted ? "text-xl" : "text-lg";
    case "text-xl":
      return isHighlighted ? "text-2xl" : "text-xl";
    case "text-2xl":
      return isHighlighted ? "text-3xl" : "text-2xl";
    case "text-3xl":
      return isHighlighted ? "text-4xl" : "text-3xl";
    default:
      return baseClass;
  }
};

export const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>, searchQuery: string, handleDrawer: () => void) => {
  if (e.key === "Enter" && searchQuery.trim()) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
    router.push(`/search/?query=${encodeURIComponent(searchQuery)}`);
    handleDrawer(); // Close the drawer after redirect
  }
};

export const getPublicationUrl = (type: string, title: string, id: string) => {
  const kebabCaseTitle = title
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

    console.log("Pls work:", id)
    // const incrementViews = async (publicationId: string) => {
    //   try {
    //     if (!publicationId) {
    //       console.error("Publication ID is missing!");
    //       return;
    //     }
    
    //     console.log("Incrementing a views for ID:", publicationId); // Debug log
    
    //     const baseUrl =
    //       typeof window !== "undefined"
    //         ? window.location.origin
    //         : "http://localhost:3000"; // Adjust base URL for non-browser contexts
    //     const response = await fetch(`${baseUrl}/api/increment-views`, {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({ publicationId }),
    //     });
    
    //     if (!response.ok) {
    //       throw new Error("Failed to increment views");
    //     }
    //   } catch (error) {
    //     console.error("Failed to increment views:", error);
    //   }
    // };
    
    
    // incrementViews(id)

  // Return the constructed URL
  return `/${type}/${kebabCaseTitle}`;
};
