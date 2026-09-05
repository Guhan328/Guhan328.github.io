import { notFound } from "next/navigation";

import { Section } from "@/components/section";
import { Timeline } from "@/components/timeline";
import { getResearchContent, getResearchPageCopy } from "@/lib/content";
import { normalizeLocale } from "@/lib/locale";

type PageProps = {
  params: { locale: string } | Promise<{ locale: string }>;
};

export default async function ResearchPage({ params }: PageProps) {
  const resolvedParams = await params;
  const locale = normalizeLocale(resolvedParams.locale);
  if (!locale) {
    notFound();
  }

  const { experiences } = getResearchContent()[locale];
  const t = getResearchPageCopy()[locale];

  return (
    <div className="space-y-16">
      <section className="space-y-4 rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-white p-8 shadow-[0_24px_60px_-45px_rgba(30,64,175,0.45)] dark:border-slate-800 dark:bg-gradient-to-br dark:from-slate-900/80 dark:via-slate-900/60 dark:to-slate-900/40">
        <h1 className="text-3xl font-semibold text-blue-900 dark:text-white">Education</h1>
        <p className="text-base leading-relaxed text-blue-900/70 dark:text-slate-300">My academic journey</p>
      </section>

      <Section title="Education" eyebrow="Background">
        <Timeline
          items={experiences.map((item) => ({
            title: `${item.title} · ${item.role}`,
            period: item.period,
            location: [item.advisor, item.funding].filter(Boolean).join(" · ") || undefined,
            details: [item.summary, ...item.bullets]
          }))}
        />
      </Section>
    </div>
  );
}
