import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQ_ITEMS } from '../data/siteConfig';

export function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0]?.id ?? null);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="faq"
      className="border-t border-white/10 bg-[#07090C] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#C9A96E]">
              Frequently Asked Questions
            </p>
            <h2
              className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight text-white [text-wrap:balance]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Answers Before You Commit
            </h2>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#B8C0CC]">
              Clear information on ETB quotations, custom vehicle requests, inspection standards, and delivery in Ethiopia.
            </p>
          </div>

          <div className="lg:col-span-8 divide-y divide-white/10 border-y border-white/10">
            {FAQ_ITEMS.map((item) => {
              const isOpen = openId === item.id;
              return (
                <div key={item.id} className="py-1">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => toggleItem(item.id)}
                    className="flex w-full min-h-[56px] items-center justify-between gap-6 py-4 text-left transition-colors hover:text-[#DFC48E] focus-visible:outline-2 focus-visible:outline-[#C9A96E]"
                  >
                    <span className="text-base sm:text-lg font-medium text-white">
                      {item.question}
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-[#C9A96E] transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                  {isOpen && (
                    <div className="pb-5 pr-8 text-sm sm:text-base leading-relaxed text-[#B8C0CC]">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
