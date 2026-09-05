import { notFound } from "next/navigation";

import { Section } from "@/components/section";
import { Timeline } from "@/components/timeline";
import { getResearchContent } from "@/lib/content";
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

  return (
    <div className="space-y-16">
      <Section title="Teaching" eyebrow="Courses & Mentoring">
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
