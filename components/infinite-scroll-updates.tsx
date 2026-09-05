"use client";

import { useState } from "react";
import type { UpdateEntry } from "@/lib/content-types";

type InfiniteScrollUpdatesProps = {
  updates: UpdateEntry[];
};

export function InfiniteScrollUpdates({ updates }: InfiniteScrollUpdatesProps) {
  const [visibleCount, setVisibleCount] = useState(5);

  const visibleUpdates = updates.slice(0, visibleCount);
  const hasMore = visibleCount < updates.length;

  const loadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 5, updates.length));
  };

  return (
    <div className="space-y-4">
      <ul className="space-y-3">
        {visibleUpdates.map((update, index) => (
          <li
            key={`${update.date}-${index}`}
            className="flex flex-col gap-1 border-b border-slate-200 pb-3 last:border-b-0 last:pb-0 dark:border-slate-700"
          >
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                {update.date}
              </span>
            </div>
            <span className="text-base font-medium text-slate-900 dark:text-slate-50">
              {update.title}
            </span>
            {update.summary && (
              <span className="text-sm text-slate-600 dark:text-slate-400">
                {update.summary}
              </span>
            )}
          </li>
        ))}
      </ul>
      {hasMore && (
        <button
          onClick={loadMore}
          className="mt-2 text-sm font-medium text-brand hover:text-brand-foreground"
        >
          Load more
        </button>
      )}
    </div>
  );
}
