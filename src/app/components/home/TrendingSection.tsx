import { getPublicationUrl } from "@/lib/common/src/utils";
import Link from "next/link";

type TrendingSectionProps = {
  data: Publications[];
};

const TrendingSection: React.FC<TrendingSectionProps> = ({ data }) => {
  const featuredData = data.filter((item) => item.featured); // Filter here

  return (
    <div
      className="z-20 flex flex-row absolute bottom-0 right-0 w-[100%]
          bg-white text-black px-20 py-5"
    >
      <h6 className="text-lg font-bold mr-10">FEATURED</h6>
      {featuredData.map((item, index) => {
        return (
          <Link
            href={getPublicationUrl(item.type + "s", item.title, item.id)}
            key={item.id}
          >
            <div key={index} className="flex flex-row">
              <span className="text-primary text-4xl font-extralight mr-2.5">
                |{" "}
              </span>

              <p className="hover:text-primary  mr-5 cursor-pointer">
                {item.title}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default TrendingSection;
