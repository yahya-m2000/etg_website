import { Footer, Header, Layout, Paragraph } from "@/components/ui";
// import { FeaturedInsights, TrendingCarousel } from "@/components/pages/home";
import { renderHeroImage } from "./lib/common/src/ui/renderHeroImage";
import { placeholderHeroImage } from "./assets/data/placeholderHeroImage";
import Section from "@/components/ui/Section";
import {
  fetchInsights,
  fetchInsightBySlug,
  fetchNavigation,
  fetchPageContent,
} from "@/lib/api/src/contentful";
import { homeData } from "./assets/data/home";

export default async function Home() {
  const [insights, navigationTabs, content] = await Promise.all([
    fetchInsights("article").then((res) => res || []),
    fetchNavigation("navigation"),
    fetchPageContent("pageContent").then((pages) =>
      pages?.find((page) => page.slug === "home")
    ),
  ]);

  // featured insight or project for the hero image
  const featuredInsight = insights.find((insight) => insight.isFeatured);

  let featuredHeroImage = null;
  if (featuredInsight) {
    featuredHeroImage = await fetchInsightBySlug(
      "article",
      featuredInsight.slug
    );
  }

  // const sections = content?.sections || [];
  const sections = homeData;

  // Rendering
  return (
    <Layout>
      <main>
        <Header isDark={true} navigationTabs={navigationTabs} />
        {renderHeroImage(
          featuredHeroImage
            ? {
                title: featuredHeroImage[0].title,
                subtitle: featuredHeroImage[0].subtitle,
                heroImage: featuredHeroImage[0].heroImage,
                tags: featuredHeroImage[0].tags,
                author: featuredHeroImage[0].author,
                date: featuredHeroImage[0].date,
                body: "",
                basePath: featuredHeroImage[0].basePath,
                slug: featuredHeroImage[0].slug,
              }
            : placeholderHeroImage
        )}

        <div className="main">
          {sections.length > 0 ? (
            sections.map((section, index) => (
              <Section
                key={index}
                section={{
                  id: index + 1,
                  title: section.title ?? "",
                  body: section.body,
                  quote: section.quote ? true : false,
                  author: section.author,
                  image: section.image,
                  callToActions: section.callToActions,
                }}
              />
            ))
          ) : (
            <p>No sections available.</p>
          )}

          {/* <TrendingCarousel /> */}
        </div>
        <Footer isDark={false} />
      </main>
    </Layout>
  );
}
