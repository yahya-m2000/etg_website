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

  // const trendingPublications = publicationsData
  //   .filter(
  //     (pub) => pub && typeof pub.views === "number" && pub.views > 0 // Safely ensure views exist and are a number
  //   )
  //   .sort((a, b) => {
  //     const viewsA = typeof a?.views === "number" ? a.views : 0;
  //     const viewsB = typeof b?.views === "number" ? b.views : 0;
  //     return viewsB - viewsA; // Ensure sorting only numbers
  //   })
  //   .slice(0, 5);

  if (query) {
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      results = publicationsData.filter(
        (pub) =>
          pub &&
          typeof pub.title === "string" &&
          pub.title.toLowerCase().includes(query.toLowerCase())
      );
    } catch (error) {
      console.error("Error filtering publications:", error);
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
        // @ts-expect-error
        data={publicationsData || []} // Ensure this is resolved
      />
      <main className="w-full lg:px-20 px-5">
        <div className="min-h-screen">
          <div className="flex md:flex-row flex-col">
            <div className="flex flex-col flex-[0.3] justify-start">
              {/* <h6 className="font-bold text-2xl mb-5">Trending Publications</h6> */}
              {/* <ul className="border-r-[0.5px] border-gray-200 pr-5">
                {trendingPublications.map(
                  (pub) =>
                    pub && ( // Ensure publication is not null
                      <Link
                        href={getPublicationUrl(
                          pub.type + "s",
                          // @ts-expect-error
                          pub.title,
                          pub.id
                        )}
                        key={pub.id}
                      >
                        <li className="flex flex-row mb-5 items-center hover:bg-gray-200 p-2.5 rounded-md">
                          <div className="relative min-w-[150px] h-[10vh] bg-white mr-5">
                            <Image
                              className="z-0 object-cover"
                              src={
                                typeof pub.heroImage === "string"
                                  ? pub.heroImage
                                  : "/default-image.jpg" // Fallback image in case heroImage is missing
                              }
                              alt={`Background image for ${pub.title}`}
                              fill
                              style={{ objectFit: "cover" }}
                            />
                          </div>
                          <div>
                             @ts-expect-error 
                            <h2 className="font-semibold">{pub.title}</h2>
                            <p className="text-sm font-light w-[200px] truncate">
                               @ts-expect-error 
                              {pub.description}
                            </p>
                          </div>
                        </li>
                      </Link>
                    )
                )}
              </ul> */}
            </div>
            {results.length > 0 ? (
              <ul>
                {results.map(
                  (item) =>
                    item && ( // Ensure result item is not null
                      <div
                        className="flex flex-col flex-[0.7] pl-5"
                        key={item.id}
                      >
                        <h1 className="text-2xl mb-5 lg:text-left text-center">
                          Search Results for{" "}
                          <span className="font-bold ">
                            &quot;{query}&quot;
                          </span>
                        </h1>
                        <Link
                          href={getPublicationUrl(
                            item.type + "s",
                            item.title,
                            item.id
                          )}
                        >
                          <li
                            key={item.id}
                            className="flex md:flex-row flex-col md:items-center mb-5 hover:bg-gray-200 p-2.5 rounded-md"
                          >
                            <div className="relative md:w-[10vw] w-full h-[10vh] bg-white mr-5">
                              <Image
                                className="z-0 object-cover"
                                src={
                                  typeof item.heroImage === "string"
                                    ? item.heroImage
                                    : "/default-image.jpg" // Fallback image in case heroImage is missing
                                }
                                alt={`Background image for ${item.title}`}
                                fill
                                style={{ objectFit: "cover" }}
                              />
                            </div>
                            <div>
                              <h2 className="font-semibold">{item.title}</h2>
                              <p className="text-sm font-light md:w-[500px] truncate">
                                {item.description}
                              </p>
                            </div>
                          </li>
                        </Link>
                      </div>
                    )
                )}
              </ul>
            ) : (
              <p>No results found for &quot;{query}&quot;.</p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
