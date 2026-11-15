import { ArrowUpRight } from 'lucide-react';
import { IMPORT_PROCESS_STEPS } from '../data/siteConfig';

export function ImportProcessSection() {
  return (
    <section
      id="process"
      className="border-t border-white/10 bg-[#0A0D12] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#C9A96E]">
              Importing Process
            </p>
            <h2
              className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white [text-wrap:balance]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              From International Sourcing to Key Handover
            </h2>
          </div>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.14em] uppercase text-[#DFC48E] whitespace-nowrap shrink-0 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-[#C9A96E]"
          >
            <span>Start an Import Inquiry</span>
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-md border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {IMPORT_PROCESS_STEPS.map((item) => (
            <div
              key={item.step}
              className="flex flex-col justify-between bg-[#0E1117] p-7 sm:p-8"
            >
              <div>
                <span className="inline-block text-xs font-medium tracking-[0.22em] text-[#C9A96E] tabular-nums">
                  STEP {item.step}
                </span>
                <h3
                  className="mt-4 text-2xl font-semibold text-white leading-snug"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#B8C0CC]">
                  {item.description}
                </p>
              </div>
              <div className="mt-8 h-[1px] w-10 bg-[#C9A96E]/45" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
