
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { motion } from "framer-motion";
import Sidebar from "@/components/Sidebar";
import type { Metadata } from "next";
import { GoogleAnalytics } from "./analytics";

const siteUrl = "https://josiah-portfolio1.vercel.app";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Josiah Aideloje — Full-Stack Web Developer in Nigeria",
    template: "%s | Josiah Aideloje",
  },
  description:
    "Portfolio of Josiah Aideloje, a Nigeria-based full-stack web developer specializing in React, Next.js, Node, and scalable web apps.",
  keywords: [
    "Josiah Aideloje",
    "Nigeria web developer",
    "Lagos web developer",
    "React developer Nigeria",
    "Next.js developer",
    "Full-Stack Developer",
    "TypeScript Developer", 
    "Portfolio",
    "Frontend Developer",
    "Backend Developer",
  ],
  authors: [{ name: "Josiah Aideloje", url: siteUrl }],
  creator: "Josiah Aideloje",
  publisher: "Josiah Aideloje",
  alternates: { canonical: siteUrl },
  openGraph: {
    url: siteUrl,
    title: "Josiah Aideloje — Full-Stack Web Developer in Nigeria",
    description:
      "React/Next.js developer building fast, accessible web apps for startups and SMEs.",
    siteName: "Josiah Aideloje",
    locale: "en_NG",
    type: "website",
    images: [
      {
        url: `${siteUrl}/porfolio pic.png`,
        width: 1200,
        height: 630,
        alt: "Josiah Aideloje Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Josiah Aideloje | Full-Stack Developer Portfolio",
    description:
      "Full-stack developer specializing in Next.js, TypeScript, and modern web development in Nigeria.",
    images: [`${siteUrl}/porfolio pic.png`],
    creator: "@JAideloje47355",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-site-verification-code", // Add after setting up Google Search Console
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* You can uncomment and add your Google Analytics ID once you have it */}
        {/* <GoogleAnalytics id="G-XXXXXXXXXX" /> */}
        <main className="">{children}</main>
      </body>
    </html>
  );
}
