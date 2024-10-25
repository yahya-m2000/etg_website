import { Footer, Header, Layout, Paragraph } from "@/components/ui";
import HeroImage from "@/components/ui/HeroImage";
import SearchProjects from "@/components/ui/projects/SearchProjects";
import Section from "@/components/ui/Section";
import {
  fetchInsights,
  fetchNavigation,
  fetchPageContent,
  fetchParagraph,
} from "@/lib/api/src/contentful";

export default async function Projects() {
  const [insights, navigationTabs, content] = await Promise.all([
    fetchInsights("article").then((res) => res || []), // Fallback to empty array if null or undefined
    fetchNavigation("navigation"),
    fetchPageContent("pageContent").then((pages) =>
      pages?.find((page) => page.slug === "projects")
    ),
  ]);

  const paragraphData = await fetchParagraph("paragraph");

  // Ensure you are looking for the right slug or page identifier
  const paragraphContent = paragraphData?.find(
    (page) => page.slug === "projects"
  ) || {
    title: "What we offer",
    body: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium...",
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?fit=crop&w=600&q=80",
  };

  let title = "";
  let subtitle = "";
  let heroImage = "";
  let sections: Section[] | undefined;

  if (content) {
    title = content.title;
    subtitle = content.subtitle;
    heroImage = content.heroImage;
    sections = content.sections;
  }

  return (
    <Layout>
      <main>
        <Header isDark={true} navigationTabs={navigationTabs} />

        <HeroImage
          title={title || "Projects"}
          body={subtitle || ""}
          heroImage={heroImage || ""}
          date={""}
          basePath={""}
        />

        <Paragraph
          title={paragraphContent.title}
          body={paragraphContent.body}
          image={paragraphContent.image}
          isReversed={true}
        />
        <div className="main flex flex-1 flex-col-reverse md:flex-row bg-white border-b border-b-slate-300 border-[1px]">
          <div className="flex-[1] h-full">
            <div className="sections-container">
              {sections && sections.length > 0 ? (
                sections.map((section, index) => (
                  <Section
                    key={index}
                    section={{
                      id: index + 1,
                      title: section.title ?? "Default Title",
                      body: section.body,
                      quote: section.quote ? true : false,
                      author: section.author,
                      image: section.image,
                      callToActions: section.callToActions,
                    }}
                    isReversed={index % 2 === 1}
                  />
                ))
              ) : (
                <p>No sections available.</p>
              )}
            </div>
          </div>
        </div>

        {/* Pass the insights to the client-side ProjectsClient */}
        {/* <SearchProjects insights={insights} /> */}

        <Footer />
      </main>
    </Layout>
  );
}
