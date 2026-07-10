import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import siteData from "../content/site.json";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: siteData.title,
  description: siteData.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased overflow-x-hidden`}
      style={{ backgroundColor: '#0C0C0C' }}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col overflow-x-hidden" style={{ backgroundColor: '#0C0C0C' }}>{children}</body>
    </html>
  );
}
