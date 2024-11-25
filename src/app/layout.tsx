import type { Metadata } from "next";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import "./globals.css";
import { assistant, barlowCondensed, bitter, inriaSerif } from "./fonts";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.theeasterntradegroup.com/"),
  title: "THE EASTERN TRADE GROUP",
  description:
    "We believe in innovation and, more importantly, the innovators themselves.",
  openGraph: {
    title: "THE EASTERN TRADE GROUP",
    description:
      "We believe in innovation and, more importantly, the innovators themselves.",
    url: "https://www.theeasterntradegroup.com/",
    type: "website",
    images: [
      {
        url: "./assets/images/thumbnail.jpg",
        width: 1200,
        height: 630,
        alt: "THE EASTERN TRADE GROUP",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "THE EASTERN TRADE GROUP",
    description:
      "We believe in innovation and, more importantly, the innovators themselves.",
    images: ["./assets/images/thumbnail.jpg"],
  },
  icons: {
    icon: "./assets/images/thumbnail.jpg",
    shortcut: "./assets/images/thumbnail.jpg",
    apple: "./assets/images/thumbnail.jpg",
  },
  authors: [{ name: "Yahya Gadiid", url: "jadiid.co.uk" }],
  keywords: ["innovation", "trade", "technology", "business"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${assistant.variable} ${bitter.variable} ${inriaSerif.variable} ${barlowCondensed.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
