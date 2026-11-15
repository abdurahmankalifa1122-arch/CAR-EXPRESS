import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { SHOWROOM_MEDIA } from '../data/assets';

export function HeroSection() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen w-full items-end md:items-center overflow-hidden bg-[#07090C] pt-20"
    >
      {/* Full-bleed luxury automotive backdrop */}
      <div className="absolute inset-0 z-0">
        <img
          src={SHOWROOM_MEDIA.hero}
          alt="Luxury flagship SUV inside a dark architectural CAR EXPRESS showroom"
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover object-center"
        />
        {/* Measured contrast scrims for crisp WCAG AA+ readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#07090C]/95 via-[#07090C]/70 to-[#07090C]/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07090C] via-transparent to-[#07090C]/60" />
      </div>

      {/* Editorial Foreground */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-16 pt-12 sm:px-6 md:py-24 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl"
        >
          <p className="mb-4 text-xs font-medium tracking-[0.22em] uppercase text-[#C9A96E]">
            Ethiopia · Automotive Import &amp; Sales
          </p>

          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white leading-[1.06] [text-wrap:balance]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            DRIVE YOUR NEXT DREAM.
          </h1>

          <p className="mt-5 max-w-xl text-base sm:text-lg leading-relaxed text-[#D0D5DD]">
            Discover exceptional vehicles. Experience a smarter way to buy your next car in Ethiopia.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#collection"
              className="inline-flex min-h-[46px] items-center justify-center gap-2.5 rounded-sm bg-[#C9A96E] px-7 py-3 text-xs font-semibold tracking-[0.16em] uppercase text-[#07090C] whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-[#DFC48E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A96E]"
            >
              <span>EXPLORE CARS</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>

            <a
              href="#contact"
              className="inline-flex min-h-[46px] items-center justify-center rounded-sm border border-[#B8C0CC]/45 bg-[#07090C]/55 px-7 py-3 text-xs font-semibold tracking-[0.16em] uppercase text-white backdrop-blur-sm whitespace-nowrap shrink-0 transition-colors duration-150 hover:border-[#C9A96E] hover:text-[#DFC48E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A96E]"
            >
              CONTACT US
            </a>
          </div>
        </motion.div>

        {/* Minimal showroom anchor strip along bottom hairline */}
        <div className="mt-14 md:mt-20 border-t border-white/12 pt-6 grid grid-cols-2 sm:grid-cols-4 gap-6 text-xs text-[#B8C0CC]">
          <div>
            <p className="text-[#C9A96E] font-medium tracking-wider uppercase">Categories</p>
            <p className="mt-1 text-white/90">SUVs · Sedans · Luxury · Family</p>
          </div>
          <div>
            <p className="text-[#C9A96E] font-medium tracking-wider uppercase">Sourcing</p>
            <p className="mt-1 text-white/90">International Direct Import</p>
          </div>
          <div>
            <p className="text-[#C9A96E] font-medium tracking-wider uppercase">Pricing</p>
            <p className="mt-1 text-white/90">Transparent ETB Quotations</p>
          </div>
          <div>
            <p className="text-[#C9A96E] font-medium tracking-wider uppercase">Consultation</p>
            <p className="mt-1 text-white/90">Direct WhatsApp Concierge</p>
          </div>
        </div>
      </div>
    </section>
  );
}
