import { VehicleListing } from '../types/showroom';
import { SHOWROOM_MEDIA } from './assets';

/**
 * Easy-to-update vehicle catalog for CAR EXPRESS.
 *
 * To publish live inventory in your repository:
 * 1. Update or add vehicle objects in DEFAULT_VEHICLES below (or use the in-app
 *    "Manage Listings" editor and export your updated JSON/TypeScript).
 * 2. Set `priceEtb` to a number (e.g. 12500000) to display an ETB price, or `null`
 *    to display "Contact for Price".
 * 3. Set `mileageKm` only when mileage applies; omit or leave `null` when unavailable.
 */
export const DEFAULT_VEHICLES: VehicleListing[] = [
  {
    id: 'showcase-suv-01',
    category: 'SUVs',
    brand: 'Executive 4x4',
    model: 'Full-Size Luxury SUV',
    year: 'By Order (Latest Spec)',
    engineTransmission: '3.0L Turbo Inline-6 · Automatic AWD',
    fuelType: 'Petrol / Mild-Hybrid',
    mileageKm: null,
    priceEtb: null,
    imageUrl: SHOWROOM_MEDIA.presets.SUVs,
    isShowcaseTemplate: true,
  },
  {
    id: 'showcase-sedan-01',
    category: 'Sedans',
    brand: 'Executive Saloon',
    model: 'Signature Business Sedan',
    year: 'By Order (Latest Spec)',
    engineTransmission: '2.5L / 3.5L · 8-Speed Automatic',
    fuelType: 'Hybrid / Petrol',
    mileageKm: null,
    priceEtb: null,
    imageUrl: SHOWROOM_MEDIA.presets.Sedans,
    isShowcaseTemplate: true,
  },
  {
    id: 'showcase-luxury-01',
    category: 'Luxury Vehicles',
    brand: 'Flagship Class',
    model: 'Chauffeur Luxury Saloon',
    year: 'By Order (Latest Spec)',
    engineTransmission: '3.0L / 4.0L V8 · 9-Speed Automatic',
    fuelType: 'Petrol / Plug-in Hybrid',
    mileageKm: null,
    priceEtb: null,
    imageUrl: SHOWROOM_MEDIA.presets['Luxury Vehicles'],
    isShowcaseTemplate: true,
  },
  {
    id: 'showcase-family-01',
    category: 'Family Cars',
    brand: 'Three-Row Touring',
    model: '7-Seater Family Crossover',
    year: 'By Order (Latest Spec)',
    engineTransmission: '2.0L Turbo / Hybrid · Automatic',
    fuelType: 'Hybrid / Petrol',
    mileageKm: null,
    priceEtb: null,
    imageUrl: SHOWROOM_MEDIA.presets['Family Cars'],
    isShowcaseTemplate: true,
  },
];
