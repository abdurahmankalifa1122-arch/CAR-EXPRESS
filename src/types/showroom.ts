export type VehicleCategory =
  | 'SUVs'
  | 'Sedans'
  | 'Luxury Vehicles'
  | 'Family Cars';

export interface VehicleListing {
  id: string;
  category: VehicleCategory;
  brand: string;
  model: string;
  year: string;
  engineTransmission: string;
  fuelType: string;
  mileageKm?: number | null;
  priceEtb?: number | null;
  imageUrl: string;
  /**
   * Indicates an editable showcase template rather than live priced dealer stock.
   * Owners can set this to false when publishing real incoming or showroom inventory.
   */
  isShowcaseTemplate?: boolean;
}

export interface ContactConfig {
  companyName: string;
  locationEthiopia: string;
  showroomDistrict: string;
  phone: string;
  whatsappNumber: string;
  email: string;
  hours: string;
  aboutHeadline: string;
  aboutDescription: string;
}

export interface WhyChooseItem {
  number: string;
  title: string;
  description: string;
}

export interface ImportStep {
  step: string;
  title: string;
  description: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}
