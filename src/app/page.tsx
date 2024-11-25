import Header from "@/components/Header";
import HeroImage from "@/components/home/HeroImage";
import HeaderParagraphImage from "./components/home/HeaderParagraphImage";
import Footer from "./components/Footer";
import Link from "next/link";

import { fetchPublication, fetchPublications } from "./lib/api/src/contentful";
import TrendingSection from "./components/home/TrendingSection";

export default async function Home() {
  const publicationData = await fetchPublication(
    "publication",
    "regional-performance-review"
  );
  const publicationsData = await fetchPublications("publication");

  // console.log("Publications Data:", publicationsData);

  return (
    <div>
      <Header
        logo=""
        navItems={[""]}
        callToAction={["Learn More", "Get Started"]}
        backgroundColor=""
        textColor="white"
        position="fixed"
        effects={true}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        data={publicationsData || []} // Ensure this is resolved
      />

      <div className="relative flex flex-col justify-center ">
        <HeroImage
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          insights={publicationData ? [publicationData] : []}
        />
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-expect-error */}
        <TrendingSection data={publicationsData} />
      </div>
      <main className="relative flex justify-center items-center z-20 bg-background">
        <HeaderParagraphImage
          title="Shaping a|Sustainable Future"
          body="THE EASTERN TRADE GROUP is an international investment and trading firm committed to transforming and integrating developing markets across the world into the global economy. At the heart of our mission is the cultivation of an expansive, operational global network through technology, consultancy, and logistics, connecting international investors to regions of great potential."
          image="https://images.pexels.com/photos/16656496/pexels-photo-16656496/free-photo-of-close-up-of-green-leaves.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        />
        <HeaderParagraphImage
          reversed={true}
          quote
          body="
THE EASTERN TRADE GROUP was formed with simple yet effective principles at its core: Community, Creativity, Longevity, and Equality. In the ever changing world of international trade, competition is fierce, with businesses of all sizes striving to adapt and stay afloat. The global landscape is in an era of monumental shifting, and only the agile and forward thinkers will thrive. That’s why we’re here, to empower you and your businesses to not only navigate but excel in tomorrow’s trade, today. - Ridwan Mohamed, Founding Director"
          image="/assets/Grey-9195.jpg"
        />
        <HeaderParagraphImage
          title="Business|Hubs"
          body="With operational hubs in key areas across the globe, we are strategically positioned to offer tailored services for your support. Our services span from facilitating international trade agreements and partnerships to providing consultancy on regional development and infrastructure projects. By connecting businesses with the right partners and stakeholders in the public sector, logistics, manufacturing, and more, we ensure that every element of the supply chain benefits from tailored, effective, and sustainable solutions."
          image="https://images.pexels.com/photos/439416/pexels-photo-439416.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        />
        <div className="flex flex-1 w-full flex-col bg-primary justify-center items-center p-5">
          <h4 className="font-bitter font-bold text-3xl text-white">
            How can we help?
          </h4>
          <h6 className="font-bitter text-xl text-white">
            <Link href="/contact">
              <span className="underline cursor-pointer">Get in touch</span>
            </Link>{" "}
            with us
          </h6>
        </div>
      </main>
      <div className="relative z-20">
        <Footer />
      </div>
    </div>
  );
}
