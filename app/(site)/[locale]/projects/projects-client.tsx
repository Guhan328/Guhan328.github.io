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
      <section className="space-y-4 rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-white p-8 shadow-[0_24px_60px_-45px_rgba(30,64,175,0.45)] dark:border-slate-800 dark:bg-gradient-to-br dark:from-slate-900/80 dark:via-slate-900/60 dark:to-slate-900/40">
        <h1 className="text-3xl font-semibold text-blue-900 dark:text-white">{page.title}</h1>
        <p className="text-base leading-relaxed text-blue-900/70 dark:text-slate-300">
          Editorial, conference chair, and reviewing activities
        </p>
      </section>

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
