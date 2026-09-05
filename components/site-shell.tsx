import { Fragment } from "react";

import { ExternalLinkIcon } from "@/components/icons";
import type { Locale } from "@/lib/locale";

type SiteFooterProps = {
  locale: Locale;
  lastUpdated?: string;
};

// 获取当前构建日期（每次构建时生成）
const currentDate = new Date().toISOString().split("T")[0];

export function SiteFooter({ locale, lastUpdated }: SiteFooterProps) {
  const displayDate = lastUpdated || currentDate;

  return (
    <footer className="mt-16 border-t border-slate-200 py-6 text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 md:px-8 xl:max-w-7xl xl:px-10 2xl:max-w-[1500px] 2xl:px-12">
        <div className="flex items-center gap-2">
          <span>上次更新：{displayDate}</span>
        </div>
        {/* 右侧可以留空，或者添加其他内容 */}
        <div />
      </div>
    </footer>
  );
}
