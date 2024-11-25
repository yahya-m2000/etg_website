import Header from "@/components/Header";
import Image from "next/image";
import { fetchPublications } from "@/lib/api/src/contentful";
import { getPublicationUrl } from "@/lib/common/src/utils";
import Link from "next/link";
import Footer from "@/components/Footer";

interface SearchPageProps {
  searchParams: Promise<{ query?: string }>;
}

export default async function SearchResults({ searchParams }: SearchPageProps) {
  const { query } = await searchParams; // Await searchParams as a promise
  let results: Publications[] = [];
  const publicationsData = await fetchPublications("publication");

  const trendingPublications = publicationsData
    .filter((pub) => {
      // console.log("Views:", pub.views); // Log views to debug
      return pub.views && pub.views > 0;
    })
    .sort((a, b) => b.views - a.views)
    .slice(0, 5);

  // console.log("Trending Publications:", trendingPublications); // Debug trending data

  if (query) {
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      results = publicationsData.filter((pub) =>
        pub.title.toLowerCase().includes(query.toLowerCase())
      );
    } catch (error) {
      console.error("Error fetching publications:", error);
    }
  }

  return (
    <div>
      <Header
        logo=""
        navItems={[""]}
        callToAction={["Learn More", "Get Started"]}
        backgroundColor=""
        textColor="black"
        position="relative"
        effects={false}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        data={publicationsData || []} // Ensure this is resolved
      />
      <main className="w-full px-20">
        <div className="min-h-screen">
          <div className="flex flex-row">
            <div className="flex flex-col flex-[0.3] justify-start">
              <h6 className="font-bold text-2xl mb-5">Trending Publications</h6>
              <ul className="border-r-[0.5px] border-gray-200 pr-5">
                {trendingPublications.map((pub) => (
                  <Link
                    href={getPublicationUrl(pub.type + "s", pub.title, pub.id)}
                    key={pub.id}
                  >
                    <li className="flex flex-row mb-5 items-center hover:bg-gray-200 p-2.5 rounded-md">
                      <div className="relative min-w-[150px] h-[10vh] bg-white mr-5">
                        <Image
                          className="z-0 object-cover"
                          src={
                            pub.heroImage
                              ? `${pub.heroImage}`
                              : "/default-image.jpg" // Fallback image in case heroImage is missing
                          }
                          alt={`Background image for ${pub.title}`}
                          fill
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                      <div>
                        <h2 className="font-semibold">{pub.title}</h2>
                        <p className="text-sm font-light w-[200px] truncate">
                          {pub.description}
                        </p>
                      </div>
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
            {results.length > 0 ? (
              <ul>
                {results.map((item, key) => (
                  <Link
                    href={getPublicationUrl(
                      item.type + "s",
                      item.title,
                      item.id
                    )}
                    key={key}
                  >
                    <div className="flex flex-col flex-[0.7] pl-5">
                      <h1 className="text-2xl font-bold mb-5">
                        {/* react/no-unescaped-entities */}
                        Search Results for &quot;{query}&quot;
                      </h1>
                      <li
                        key={item.id}
                        className="flex flex-row mb-5 items-center hover:bg-gray-200 p-2.5 rounded-md"
                      >
                        <div className="relative w-[10vw] h-[10vh] bg-white mr-5">
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
                        <div>
                          <h2 className="font-semibold">{item.title}</h2>
                          <p className="text-sm font-light w-[500px] truncate">
                            {item.description}
                          </p>
                        </div>
                      </li>
                    </div>
                  </Link>
                ))}
              </ul>
            ) : (
              <p>
                {/* react/no-unescaped-entities */}
                No results found for &quot;{query}&quot;.
              </p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
