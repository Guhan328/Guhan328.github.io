import { notFound } from "next/navigation";

import { ProjectsClient } from "./projects-client";

import { getProjectsContent } from "@/lib/content";
import { normalizeLocale } from "@/lib/locale";

type PageProps = {
  params: { locale: string } | Promise<{ locale: string }>;
};

export default async function ProjectsPage({ params }: PageProps) {
  const resolvedParams = await params;
  const locale = normalizeLocale(resolvedParams.locale);
  if (!locale) {
    notFound();
  }

  const content = getProjectsContent()[locale] as any;
  const services = content.academicServices;
  const page = content.page || { title: "Academic Services", eyebrow: "Editorial & Reviewing" };

  return <ProjectsClient locale={locale} services={services} page={page} />;
}
