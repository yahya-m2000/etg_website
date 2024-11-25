// lib/contentful.ts
import { createClient, CreateClientParams } from "contentful";

export const managementClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID as string, // Ensure this is set
  accessToken: process.env.CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN as string, // Ensure this is set
});


export const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID as string,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string 
});


export async function fetchPublication(contentType: string, slug: string) {
  try {
    // console.log(`Fetching entry with slug: ${slug}`); // Log the slug for debugging
    // console.log("Space ID:", process.env.CONTENTFUL_SPACE_ID);
// console.log("Access Token:", process.env.CONTENTFUL_ACCESS_TOKEN);
// console.log("Environment:", process.env.CONTENTFUL_ENVIRONMENT);


    const entries = await client.getEntries({
      content_type: contentType,
      "fields.slug": slug, // Use the slug for identification
      limit: 1, // Expecting a single entry
      select: [
        "sys.id",
        "fields.title",
        "fields.description",
        "fields.body",
        "fields.author",
        "fields.date",
        "fields.tags",
        "fields.featured",
        "fields.sector",
        "fields.topics",
        "fields.type",
        "fields.heroImage",
        "fields.gallery",
        "fields.readTime",
        "fields.engagementLinks",
        "fields.seo",
        "fields.slug",
        "fields.openGraph",
        "fields.relatedEntries",
        "fields.pdfDownload",
        "fields.dataSource",
        "fields.footnotes",
        "fields.translations",
        "fields.views",
      ],
    });

    if (entries.items.length > 0) {
      const item = entries.items[0];
      const {fields, sys} = item
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
      const heroImage = fields.heroImage?.fields?.file?.url
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
        ? `https:${fields.heroImage.fields.file.url}`
        : "";

      const galleryImages = Array.isArray(fields.gallery)
        ? fields.gallery.map(
            (image: any) => `https:${image.fields.file.url}`
          )
        : [];
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
      const pdfDownload = fields.pdfDownload?.fields?.file?.url
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
        ? `https:${fields.pdfDownload.fields.file.url}`
        : null;

      console.log("Entry found:", fields); // Log the found entry for debugging
      console.log("Entry found:", heroImage); // Log the found entry for debugging

      return {
        id: item.sys.id,
        title: fields.title,
        description: fields.description || "",
        body: fields.body || "",
        author: fields.author || [],
        date: fields.date || "",
        tags: fields.tags || [],
        featured: fields.featured || false, 
        sector: fields.sector || [],
        topics: fields.topics || [],
        type: fields.type || [],
        heroImage,
        gallery: galleryImages,
        readTime: fields.readTime || "",
        engagementLinks: fields.engagementLinks || [],
        seo: fields.seo || {},
        slug: fields.slug,
        openGraph: fields.openGraph || {},
        relatedEntries: fields.relatedEntries || [],
        pdfDownload,
        dataSource: fields.dataSource || {},
        footnotes: fields.footnotes || "",
        translations: fields.translations || {},
        views: fields.views
      };
    } else {
      console.log("No entry found with the given slug"); // Log no entry found
      return null; // Return null when no entry is found
    }
  } catch (error) {
    console.error("Error fetching entry by slug:", error);
    return null; // Return null on error
  }
}

