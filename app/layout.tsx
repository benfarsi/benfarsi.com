import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "benjamin farsijani",
  description: "cs student at the university of ottawa. building software, hardware, and ai systems.",
  metadataBase: new URL("https://benfarsi.com"),
  openGraph: {
    title: "benjamin farsijani",
    description: "cs student at the university of ottawa.",
    url: "https://benfarsi.com",
    siteName: "benfarsi.com",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}

function Nav() {
  return (
    <nav className="layout-nav">
      <div className="layout-nav__inner">
        <Link href="/" className="layout-nav__logo">bf</Link>
        <ul className="layout-nav__links">
          <li><Link className="layout-nav__link" href="/projects">projects</Link></li>
          <li>
            <a className="layout-nav__link layout-nav__link--resume" href="/resume.pdf" target="_blank" rel="noopener noreferrer">
              resume
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="layout-footer">
      <div className="layout-footer__inner">
        <span className="layout-footer__copy">benfarsi.com</span>
        <div className="layout-footer__links">
          <a href="https://github.com/benfarsi" target="_blank" rel="noopener noreferrer">github</a>
          <a href="https://linkedin.com/in/benfarsi" target="_blank" rel="noopener noreferrer">linkedin</a>
          <a href="mailto:farsijaniben@gmail.com">email</a>
        </div>
      </div>
    </footer>
  );
}
