import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Forty | Creative + Growth Hacking by Ex-Googlers",
  description:
    "Founded by two ex-Googlers, Forty brings bold creative ideas and performance marketing expertise to help businesses not just be seen — but remembered. Delhi & New York.",
  keywords: [
    "performance marketing",
    "creative agency",
    "growth hacking",
    "ex-Google",
    "brand strategy",
    "ad campaigns",
    "UI/UX design",
    "SEO",
    "lead generation",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
