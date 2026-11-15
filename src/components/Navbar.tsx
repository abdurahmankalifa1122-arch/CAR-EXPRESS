import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

const NAV_LINKS = [
  { label: 'Collection', href: '#collection' },
  { label: 'About', href: '#about' },
  { label: 'Import Process', href: '#process' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLinkClick = () => {
    setMobileOpen(false);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-colors duration-200 ${
        scrolled || mobileOpen
          ? 'bg-[#07090C]/92 backdrop-blur-md border-b border-white/10'
          : 'bg-gradient-to-b from-[#07090C]/85 to-transparent border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 md:h-20 max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Official Brand Logo + Wordmark */}
        <a
          href="#top"
          aria-label="CAR EXPRESS Home"
          className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C9A96E] rounded-md shrink-0"
        >
          <BrandLogo variant="navbar" />
        </a>

        {/* Zone 2: 5 concise single-line nav links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#B8C0CC]"
        >
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative py-1 whitespace-nowrap shrink-0 transition-colors duration-150 hover:text-white after:absolute after:inset-x-0 after:bottom-0 after:h-[1px] after:bg-[#C9A96E] after:scale-x-0 after:origin-left after:transition-transform after:duration-200 hover:after:scale-x-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C9A96E]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Primary Action + Mobile Menu Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#contact"
            className="hidden md:inline-flex items-center justify-center rounded-sm border border-[#C9A96E]/70 bg-[#C9A96E]/10 px-5 py-2.5 text-xs font-semibold tracking-[0.14em] uppercase text-[#DFC48E] whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-[#C9A96E] hover:text-[#07090C] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A96E]"
          >
            Inquire Now
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex md:hidden h-11 w-11 items-center justify-center rounded-sm border border-white/15 bg-[#0E1117]/80 text-white transition-colors hover:border-[#C9A96E]/60 focus-visible:outline-2 focus-visible:outline-[#C9A96E]"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Panel */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#07090C]/98 px-4 pb-6 pt-4">
          <nav aria-label="Mobile Navigation" className="flex flex-col gap-1">
            {NAV_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={handleLinkClick}
                className="flex min-h-[44px] items-center border-b border-white/5 px-2 text-base font-medium text-[#E4E7EC] transition-colors hover:text-[#DFC48E]"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={handleLinkClick}
              className="mt-4 inline-flex min-h-[44px] items-center justify-center rounded-sm bg-[#C9A96E] px-5 py-3 text-xs font-semibold tracking-[0.16em] uppercase text-[#07090C] transition-colors hover:bg-[#DFC48E]"
            >
              Contact Us
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
