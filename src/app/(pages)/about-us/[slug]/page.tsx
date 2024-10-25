import { Footer, Header, HeroImage, Layout } from "@/components/ui";
import {
  fetchFAQS,
  fetchNavigation,
  fetchPageContent,
} from "@/lib/api/src/contentful";
import { richTextRenderOptions } from "@/lib/common/src/ui/richTextRenderOptions";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { notFound, redirect } from "next/navigation"; // Import redirect
import React from "react";
import { Document } from "@contentful/rich-text-types";
import Section from "@/components/ui/Section";

type FAQ = {
  question: string;
  answer: Document;
  order: number;
  category: string;
};

type Section = {
  title: string;
  subtitle: string;
  body: Document;
  callToAction?: string;
  quote?: string;
  author?: string;
  image?: string;
};

type PageContent = {
  slug: string;
  title: string;
  subtitle: string;
  heroImage: string;
  date: string;
  sections?: Section[];
};

const FAQSection: React.FC<{ faqs: FAQ[] }> = ({ faqs }) => (
  <div className="faq-section">
    {faqs.map((faqItem) => (
      <div key={faqItem.question} className="faq-item">
        <h3 className="font-inriaSerif text-3xl font-semibold mb-3">
          {faqItem.question}
        </h3>
        {documentToReactComponents(faqItem.answer, richTextRenderOptions)}
      </div>
    ))}
  </div>
);

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;

  // If slug is "contact-us", redirect to the /contact-us page
  if (slug === "contact-us") {
    redirect("/contact-us"); // Perform the redirect
  }

  // Fetch navigation tabs
  const navigationTabs = await fetchNavigation("navigation");

  let faqs: FAQ[] | null = null;
  let content: PageContent | null = null;

  if (slug === "faq") {
    // Fetch FAQ content
    faqs = await fetchFAQS("faq");
  } else {
    // Fetch page content
    const pageContentData = await fetchPageContent("pageContent");

    // Check if pageContentData is null before accessing it
    if (pageContentData) {
      content =
        pageContentData.find((page: PageContent) => page.slug === slug) || null;
    }
  }

  // Handle 404 not found cases
  if (!faqs && !content) {
    return notFound();
  }

  let title = "";
  let subtitle = "";
  let heroImage = "";
  let sections: Section[] | undefined;

  // If it's FAQ content
  if (faqs) {
    title = "Frequently Asked Questions";
    subtitle = "";
    heroImage = "/default-faq-hero.jpg";
  }

  // If it's regular page content
  if (content) {
    title = content.title;
    subtitle = content.subtitle;
    heroImage = content.heroImage;
    sections = content.sections; // Get all sections
  }

  return (
    <Layout>
      <Header navigationTabs={navigationTabs} isDark={true} />
      <HeroImage
        title={title}
        body={""}
        date={""}
        heroImage={heroImage}
        subtitle={subtitle}
        basePath={""}
      />
      <div className="main flex flex-1 flex-col-reverse md:flex-row bg-white border-b border-b-slate-300 border-[1px]">
        <div className="flex-[1] h-full">
          {faqs ? (
            <FAQSection faqs={faqs} />
          ) : (
            <div className="sections-container ">
              {sections &&
                sections.map((section, index) => (
                  <Section
                    key={index}
                    section={{
                      ...section,
                      id: index + 1,
                      quote: section.quote ? true : false, // Convert to boolean type
                    }}
                    isReversed={index % 2 === 1}
                  />
                ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </Layout>
  );
}
