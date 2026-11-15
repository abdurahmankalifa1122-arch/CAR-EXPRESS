import { useState } from 'react';
import { OFFICIAL_LOGO_FALLBACK, OFFICIAL_LOGO_SRC } from '../data/assets';

interface BrandLogoProps {
  variant: 'navbar' | 'footer';
}

export function BrandLogo({ variant }: BrandLogoProps) {
  const [src, setSrc] = useState(OFFICIAL_LOGO_SRC);

  const handleError = () => {
    if (src !== OFFICIAL_LOGO_FALLBACK) {
      setSrc(OFFICIAL_LOGO_FALLBACK);
    }
  };

  if (variant === 'navbar') {
    return (
      <div className="flex items-center gap-3 shrink-0">
        <div className="h-11 w-11 shrink-0 rounded-md border border-[#C9A96E]/45 bg-[#1B2228] p-0.5 shadow-md">
          <img
            src={src}
            alt="CAR EXPRESS official emblem"
            onError={handleError}
            referrerPolicy="no-referrer"
            className="h-full w-full object-contain rounded-[4px]"
          />
        </div>
        <span
          className="text-lg sm:text-xl font-semibold tracking-[0.14em] text-white whitespace-nowrap shrink-0"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          CAR EXPRESS
        </span>
      </div>
    );
  }

  return (
    <div className="inline-flex flex-col items-start gap-4">
      <div className="relative rounded-xl border border-[#C9A96E]/40 bg-[#182026] p-2 shadow-[0_20px_50px_rgba(0,0,0,0.65)]">
        <div className="h-28 w-28 sm:h-32 sm:w-32 overflow-hidden rounded-lg bg-[#1B2228]">
          <img
            src={src}
            alt="CAR EXPRESS official brand logo"
            onError={handleError}
            referrerPolicy="no-referrer"
            className="h-full w-full object-contain"
          />
        </div>
      </div>
    </div>
  );
}
