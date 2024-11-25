import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ContactForm from "@/components/ContactForm";
import { fetchPublications } from "@/lib/api/src/contentful";

export default async function Contact() {
  const publicationsData = await fetchPublications("publication");

  console.log("Publications Data:", publicationsData);

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
        data={publicationsData}
      />
      <div>
        <div className="flex flex-col lg:flex-row py-10">
          <div className="flex flex-col flex-[0.7] px-10 lg:px-20">
            <h4 className="font-bitter font-semibold text-5xl pb-10">
              Contact Us
            </h4>
            <p className="mb-2.5">
              Have questions? We're here to help. Fill out the form below, and
              our team will get back to you shortly.
            </p>
            <ContactForm />
          </div>
          <div className="flex flex-col flex-[0.3] px-10">
            {/* UK Location */}
            <div className="border-t border-b py-5 mb-5">
              <h5 className="font-semibold text-lg mb-2">UK</h5>
              <p>UK Office 128 City Road</p>
              <p>London, UK, EC1V 2NX</p>
              <p>admin@theeeasterntradegroup.com</p>
            </div>
            {/* China Location */}
            <div className="border-t border-b py-5">
              <h5 className="font-semibold text-lg mb-2">China</h5>
              <p>Nanhai District</p>
              <p>Foshan City</p>
              <p>Star Harbor International Plaza, Building C</p>
              <p>admin.china@theeasterntradegroup.com</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
