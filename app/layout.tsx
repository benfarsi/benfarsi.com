import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Benjamin Farsijani",
  description:
    "CS student at the University of Ottawa. Building software, hardware, and AI systems.",
  metadataBase: new URL("https://benfarsi.com"),
  openGraph: {
    title: "Benjamin Farsijani",
    description: "CS student at the University of Ottawa.",
    url: "https://benfarsi.com",
    siteName: "Benjamin Farsijani",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
