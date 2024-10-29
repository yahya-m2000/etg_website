import { notFound } from "next/navigation";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import SocialMediaLinks from "@/components/pages/insights/SocialMediaLinks";
import { Header, Layout, HeroImage, Footer } from "@/components/ui";
import { TrendingCarousel } from "@/components/pages/home";
import { fetchInsightBySlug, fetchNavigation } from "@/lib/api/src/contentful";
import { richTextRenderOptions } from "@/lib/common/src/ui/richTextRenderOptions";
import { getImageUrl } from "@/lib/common/src/utils";

export default async function InsightPage({ params }: { params: Params }) {
  const { slug } = params;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000/";
  const currentUrl = `${baseUrl}insights/${slug}`;

  const [navigationTabs, data] = await Promise.all([
    fetchNavigation("navigation"),
    fetchInsightBySlug("article", slug),
  ]);

  if (!data || data.length === 0) {
    return notFound();
  }

  const insight = data[0];
  const { title, subtitle, author, date, body, heroImage, tags, pdf } = insight;
  const imageUrl = getImageUrl(heroImage);

  return (
    <Layout>
      <Header isDark={true} navigationTabs={navigationTabs} />
      <HeroImage
        title={title}
        subtitle={subtitle}
        heroImage={imageUrl}
        tags={tags}
        author={author}
        date={date}
        body={body}
        images={undefined}
        slug={slug}
        basePath=""
      />
      <div className="main flex flex-1 flex-col-reverse md:flex-row bg-white border-b border-b-slate-300 border-[1px]">
        <div className="flex-[0.8] md:mr-[2vw] h-full">
          {documentToReactComponents(body, richTextRenderOptions)}
        </div>
        <div className="flex-[0.2]">
          <a
            href={pdf}
            download
            className="font-assistant text-primary mt-4 block text-xl font-semibold hover:underline"
          >
            Download PDF
          </a>
        </div>
      </div>
      {/* <TrendingCarousel /> */}
      <Footer />
    </Layout>
  );
}

/* <div className="sticky md:top-[10vh] flex flex-col justify-left items-start md:min-h-[20vh] transition-all duration-300">
            <SocialMediaLinks
              title={title}
              heroImage={imageUrl}
              currentUrl={currentUrl}
            />
          </div> */
