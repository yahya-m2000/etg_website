import { Footer, Header, Layout, Paragraph } from "@/components/ui";
import HeroImage from "@/components/ui/HeroImage";
import {
  fetchNavigation,
  fetchPageContent,
  fetchParagraph,
} from "@/lib/api/src/contentful";
import ServiceTabs from "@/components/ui/services/ServiceTabs";

export default async function Page() {
  const navigationTabs = await fetchNavigation("navigation");
  const pageContentData = await fetchPageContent("pageContent");
  const paragraphData = await fetchParagraph("paragraph");

  let content: PageContent | null = null;

  if (pageContentData) {
    content =
      pageContentData.find((page: PageContent) => page.slug === "services") ||
      null;
  }
  // Fetch paragraph content

  // Ensure you are looking for the right slug or page identifier
  const paragraphContent = paragraphData?.find(
    (page) => page.slug === "services"
  ) || {
    title: "What we offer",
    body: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium...",
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?fit=crop&w=600&q=80",
  };

  // Set default values or populate from the content fetched
  const title = content?.title || "Services";
  const subtitle = content?.subtitle || "Our Services Subtitle";
  const heroImage = content?.heroImage || "/default-hero-image.jpg"; // Provide fallback image

  // Extract sections from content (services data)
  const servicesSections = content?.sections || [];

  return (
    <Layout>
      <Header isDark={true} navigationTabs={navigationTabs} />
      <HeroImage
        title={title}
        body={""}
        date={""}
        heroImage={heroImage}
        subtitle={subtitle}
        basePath={""}
      />
      <main className="main px-0">
        {/* Section to display the paragraph content */}
        <div>
          <Paragraph
            title={paragraphContent.title}
            body={paragraphContent.body}
            isReversed={true}
          />
        </div>

        {/* Pass the sections data to ServiceTabs */}
        <ServiceTabs services={servicesSections} />
      </main>
      <Footer />
    </Layout>
  );
}
