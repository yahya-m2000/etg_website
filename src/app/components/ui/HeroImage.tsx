import Image from "next/image";
import fallbackImage from "@/assets/images/fallback_image.jpg";

import { formatDate } from "@/lib/common/src/utils";
import { useMemo } from "react";

const HeroImage: React.FC<InsightProps> = ({
  title,
  subtitle,
  heroImage,
  author,
  date,
  tags,
}) => {
  // Memoize the formatted date to avoid recalculating on each render
  const formattedDate = useMemo(() => (date ? formatDate(date) : null), [date]);

  return (
    <div className="relative min-h-[60vh]">
      {/* Background Image */}
      <Image
        src={heroImage || fallbackImage}
        fill
        alt={title || "Hero image for the article"}
        className="absolute inset-0 z-0 object-cover"
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-500 to-transparent z-10 backdrop-brightness-50" />

      <div className="main flex absolute min-h-[60vh] items-end lg:w-[75vw] z-20">
        <div>
          {/* Conditionally render tags if available */}
          {tags && (
            <p className="base text-white uppercase font-bold">
              {Array.isArray(tags) ? tags.join(", ") : tags}
            </p>
          )}
          <h1 className="title text-white ">{title}</h1>
          {subtitle && (
            <p className="text-xl font-assistant text-white">{subtitle}</p>
          )}
          <div className="flex space-x-4 mt-2">
            {author && <p className="base text-white">{author}</p>}
            {formattedDate && (
              <p className="base text-white">{formattedDate}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroImage;