export async function fetchPublications(contentType: string) {
  try {
    console.log("Space ID:", process.env.CONTENTFUL_SPACE_ID);
    console.log("Access Token:", process.env.CONTENTFUL_ACCESS_TOKEN);
    console.log("Environment:", process.env.CONTENTFUL_ENVIRONMENT);

    const entries = await client.getEntries({
      content_type: contentType,
      select: [
        "sys.id",
        "fields.title",
        "fields.description",
        "fields.body",
        "fields.author",
        "fields.date",
        "fields.tags",
        "fields.featured",
        "fields.sector",
        "fields.topics",
        "fields.type",
        "fields.heroImage",
        "fields.gallery",
        "fields.readTime",
        "fields.engagementLinks",
        "fields.seo",
        "fields.slug",
        "fields.openGraph",
        "fields.relatedEntries",
        "fields.pdfDownload",
        "fields.dataSource",
        "fields.footnotes",
        "fields.translations",
        "fields.views"
      ],
    });

    if (entries.items.length > 0) {
      return entries.items.map((item: any) => {
        const { fields, sys} = item;

        // Safely extract and transform fields
        const heroImage = fields.heroImage?.fields?.file?.url
          ? `https:${fields.heroImage.fields.file.url}`
          : "";

        const galleryImages = Array.isArray(fields.gallery)
          ? fields.gallery.map((image: any) =>
              image.fields?.file?.url ? `https:${image.fields.file.url}` : ""
            )
          : [];

        const pdfDownload = fields.pdfDownload?.fields?.file?.url
          ? `https:${fields.pdfDownload.fields.file.url}`
          : null;

        // Debug logs for individual entries
        console.log("Processed Entry:", {
          id: sys.id,
          title: fields.title,
          heroImage,
          galleryImages,
        });

        // Return a structured object
        return {
          id: sys.id || "something is up!",
          title: fields.title || "Untitled",
          description: fields.description || "",
          body: fields.body || "",
          author: fields.author || [],
          date: fields.date || "",
          tags: fields.tags || [],
          featured: fields.featured || false,
          sector: fields.sector || [],
          topics: fields.topics || [],
          type: fields.type || [],
          heroImage,
          gallery: galleryImages,
          readTime: fields.readTime || "",
          engagementLinks: fields.engagementLinks || [],
          seo: fields.seo || {},
          slug: fields.slug || "",
          openGraph: fields.openGraph || {},
          relatedEntries: fields.relatedEntries || [],
          pdfDownload,
          dataSource: fields.dataSource || {},
          footnotes: fields.footnotes || "",
          translations: fields.translations || {},
          views: fields.views || {}
        };
      });
    } else {
      console.log("No entries found");
      return [];
    }
  } catch (error) {
    console.error("Error fetching entries:", error);
    return [];
  }
}

const CONTENTFUL_SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const CONTENTFUL_ENVIRONMENT = process.env.CONTENTFUL_ENVIRONMENT || "master";
const CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN = process.env.CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN;

const CONTENTFUL_API_BASE = `https://api.contentful.com/spaces/${CONTENTFUL_SPACE_ID}/environments/${CONTENTFUL_ENVIRONMENT}`;

export async function incrementViews(entryId: string): Promise<number> {
  try {
    // Step 1: Fetch the current entry
    const entryResponse = await fetch(`${CONTENTFUL_API_BASE}/entries/${entryId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN}`,
      },
    });

    if (!entryResponse.ok) {
      throw new Error(`Failed to fetch entry: ${entryResponse.statusText}`);
    }

    const entry = await entryResponse.json();

    // Step 2: Increment the views count
    const currentViews = entry.fields.views?.["en-US"] || 0;
    const updatedViews = currentViews + 1;

    // Step 3: Update the entry with all fields
    const updatedFields = {
      ...entry.fields, // Retain all existing fields
      views: {
        "en-US": updatedViews, // Update only the views field
      },
    };

    const updateResponse = await fetch(`${CONTENTFUL_API_BASE}/entries/${entryId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
        "X-Contentful-Version": entry.sys.version, // Use the current version
      },
      body: JSON.stringify({ fields: updatedFields }), // Include all fields
    });

    if (!updateResponse.ok) {
      throw new Error(`Failed to update entry: ${updateResponse.statusText}`);
    }

    const updatedEntry = await updateResponse.json();
    
    const publishResponse = await fetch(
      `${CONTENTFUL_API_BASE}/entries/${entryId}/published`, // Use /published endpoint
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN}`,
          // "X-Contentful-Version": entry.sys.version,
        },
      }
    );

    if (!publishResponse.ok) {
      throw new Error(`Failed to publish entry: ${publishResponse.statusText}`);
    }

    // console.log(
    //  `Views updated and entry published successfully for entry: ${entryId}`
    //);

    // console.log(`Views updated successfully for entry: ${entryId}`);
    return updatedEntry.fields.views["en-US"];
  } catch (error) {
    console.error("Error updating views:", error);
    throw new Error("Failed to update views in Contentful");
  }
}



