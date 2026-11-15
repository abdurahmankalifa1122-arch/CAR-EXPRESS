import { FormEvent, useEffect, useState } from 'react';
import { Check, Copy, Plus, RotateCcw, Trash2, X } from 'lucide-react';
import { SHOWROOM_MEDIA } from '../data/assets';
import { VehicleCategory, VehicleListing } from '../types/showroom';

interface ShowroomManagerModalProps {
  isOpen: boolean;
  vehicles: VehicleListing[];
  initialEditVehicle?: VehicleListing;
  onClose: () => void;
  onSaveVehicle: (vehicle: VehicleListing) => void;
  onDeleteVehicle: (id: string) => void;
  onResetVehicles: () => void;
}

const CATEGORIES: VehicleCategory[] = [
  'SUVs',
  'Sedans',
  'Luxury Vehicles',
  'Family Cars',
];

function createEmptyDraft(): VehicleListing {
  return {
    id: `vehicle-${Date.now()}`,
    category: 'SUVs',
    brand: '',
    model: '',
    year: '',
    engineTransmission: '',
    fuelType: '',
    mileageKm: null,
    priceEtb: null,
    imageUrl: SHOWROOM_MEDIA.presets.SUVs,
    isShowcaseTemplate: false,
  };
}

export function ShowroomManagerModal({
  isOpen,
  vehicles,
  initialEditVehicle,
  onClose,
  onSaveVehicle,
  onDeleteVehicle,
  onResetVehicles,
}: ShowroomManagerModalProps) {
  const [draft, setDraft] = useState<VehicleListing>(createEmptyDraft());
  const [mileageInput, setMileageInput] = useState('');
  const [priceInput, setPriceInput] = useState('');
  const [copiedJson, setCopiedJson] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    if (initialEditVehicle) {
      setDraft(initialEditVehicle);
      setMileageInput(
        typeof initialEditVehicle.mileageKm === 'number'
          ? String(initialEditVehicle.mileageKm)
          : ''
      );
      setPriceInput(
        typeof initialEditVehicle.priceEtb === 'number'
          ? String(initialEditVehicle.priceEtb)
          : ''
      );
    } else {
      const fresh = createEmptyDraft();
      setDraft(fresh);
      setMileageInput('');
      setPriceInput('');
    }
  }, [isOpen, initialEditVehicle]);

  if (!isOpen) return null;

  const isEditingExisting = vehicles.some((v) => v.id === draft.id);

  const handleCategoryChange = (category: VehicleCategory) => {
    const presetValues = Object.values(SHOWROOM_MEDIA.presets) as string[];
    const shouldSwapImage = !draft.imageUrl || presetValues.includes(draft.imageUrl);
    setDraft({
      ...draft,
      category,
      imageUrl: shouldSwapImage ? SHOWROOM_MEDIA.presets[category] : draft.imageUrl,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!draft.brand.trim() || !draft.model.trim()) return;

    const parsedMileage = mileageInput.trim() ? Number(mileageInput) : null;
    const parsedPrice = priceInput.trim() ? Number(priceInput) : null;

    onSaveVehicle({
      ...draft,
      brand: draft.brand.trim(),
      model: draft.model.trim(),
      year: draft.year.trim() || 'On Request',
      engineTransmission: draft.engineTransmission.trim() || 'Automatic',
      fuelType: draft.fuelType.trim() || 'Petrol',
      mileageKm:
        parsedMileage !== null && !Number.isNaN(parsedMileage) && parsedMileage >= 0
          ? parsedMileage
          : null,
      priceEtb:
        parsedPrice !== null && !Number.isNaN(parsedPrice) && parsedPrice > 0
          ? parsedPrice
          : null,
      imageUrl: draft.imageUrl.trim() || SHOWROOM_MEDIA.presets[draft.category],
    });

    const fresh = createEmptyDraft();
    setDraft(fresh);
    setMileageInput('');
    setPriceInput('');
  };

  const handleCopyJson = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(vehicles, null, 2));
      setCopiedJson(true);
      setTimeout(() => setCopiedJson(false), 2000);
    } catch {
      setCopiedJson(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="manager-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
    >
      <div className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-md border border-white/15 bg-[#0E1117] shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#C9A96E]">
              Showroom Inventory Editor
            </p>
            <h2
              id="manager-modal-title"
              className="text-xl sm:text-2xl font-semibold text-white"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Manage Vehicle Listings
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close vehicle manager"
            className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-white/10 text-[#B8C0CC] hover:border-[#C9A96E]/60 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="grid flex-1 grid-cols-1 gap-6 overflow-y-auto p-6 lg:grid-cols-12">
          {/* Left: Form */}
          <form onSubmit={handleSubmit} className="space-y-4 lg:col-span-7">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#DFC48E]">
                {isEditingExisting ? 'Edit Selected Listing' : 'Add New Vehicle'}
              </h3>
              {isEditingExisting && (
                <button
                  type="button"
                  onClick={() => {
                    setDraft(createEmptyDraft());
                    setMileageInput('');
                    setPriceInput('');
                  }}
                  className="inline-flex items-center gap-1 text-xs text-[#94A3B8] hover:text-white"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Create New Instead</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label className="block text-xs text-[#B8C0CC] mb-1">Category</label>
                <select
                  value={draft.category}
                  onChange={(e) =>
                    handleCategoryChange(e.target.value as VehicleCategory)
                  }
                  className="w-full min-h-[40px] rounded-sm border border-white/15 bg-[#07090C] px-3 text-sm text-white focus:border-[#C9A96E] focus:outline-none"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs text-[#B8C0CC] mb-1">Model Year</label>
                <input
                  type="text"
                  value={draft.year}
                  onChange={(e) => setDraft({ ...draft, year: e.target.value })}
                  placeholder="e.g. 2025"
                  className="w-full min-h-[40px] rounded-sm border border-white/15 bg-[#07090C] px-3 text-sm text-white placeholder:text-[#64748B] focus:border-[#C9A96E] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label className="block text-xs text-[#B8C0CC] mb-1">Brand *</label>
                <input
                  type="text"
                  required
                  value={draft.brand}
                  onChange={(e) => setDraft({ ...draft, brand: e.target.value })}
                  placeholder="e.g. Toyota"
                  className="w-full min-h-[40px] rounded-sm border border-white/15 bg-[#07090C] px-3 text-sm text-white placeholder:text-[#64748B] focus:border-[#C9A96E] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs text-[#B8C0CC] mb-1">Model *</label>
                <input
                  type="text"
                  required
                  value={draft.model}
                  onChange={(e) => setDraft({ ...draft, model: e.target.value })}
                  placeholder="e.g. Land Cruiser 300"
                  className="w-full min-h-[40px] rounded-sm border border-white/15 bg-[#07090C] px-3 text-sm text-white placeholder:text-[#64748B] focus:border-[#C9A96E] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label className="block text-xs text-[#B8C0CC] mb-1">
                  Engine &amp; Transmission
                </label>
                <input
                  type="text"
                  value={draft.engineTransmission}
                  onChange={(e) =>
                    setDraft({ ...draft, engineTransmission: e.target.value })
                  }
                  placeholder="e.g. 3.5L V6 Twin-Turbo · Automatic"
                  className="w-full min-h-[40px] rounded-sm border border-white/15 bg-[#07090C] px-3 text-sm text-white placeholder:text-[#64748B] focus:border-[#C9A96E] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs text-[#B8C0CC] mb-1">Fuel Type</label>
                <input
                  type="text"
                  value={draft.fuelType}
                  onChange={(e) => setDraft({ ...draft, fuelType: e.target.value })}
                  placeholder="e.g. Petrol / Hybrid / Electric"
                  className="w-full min-h-[40px] rounded-sm border border-white/15 bg-[#07090C] px-3 text-sm text-white placeholder:text-[#64748B] focus:border-[#C9A96E] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label className="block text-xs text-[#B8C0CC] mb-1">
                  Mileage in km (optional)
                </label>
                <input
                  type="number"
                  min={0}
                  value={mileageInput}
                  onChange={(e) => setMileageInput(e.target.value)}
                  placeholder="Leave blank if unavailable"
                  className="w-full min-h-[40px] rounded-sm border border-white/15 bg-[#07090C] px-3 text-sm text-white placeholder:text-[#64748B] focus:border-[#C9A96E] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs text-[#B8C0CC] mb-1">
                  Price in ETB (optional)
                </label>
                <input
                  type="number"
                  min={0}
                  value={priceInput}
                  onChange={(e) => setPriceInput(e.target.value)}
                  placeholder="Blank shows Contact for Price"
                  className="w-full min-h-[40px] rounded-sm border border-white/15 bg-[#07090C] px-3 text-sm text-white placeholder:text-[#64748B] focus:border-[#C9A96E] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-[#B8C0CC] mb-1">
                Vehicle Photo URL (defaults to category studio photo)
              </label>
              <input
                type="url"
                value={draft.imageUrl}
                onChange={(e) => setDraft({ ...draft, imageUrl: e.target.value })}
                placeholder="https://..."
                className="w-full min-h-[40px] rounded-sm border border-white/15 bg-[#07090C] px-3 text-sm text-white placeholder:text-[#64748B] focus:border-[#C9A96E] focus:outline-none"
              />
            </div>

            <label className="flex items-center gap-2.5 text-xs text-[#B8C0CC] cursor-pointer">
              <input
                type="checkbox"
                checked={Boolean(draft.isShowcaseTemplate)}
                onChange={(e) =>
                  setDraft({ ...draft, isShowcaseTemplate: e.target.checked })
                }
                className="h-4 w-4 accent-[#C9A96E]"
              />
              <span>Mark as Sourcing Showcase (uncheck for live in-stock vehicle)</span>
            </label>

            <div className="pt-2">
              <button
                type="submit"
                className="inline-flex min-h-[42px] items-center justify-center rounded-sm bg-[#C9A96E] px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#07090C] hover:bg-[#DFC48E]"
              >
                {isEditingExisting ? 'Update Listing' : 'Add Listing to Showroom'}
              </button>
            </div>
          </form>

          {/* Right: Current Listings & Export */}
          <div className="flex flex-col border-t border-white/10 pt-6 lg:col-span-5 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#DFC48E]">
                Current Listings ({vehicles.length})
              </h3>
              <button
                type="button"
                onClick={handleCopyJson}
                className="inline-flex items-center gap-1.5 rounded-sm border border-white/15 px-2.5 py-1 text-[11px] text-[#E4E7EC] hover:border-[#C9A96E]/60"
              >
                {copiedJson ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-[#C9A96E]" />
                    <span>Copied JSON</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5 text-[#C9A96E]" />
                    <span>Export JSON</span>
                  </>
                )}
              </button>
            </div>

            <ul className="mt-4 flex-1 space-y-2.5 overflow-y-auto pr-1">
              {vehicles.map((item) => (
                <li
                  key={item.id}
                  className={`flex items-center justify-between gap-3 rounded-sm border p-3 transition-colors ${
                    item.id === draft.id
                      ? 'border-[#C9A96E]/60 bg-[#07090C]'
                      : 'border-white/10 bg-[#07090C]/60'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setDraft(item);
                      setMileageInput(
                        typeof item.mileageKm === 'number'
                          ? String(item.mileageKm)
                          : ''
                      );
                      setPriceInput(
                        typeof item.priceEtb === 'number' ? String(item.priceEtb) : ''
                      );
                    }}
                    className="min-w-0 flex-1 text-left"
                  >
                    <p className="truncate text-sm font-medium text-white">
                      {item.brand} {item.model}
                    </p>
                    <p className="truncate text-xs text-[#94A3B8]">
                      {item.category} · {item.year}
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => onDeleteVehicle(item.id)}
                    aria-label={`Remove ${item.brand} ${item.model}`}
                    className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-sm text-[#94A3B8] hover:bg-red-500/10 hover:text-red-300"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-4 border-t border-white/10 pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={onResetVehicles}
                className="inline-flex items-center gap-1.5 text-xs text-[#94A3B8] hover:text-white"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Restore Default Showcases</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="text-xs font-medium uppercase tracking-[0.12em] text-[#DFC48E] hover:text-white"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
