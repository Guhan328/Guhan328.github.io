"use client";

import { Section } from "@/components/section";

type Locale = "en" | "zh";

type AcademicServices = {
  editor: { title: string; items: string[] };
  conferenceChairs: { title: string; items: string[] };
  talks: { title: string; items: string[] };
  journalReviewers: { title: string; items: string[] };
};

type ProjectsClientProps = {
  locale: Locale;
  services: AcademicServices;
  page: { title: string; eyebrow: string };
};

export function ProjectsClient({ locale, services, page }: ProjectsClientProps) {
  const sections = [
    { key: "editor", data: services.editor },
    { key: "conferenceChairs", data: services.conferenceChairs },
    { key: "talks", data: services.talks },
    { key: "journalReviewers", data: services.journalReviewers }
  ];

  return (
    <div className="space-y-16">
      {/* 简洁标题，无大白框 */}
      <div>
        <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">
          {page.title}
        </h1>
        <p className="mt-2 text-base text-slate-600 dark:text-slate-400">
          Editorial, conference chair, and reviewing activities
        </p>
      </div>

      {sections.map(({ key, data }) => {
        if (!data || !data.items || data.items.length === 0) return null;
        return (
          <Section key={key} title={data.title} eyebrow=" ">
            <ul className="space-y-2 pl-4">
              {data.items.map((item: string, idx: number) => (
                <li key={idx} className="text-base text-slate-700 dark:text-slate-300 leading-relaxed list-disc">
                  {item}
                </li>
              ))}
            </ul>
          </Section>
        );
      })}
    </div>
  );
}
