// lib/contentful.ts
import { createClient } from "contentful";
import { Entry, Asset } from "contentful"; // Import proper types

export const managementClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID as string, // Ensure this is set
  accessToken: process.env.CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN as string, // Ensure this is set
});


export const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID as string,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string 
});

const CONTENTFUL_SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const CONTENTFUL_ENVIRONMENT = process.env.CONTENTFUL_ENVIRONMENT || "master";
const CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN = process.env.CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN;

const CONTENTFUL_API_BASE = `https://api.contentful.com/spaces/${CONTENTFUL_SPACE_ID}/environments/${CONTENTFUL_ENVIRONMENT}`;


// Helper to check if an object is an Entry
function isEntry(obj: any): obj is Entry<any> {
  return obj && typeof obj === "object" && "fields" in obj;
}

// Helper to check if an object is an Asset
function isAsset(obj: any): obj is Asset {
  return obj && typeof obj === "object" && "fields" in obj && "file" in obj.fields;
}

export async function fetchPublication(contentType: string, slug: string) {
  try {
    const entries = await client.getEntries({
      content_type: contentType,
      "fields.slug": slug,
      limit: 1,
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
      include: 1,
    });

    if (entries.items.length > 0) {
      const item = entries.items[0];

      // Ensure item is an Entry
      if (!isEntry(item)) {
        console.error("Unexpected type for item:", item);
        return null;
      }

      const fields = item.fields;

      const heroImage = isAsset(fields.heroImage)
        ? `https:${fields.heroImage.fields.file?.url}`
        : "";

      const galleryImages = Array.isArray(fields.gallery)
        ? fields.gallery
            .filter(isAsset)
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            .map((image) => `https:${image?.fields.file.url}`)
        : [];

      const pdfDownload = isAsset(fields.pdfDownload)
        ? `https:${fields.pdfDownload.fields.file?.url}`
        : null;

          // Extract author details if available
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
      const author = fields.author?.fields
      ? {// eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
          name: fields.author.fields.name || "Undisclosed",
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
          role: fields.author.fields.role || "Employee at The Eastern Trade Group",
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
          photo: fields.author.fields.photo
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            ? `https:${fields.author.fields.photo.fields.file.url}`
            : "/assets/image.png", // Fallback to default image
        }
      : null;

      return {
        id: item.sys.id,
        title: fields.title,
        description: fields.description || "",
        body: fields.body || "",
        author, // Cleaned author object
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
        views: fields.views || 0,
      };
    } else {
      console.log("No entry found with the given slug");
      return null;
    }
  } catch (error) {
    console.error("Error fetching entry by slug:", error);
    return null;
  }
}

export async function fetchPublications(contentType: string) {
  try {
    const entries = await client.getEntries({
      content_type: contentType,
      select: [
        "sys.id",
        "fields.title",
        "fields.description",
        "fields.type",
        "fields.tags",
        "fields.date",
        "fields.heroImage",
        "fields.views",
        "fields.featured"
      ],
    });

    if (entries.items.length > 0) {
      return entries.items.map((item) => {
        if (!isEntry(item)) {
          console.error("Unexpected type for item:", item);
          return null;
        }

        const fields = item.fields;

        const heroImage = isAsset(fields.heroImage)
          ? `https:${fields.heroImage.fields.file?.url}`
          : "";

        return {
          id: item.sys.id,
          title: fields.title || "Untitled",
          tags: fields.tags,
          type: fields.type,
          date: fields.date,
          description: fields.description || "",
          heroImage,
          views: fields.views || 0,
          featured: fields.featured
        };
      }).filter(Boolean); // Remove null values
    } else {
      console.log("No entries found");
      return [];
    }
  } catch (error) {
    console.error("Error fetching entries:", error);
    return [];
  }
}

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



