import {
  Inria_Serif,
  Assistant,
  Barlow_Condensed,
  Inter,
  Bitter
} from "next/font/google";

export const bitter = Bitter({
  subsets: ["latin"],
  weight: ["300", "400", "100", "200", "500", "600", "800", "900", "700"],
  variable: "--font-bitter",
});

export const inriaSerif = Inria_Serif({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-inria-serif",
});

export const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "100", "200", "500", "600", "800", "900", "700"],
  variable: "--font-inria-serif",
});

export const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["300", "400", "100", "200", "500", "600", "800", "900", "700"],
  variable: "--font-barlow-condensed",
});

export const assistant = Assistant({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-assistant",
});
