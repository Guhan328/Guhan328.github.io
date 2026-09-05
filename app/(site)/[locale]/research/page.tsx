import { notFound } from "next/navigation";

import { Section } from "@/components/section";
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

  const content = getResearchContent()[locale] as any;
  const teaching = content.teaching;
  const page = content.page || { title: "Teaching", eyebrow: "Courses & Mentoring" };

  return (
    <div className="space-y-16">
      <Section title={page.title} eyebrow={page.eyebrow}>
        <div className="space-y-8">
          {teaching.institutions.map((inst: any, idx: number) => (
            <div key={idx} className="space-y-3">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50">
                {inst.name}
              </h3>

              {inst.students && inst.students.length > 0 && (
                <div className="space-y-4 pl-4">
                  {inst.students.map((group: any, gIdx: number) => (
                    <div key={gIdx}>
                      <h4 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-600 dark:text-slate-400">
                        {group.type}
                      </h4>
                      <ul className="mt-1 space-y-2 pl-4">
                        {group.list.map((item: any, iIdx: number) => (
                          <li key={iIdx} className="text-base text-slate-700 dark:text-slate-300">
                            <div className="font-medium text-slate-900 dark:text-slate-50">
                              {item.name}
                            </div>
                            {item.detail && (
                              <div className="text-sm text-slate-600 dark:text-slate-400">
                                {item.detail}
                              </div>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  {inst.note && (
                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 italic">
                      {inst.note}
                    </p>
                  )}
                </div>
              )}

              {inst.courses && inst.courses.length > 0 && (
                <div className="pl-4">
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {inst.note || "Seminar and lab tutor for:"}
                  </p>
                  <ul className="mt-1 space-y-1 pl-4">
                    {inst.courses.map((course: string, cIdx: number) => (
                      <li key={cIdx} className="text-base text-slate-700 dark:text-slate-300">
                        {course}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
