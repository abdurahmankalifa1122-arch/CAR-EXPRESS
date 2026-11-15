import { ContactConfig } from '../types/showroom';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  config: ContactConfig;
}

export function Footer({ config }: FooterProps) {
  return (
    <footer className="border-t border-white/10 bg-[#050608] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          {/* Premium Official Logo Showcase */}
          <div className="md:col-span-5">
            <BrandLogo variant="footer" />
            <h3
              className="mt-5 text-2xl font-semibold tracking-[0.12em] text-white"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {config.companyName}
            </h3>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-[#94A3B8]">
              Automotive importing and vehicle sales showroom serving discerning drivers across Ethiopia.
            </p>
          </div>

          {/* Navigation Mirror */}
          <div className="md:col-span-3">
            <p className="text-xs font-medium tracking-[0.16em] uppercase text-[#C9A96E]">
              Showroom
            </p>
            <ul className="mt-4 space-y-3 text-sm text-[#B8C0CC]">
              <li>
                <a href="#collection" className="hover:text-white transition-colors">
                  Vehicle Collection
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  About CAR EXPRESS
                </a>
              </li>
              <li>
                <a href="#why-choose-us" className="hover:text-white transition-colors">
                  Why Choose Us
                </a>
              </li>
              <li>
                <a href="#process" className="hover:text-white transition-colors">
                  Importing Process
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </a>
              </li>
            </ul>
          </div>

          {/* Location & Contact Summary */}
          <div className="md:col-span-4">
            <p className="text-xs font-medium tracking-[0.16em] uppercase text-[#C9A96E]">
              Ethiopia Showroom
            </p>
            <div className="mt-4 space-y-2.5 text-sm text-[#B8C0CC]">
              <p className="font-medium text-white">{config.locationEthiopia}</p>
              <p>{config.showroomDistrict}</p>
              {config.phone && (
                <p className="tabular-nums">Phone: {config.phone}</p>
              )}
              {config.whatsappNumber && (
                <p className="tabular-nums">WhatsApp: {config.whatsappNumber}</p>
              )}
              {config.email && <p>Email: {config.email}</p>}
              {config.hours && <p>{config.hours}</p>}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-xs text-[#64748B] sm:flex-row sm:items-center">
          <p>&copy; {new Date().getFullYear()} {config.companyName}. All rights reserved.</p>
          <p>Ethiopia · Automotive Import &amp; Vehicle Sales</p>
        </div>
      </div>
    </footer>
  );
}
