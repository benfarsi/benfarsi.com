import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ben Farsijani",
  description: "Computer Science at uOttawa. Building systems at the intersection of data, intelligence, and control.",
  metadataBase: new URL("https://benfarsi.com"),
  openGraph: {
    title: "Ben Farsijani",
    description: "Computer Science at uOttawa. Building systems at the intersection of data, intelligence, and control.",
    url: "https://benfarsi.com",
    siteName: "benfarsi.com",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
