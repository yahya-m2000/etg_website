type Image = {
  id: number;
  url: string;
};

type Author = {
  name: string;
  role: string;
  photo: Image;
  bio: string;
}

type SEO = {
  title: string;
  description: string;
};

type OpenGraph = {
  title: string;
  description: string;
  image: string;
};

type DataSource = {
  label: string;
  url: string;
};

type Translation = {
  language: string;
  url: string;
};

type RelatedInsight = {
  id: number;
  title: string;
  url: string;
};

type EngagementLink = {
  label: string;
  url: string;
};

type Publications = {
  id: string;
  type: string[]; // e.g., "Report" or "Insight"
  title: string;
  description?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: Document; // Rich Text Document from Contentful
  author?: Author; // Author name
  date: string; // ISO date format (e.g., "2024-10-18")
  tags?: string[];
  region?: string[];
  sector?: string[];
  topic?: string[];
  heroImage?: Image;
  gallery?: Image[];
  readTime?: string; // e.g., "5 min"
  engagementLinks?: EngagementLink[];
  seo?: SEO;
  slug?: string;
  openGraph?: OpenGraph;
  relatedInsights?: RelatedInsight[];
  featured?: boolean;
  status?: string; // e.g., "Published", "Draft", or "Archived"
  publishDate?: string; // ISO date format
  unpublishDate?: string | null; // ISO date format or null
  editorNotes?: string;
  dataSource?: DataSource[];
  pdfDownload?: string; // URL to PDF
  footnotes?: string[]; // Array of strings for references or footnotes
  translations?: Translation[];
};

type ButtonProps = {
    onClick: () => void;
    size?: "small" | "base" | "large" | "heroImage";
    outline?: boolean;
    color?: string;
    title: string;
  };
