
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { motion } from "framer-motion";
import Sidebar from "@/components/Sidebar";
import type { Metadata } from "next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Josiah Aideloje | Full-Stack Developer Portfolio",
  description:
    "Full-stack developer specializing in Next.js, TypeScript, and modern web development. View my projects including e-commerce platforms, CBT software, and interactive portfolios.",
  keywords: [
    "Josiah Aideloje",
    "Full-Stack Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "React Developer",
    "Web Developer Lagos",
    "Portfolio",
    "Frontend Developer",
    "Backend Developer",
  ],
  authors: [{ name: "Josiah Aideloje" }],
  creator: "Josiah Aideloje",
  publisher: "Josiah Aideloje",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://josiah-portfolio1.vercel.app/",
    title: "Josiah Aideloje | Full-Stack Developer Portfolio",
    description:
      "Full-stack developer specializing in Next.js, TypeScript, and modern web development.",
    siteName: "Josiah Aideloje Portfolio",
    images: [
      {
        url: "/og-image.jpg", // Add this image to your public folder
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
      "Full-stack developer specializing in Next.js, TypeScript, and modern web development.",
    images: ["/og-image.jpg"],
    creator: "@JAideloje47355", // Your Twitter handle
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
        <main className="">{children}</main>
      </body>
    </html>
  );
}
