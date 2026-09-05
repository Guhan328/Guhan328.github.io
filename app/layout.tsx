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
  title: "郑谷寒-上海大学",
  description: "上海大学通信与信息工程学院副教授。研究方向：低空通信网络、城市空中交通、面向任务的通信。",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg"
  },
  openGraph: {
    title: "郑谷寒-上海大学",  // 👈 改这里
    description: "上海大学通信与信息工程学院副教授。",
    url: "https://guhan328.github.io",
    siteName: "郑谷寒-上海大学",  // 👈 改这里
    locale: "zh_CN",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "郑谷寒-上海大学",  // 👈 改这里
    description: "上海大学通信与信息工程学院副教授。"
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
