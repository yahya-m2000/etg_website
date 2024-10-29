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
