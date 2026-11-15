import { VehicleListing } from '../types/showroom';

export function normalizeWhatsAppDigits(raw: string): string {
  return raw.replace(/[^\d]/g, '');
}

export function buildWhatsAppUrl(
  whatsappNumber: string,
  message: string
): string | null {
  const digits = normalizeWhatsAppDigits(whatsappNumber);
  if (digits.length < 7) return null;
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export function buildVehicleInquiryMessage(vehicle: VehicleListing): string {
  const parts = [
    `Hello CAR EXPRESS, I would like to inquire about:`,
    `Vehicle: ${vehicle.brand} ${vehicle.model}`,
    `Category: ${vehicle.category}`,
    `Model Year: ${vehicle.year}`,
    `Engine & Transmission: ${vehicle.engineTransmission}`,
    `Fuel Type: ${vehicle.fuelType}`,
  ];

  if (typeof vehicle.mileageKm === 'number' && vehicle.mileageKm >= 0) {
    parts.push(`Mileage: ${vehicle.mileageKm.toLocaleString('en-US')} km`);
  }

  if (typeof vehicle.priceEtb === 'number' && vehicle.priceEtb > 0) {
    parts.push(`Listed Price: ETB ${vehicle.priceEtb.toLocaleString('en-US')}`);
  } else {
    parts.push(`Price: Requesting quotation in ETB`);
  }

  return parts.join('\n');
}

export function formatEtbPrice(priceEtb?: number | null): string {
  if (typeof priceEtb === 'number' && priceEtb > 0) {
    return `ETB ${priceEtb.toLocaleString('en-US')}`;
  }
  return 'Contact for Price';
}

export function formatMileage(mileageKm?: number | null): string | null {
  if (typeof mileageKm === 'number' && mileageKm >= 0) {
    return `${mileageKm.toLocaleString('en-US')} km`;
  }
  return null;
}
