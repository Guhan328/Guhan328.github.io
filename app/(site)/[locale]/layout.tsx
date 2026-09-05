import type { ReactNode } from "react";
import { notFound } from "next/navigation";

import { SiteShell } from "@/components/site-shell";
import { getProfileContent, getUpdatesContent } from "@/lib/content";
import { buildLocalePath, LOCALES, normalizeLocale, type Locale } from "@/lib/locale";
import type { NavItem } from "@/types/navigation";

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

const NAV_ITEMS: Record<Locale, NavItem[]> = {
  en: [
    { label: "Home", href: buildLocalePath("en") },
    { label: "Teaching", href: buildLocalePath("en", "/research") },
    { label: "Publications", href: buildLocalePath("en", "/publications") },
    { label: "Service", href: buildLocalePath("en", "/projects") }
  ],
  zh: [
    { label: "首页", href: buildLocalePath("zh") },
    { label: "教学概览", href: buildLocalePath("zh", "/research") },
    { label: "发表成果", href: buildLocalePath("zh", "/publications") },
    { label: "社会服务", href: buildLocalePath("zh", "/projects") }
  ]
};

export default async function LocaleLayout({
  children,
  params
}: Readonly<{
  children: ReactNode;
  params: { locale: string } | Promise<{ locale: string }>;
}>) {
  const resolvedParams = await params;
  const locale = normalizeLocale(resolvedParams.locale);
  if (!locale) {
    notFound();
  }

  const profile = getProfileContent()[locale];
  const navItems = NAV_ITEMS[locale];
  const lastUpdated = getUpdatesContent()[locale]?.updates?.[0]?.date;

  return (
    <SiteShell navItems={navItems} profile={profile} locale={locale} lastUpdated={lastUpdated}>
      {children}
    </SiteShell>
  );
}
