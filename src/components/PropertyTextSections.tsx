"use client";

import { useState } from "react";

interface Section {
  id: string;
  title: string;
  content: string | null | undefined;
  /** Optionaler Hinweis (z. B. Region) */
  hint?: string;
}

interface PropertyTextSectionsProps {
  sections: Section[];
}

export function PropertyTextSections({ sections }: PropertyTextSectionsProps) {
  const [openId, setOpenId] = useState<string | null>(
    sections[0]?.content?.trim() ? sections[0].id : null
  );

  const visible = sections.filter((s) => s.content?.trim());

  if (visible.length === 0) return null;

  return (
    <div className="space-y-2">
      {visible.map((section) => {
        const isOpen = openId === section.id;
        return (
          <div
            key={section.id}
            className="overflow-hidden rounded-xl border border-zinc-200 bg-white"
          >
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : section.id)}
              className="flex w-full items-center justify-between px-5 py-4 text-left font-medium text-zinc-900 transition hover:bg-zinc-50"
              aria-expanded={isOpen}
            >
              <span>{section.title}</span>
              <svg
                className={`h-5 w-5 shrink-0 text-zinc-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {isOpen && (
              <div className="border-t border-zinc-100 px-5 py-4">
                {section.hint && (
                  <p className="mb-3 text-sm font-medium text-amber-700">
                    {section.hint}
                  </p>
                )}
                <div className="whitespace-pre-line text-zinc-600 leading-relaxed">
                  {section.content?.trim()}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
