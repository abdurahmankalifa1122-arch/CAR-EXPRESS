import { SHOWROOM_MEDIA } from '../data/assets';
import { WHY_CHOOSE_ITEMS } from '../data/siteConfig';
import { ContactConfig } from '../types/showroom';

interface AboutAndWhySectionProps {
  config: ContactConfig;
}

export function AboutAndWhySection({ config }: AboutAndWhySectionProps) {
  return (
    <>
      {/* About CAR EXPRESS */}
      <section
        id="about"
        className="border-t border-white/10 bg-[#0A0D12] py-20 sm:py-28"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-stretch lg:gap-12">
            {/* Editorial Detail Image */}
            <div className="lg:col-span-6 overflow-hidden rounded-md border border-white/10 bg-[#141820]">
              <img
                src={SHOWROOM_MEDIA.atelierDetail}
                alt="Precision luxury vehicle headlamp and alloy wheel inside CAR EXPRESS inspection bay"
                referrerPolicy="no-referrer"
                className="h-72 sm:h-96 w-full lg:h-full object-cover"
              />
            </div>

            {/* Editorial Narrative (No invented history or stats) */}
            <div className="lg:col-span-6 flex flex-col justify-center py-2 lg:py-6">
              <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#C9A96E]">
                About CAR EXPRESS
              </p>

              <h2
                className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white leading-[1.12] [text-wrap:balance]"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {config.aboutHeadline}
              </h2>

              <p className="mt-6 text-base leading-relaxed text-[#B8C0CC]">
                {config.aboutDescription}
              </p>

              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-white/10 pt-8">
                <div>
                  <p className="text-xs font-medium tracking-[0.14em] uppercase text-[#C9A96E]">
                    Core Focus
                  </p>
                  <p className="mt-2 text-sm text-[#E4E7EC] leading-relaxed">
                    Direct vehicle importation and tailored automotive sales in Ethiopia.
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium tracking-[0.14em] uppercase text-[#C9A96E]">
                    Client Commitment
                  </p>
                  <p className="mt-2 text-sm text-[#E4E7EC] leading-relaxed">
                    Clear communication, verified specifications, and direct delivery support.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section
        id="why-choose-us"
        className="border-t border-white/10 bg-[#07090C] py-20 sm:py-28"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#C9A96E]">
                Why Choose Us
              </p>
              <h2
                className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight text-white [text-wrap:balance]"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Built Around Clarity and Standards
              </h2>
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#B8C0CC]">
                Purchasing an imported vehicle requires trust at every checkpoint. We structure each step around transparent communication.
              </p>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {WHY_CHOOSE_ITEMS.map((item) => (
                <div
                  key={item.number}
                  className="rounded-md border border-white/10 bg-[#0E1117] p-7 transition-colors duration-150 hover:border-[#C9A96E]/40"
                >
                  <p className="text-xs font-medium tracking-[0.2em] text-[#C9A96E] tabular-nums">
                    {item.number}
                  </p>
                  <h3
                    className="mt-3 text-2xl font-semibold text-white"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#B8C0CC]">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
