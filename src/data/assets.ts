import officialLogo from '../assets/logo.png';
import heroLuxuryVehicle from '../assets/images/hero_luxury_vehicle_1794745197513.jpg';
import suvShowcase from '../assets/images/car_suv_executive_1794745197861.jpg';
import sedanShowcase from '../assets/images/car_sedan_executive_1794745197882.jpg';
import luxuryShowcase from '../assets/images/car_luxury_flagship_1794745198790.jpg';
import familyShowcase from '../assets/images/car_family_crossover_1794745199360.jpg';
import atelierDetail from '../assets/images/showroom_atelier_detail_1794745199856.jpg';

export const OFFICIAL_LOGO_SRC = officialLogo;
export const OFFICIAL_LOGO_FALLBACK = 'https://i.ibb.co/yn3Bxcvd/image.png';

export const SHOWROOM_MEDIA = {
  hero: heroLuxuryVehicle,
  atelierDetail,
  presets: {
    SUVs: suvShowcase,
    Sedans: sedanShowcase,
    'Luxury Vehicles': luxuryShowcase,
    'Family Cars': familyShowcase,
  },
} as const;
