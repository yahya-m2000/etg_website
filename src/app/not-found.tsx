import Footer from "./components/Footer";
import Header from "./components/Header";
import { fetchPublications } from "./lib/api/src/contentful";

export default async function NotFound() {
  const publicationData = await fetchPublications("publication");
  return (
    <div>
      <Header
        navItems={[]}
        backgroundColor={"background"}
        position={"relative"} // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        data={publicationData}
      />
      <main>
        <div className="relative h-[90vh] flex flex-col justify-center items-center text-center">
          <h1 className="font-bitter text-9xl">404</h1>
          <h2 className="font-bitter text-3xl">Not found</h2>
        </div>
      </main>
      <Footer />
    </div>
  );
}
