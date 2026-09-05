import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import "katex/dist/katex.min.css";
import { Providers } from "@/components/providers";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter"
});

export const metadata: Metadata = {
  title: "Guhan Zheng | Academic Homepage",
  description:
    "Associate Professor at Shanghai University, School of Communication and Information Engineering. Research on low-altitude networks, urban air mobility, and goal-oriented communications.",
  openGraph: {
    title: "Guhan Zheng | Academic Homepage",
    description:
      "Associate Professor at Shanghai University. Research on low-altitude networks, urban air mobility, and goal-oriented communications.",
    url: "https://guhan328.github.io",
    siteName: "Guhan Zheng",
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Guhan Zheng | Academic Homepage",
    description:
      "Associate Professor at Shanghai University. Research on low-altitude networks, urban air mobility, and goal-oriented communications."
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
