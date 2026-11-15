import { useState } from 'react';
import { CarFront, MessageCircle, Plus, SlidersHorizontal, Pencil } from 'lucide-react';
import { VEHICLE_CATEGORIES } from '../data/siteConfig';
import { VehicleCategory, VehicleListing } from '../types/showroom';
import {
  buildVehicleInquiryMessage,
  buildWhatsAppUrl,
  formatEtbPrice,
  formatMileage,
} from '../utils/whatsapp';

interface VehicleCollectionSectionProps {
  vehicles: VehicleListing[];
  whatsappNumber: string;
  onOpenManager: (vehicleToEdit?: VehicleListing) => void;
  onRequestUnconfiguredInquiry: (vehicle: VehicleListing) => void;
}

function VehicleCard({
  vehicle,
  whatsappNumber,
  onEdit,
  onRequestUnconfiguredInquiry,
}: {
  vehicle: VehicleListing;
  whatsappNumber: string;
  onEdit: (vehicle: VehicleListing) => void;
  onRequestUnconfiguredInquiry: (vehicle: VehicleListing) => void;
}) {
  const [imgFailed, setImgFailed] = useState(false);

  const mileageLabel = formatMileage(vehicle.mileageKm);
  const priceLabel = formatEtbPrice(vehicle.priceEtb);
  const hasNumericPrice = typeof vehicle.priceEtb === 'number' && vehicle.priceEtb > 0;
  const whatsappUrl = buildWhatsAppUrl(
    whatsappNumber,
    buildVehicleInquiryMessage(vehicle)
  );

  return (
    <article className="group flex flex-col overflow-hidden rounded-md border border-white/10 bg-[#0E1117] transition-transform duration-200 hover:-translate-y-0.5 hover:border-[#C9A96E]/40">
      {/* Large 4:3 High-Quality Vehicle Photograph */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#141820]">
        {!imgFailed && vehicle.imageUrl ? (
          <img
            src={vehicle.imageUrl}
            alt={`${vehicle.brand} ${vehicle.model} (${vehicle.year})`}
            onError={() => setImgFailed(true)}
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#141820] to-[#0A0D12] p-6 text-center">
            <CarFront className="h-10 w-10 text-[#C9A96E]/60" aria-hidden="true" />
            <p className="text-sm font-medium text-[#B8C0CC]">
              {vehicle.brand} {vehicle.model}
            </p>
          </div>
        )}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0E1117] to-transparent opacity-80" />
      </div>

      {/* Card Details */}
      <div className="flex flex-1 flex-col p-6">
        {/* Clean Unboxed Metadata Line (Zero Pill Discipline) */}
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-medium tracking-[0.12em] uppercase text-[#C9A96E]">
            <span>{vehicle.category}</span>
            <span aria-hidden="true" className="mx-2 text-[#B8C0CC]/45">·</span>
            <span className="text-[#B8C0CC] tabular-nums">{vehicle.year}</span>
          </p>

          <button
            type="button"
            onClick={() => onEdit(vehicle)}
            aria-label={`Edit ${vehicle.brand} ${vehicle.model}`}
            className="inline-flex h-8 w-8 items-center justify-center rounded-sm text-[#B8C0CC]/70 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline-2 focus-visible:outline-[#C9A96E]"
          >
            <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>

        {/* Brand & Model */}
        <h3
          className="mt-2 text-2xl font-semibold tracking-tight text-white"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {vehicle.brand} {vehicle.model}
        </h3>

        {vehicle.isShowcaseTemplate && (
          <p className="mt-1 text-xs text-[#94A3B8]">
            Import Sourcing Showcase · Editable Listing
          </p>
        )}

        {/* Technical Specifications List */}
        <dl className="mt-5 divide-y divide-white/8 border-y border-white/8 text-sm">
          <div className="flex items-center justify-between gap-4 py-2.5">
            <dt className="text-[#94A3B8]">Engine &amp; Transmission</dt>
            <dd className="text-right font-medium text-[#E4E7EC]">
              {vehicle.engineTransmission}
            </dd>
          </div>

          <div className="flex items-center justify-between gap-4 py-2.5">
            <dt className="text-[#94A3B8]">Fuel Type</dt>
            <dd className="text-right font-medium text-[#E4E7EC]">
              {vehicle.fuelType}
            </dd>
          </div>

          {mileageLabel && (
            <div className="flex items-center justify-between gap-4 py-2.5">
              <dt className="text-[#94A3B8]">Mileage</dt>
              <dd className="text-right font-medium text-[#E4E7EC] tabular-nums">
                {mileageLabel}
              </dd>
            </div>
          )}
        </dl>

        {/* Price in ETB or Contact for Price + WhatsApp CTA */}
        <div className="mt-auto pt-5 flex flex-col gap-4">
          <div className="flex items-baseline justify-between gap-3">
            <span className="text-xs uppercase tracking-[0.14em] text-[#94A3B8]">
              Price
            </span>
            <span
              className={`text-base font-semibold tabular-nums ${
                hasNumericPrice ? 'text-white' : 'text-[#DFC48E]'
              }`}
            >
              {priceLabel}
            </span>
          </div>

          {whatsappUrl ? (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-sm bg-[#C9A96E] px-4 py-2.5 text-xs font-semibold tracking-[0.14em] uppercase text-[#07090C] whitespace-nowrap transition-colors duration-150 hover:bg-[#DFC48E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A96E]"
            >
              <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>WhatsApp Inquiry</span>
            </a>
          ) : (
            <button
              type="button"
              onClick={() => onRequestUnconfiguredInquiry(vehicle)}
              className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-sm bg-[#C9A96E] px-4 py-2.5 text-xs font-semibold tracking-[0.14em] uppercase text-[#07090C] whitespace-nowrap transition-colors duration-150 hover:bg-[#DFC48E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A96E]"
            >
              <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>WhatsApp Inquiry</span>
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

export function VehicleCollectionSection({
  vehicles,
  whatsappNumber,
  onOpenManager,
  onRequestUnconfiguredInquiry,
}: VehicleCollectionSectionProps) {
  const [activeCategory, setActiveCategory] = useState<'All' | VehicleCategory>('All');

  const filteredVehicles =
    activeCategory === 'All'
      ? vehicles
      : vehicles.filter((v) => v.category === activeCategory);

  return (
    <section
      id="collection"
      className="border-t border-white/10 bg-[#07090C] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#C9A96E]">
              Our Vehicle Collection
            </p>
            <h2
              className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white [text-wrap:balance]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Curated Categories for Every Journey
            </h2>
            <p className="mt-3 text-base text-[#B8C0CC] leading-relaxed">
              Browse our primary import categories across SUVs, sedans, luxury vehicles, and family cars. Listings are ready to customize with live ETB pricing and availability.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => onOpenManager(undefined)}
              className="inline-flex min-h-[42px] items-center gap-2 rounded-sm border border-white/15 bg-[#0E1117] px-4 py-2 text-xs font-medium tracking-[0.1em] uppercase text-[#E4E7EC] whitespace-nowrap shrink-0 transition-colors hover:border-[#C9A96E]/60 hover:text-white focus-visible:outline-2 focus-visible:outline-[#C9A96E]"
            >
              <SlidersHorizontal className="h-3.5 w-3.5 text-[#C9A96E]" aria-hidden="true" />
              <span>Manage Listings</span>
            </button>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div
          role="tablist"
          aria-label="Vehicle Categories"
          className="mt-10 flex flex-wrap items-center gap-2 border-b border-white/10 pb-4"
        >
          {VEHICLE_CATEGORIES.map((category) => {
            const isActive = activeCategory === category;
            const count =
              category === 'All'
                ? vehicles.length
                : vehicles.filter((v) => v.category === category).length;

            return (
              <button
                key={category}
                role="tab"
                type="button"
                aria-selected={isActive}
                onClick={() => setActiveCategory(category)}
                className={`inline-flex min-h-[40px] items-center gap-2 rounded-sm px-4 py-2 text-xs font-medium tracking-[0.08em] uppercase whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-[#C9A96E] ${
                  isActive
                    ? 'bg-[#C9A96E] text-[#07090C]'
                    : 'bg-[#0E1117] text-[#B8C0CC] border border-white/10 hover:border-[#C9A96E]/40 hover:text-white'
                }`}
              >
                <span>{category === 'All' ? 'All Vehicles' : category}</span>
                <span
                  className={`tabular-nums text-[11px] ${
                    isActive ? 'text-[#07090C]/75' : 'text-[#94A3B8]'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Vehicle Cards Grid */}
        {filteredVehicles.length > 0 ? (
          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
            {filteredVehicles.map((vehicle) => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                whatsappNumber={whatsappNumber}
                onEdit={(v) => onOpenManager(v)}
                onRequestUnconfiguredInquiry={onRequestUnconfiguredInquiry}
              />
            ))}
          </div>
        ) : (
          <div className="mt-10 flex flex-col items-center justify-center rounded-md border border-white/10 bg-[#0E1117] px-6 py-16 text-center">
            <CarFront className="h-10 w-10 text-[#C9A96E]/70" aria-hidden="true" />
            <h3
              className="mt-4 text-2xl font-semibold text-white"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              No vehicles currently listed in {activeCategory}
            </h3>
            <p className="mt-2 max-w-md text-sm text-[#B8C0CC]">
              Add a listing to this category or contact CAR EXPRESS directly for bespoke import sourcing.
            </p>
            <button
              type="button"
              onClick={() => onOpenManager(undefined)}
              className="mt-6 inline-flex min-h-[42px] items-center gap-2 rounded-sm bg-[#C9A96E] px-5 py-2.5 text-xs font-semibold tracking-[0.14em] uppercase text-[#07090C] transition-colors hover:bg-[#DFC48E]"
            >
              <Plus className="h-4 w-4" aria-hidden="true" />
              <span>Add Vehicle Listing</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
