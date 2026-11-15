import { FormEvent, useState } from 'react';
import { MessageCircle, Save, X } from 'lucide-react';
import { VehicleListing } from '../types/showroom';
import { buildVehicleInquiryMessage, buildWhatsAppUrl } from '../utils/whatsapp';

interface WhatsAppInquiryModalProps {
  vehicle: VehicleListing | null;
  onClose: () => void;
  onSaveWhatsAppNumber: (whatsappNumber: string) => void;
  onProceedToContactForm: (vehicle: VehicleListing) => void;
}

export function WhatsAppInquiryModal({
  vehicle,
  onClose,
  onSaveWhatsAppNumber,
  onProceedToContactForm,
}: WhatsAppInquiryModalProps) {
  const [ownerNumber, setOwnerNumber] = useState('');

  if (!vehicle) return null;

  const previewMessage = buildVehicleInquiryMessage(vehicle);
  const livePreviewUrl = buildWhatsAppUrl(ownerNumber, previewMessage);

  const handleSaveNumber = (e: FormEvent) => {
    e.preventDefault();
    if (!ownerNumber.trim()) return;
    onSaveWhatsAppNumber(ownerNumber.trim());
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="whatsapp-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
    >
      <div className="w-full max-w-lg rounded-md border border-white/15 bg-[#0E1117] p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#C9A96E]">
              Vehicle Inquiry
            </p>
            <h2
              id="whatsapp-modal-title"
              className="mt-1 text-2xl font-semibold text-white"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {vehicle.brand} {vehicle.model}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close inquiry dialog"
            className="inline-flex h-9 w-9 items-center justify-center rounded-sm border border-white/10 text-[#B8C0CC] hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-[#B8C0CC]">
          A business WhatsApp number has not been entered yet. You can continue to the direct inquiry form below, or if you manage this site, enter your CAR EXPRESS WhatsApp number to activate instant WhatsApp messaging.
        </p>

        <div className="mt-4 rounded-sm border border-white/10 bg-[#07090C] p-3.5">
          <p className="text-[11px] uppercase tracking-[0.12em] text-[#94A3B8]">
            Prepared Inquiry Summary
          </p>
          <pre className="mt-2 whitespace-pre-wrap font-sans text-xs leading-relaxed text-[#E4E7EC]">
            {previewMessage}
          </pre>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => onProceedToContactForm(vehicle)}
            className="inline-flex min-h-[42px] flex-1 items-center justify-center rounded-sm bg-[#C9A96E] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#07090C] hover:bg-[#DFC48E]"
          >
            Continue to Contact Form
          </button>
        </div>

        <form
          onSubmit={handleSaveNumber}
          className="mt-6 border-t border-white/10 pt-5"
        >
          <label
            htmlFor="quick-whatsapp-number"
            className="block text-xs font-medium uppercase tracking-[0.12em] text-[#94A3B8] mb-2"
          >
            Site Owner Quick Setup — Set Business WhatsApp Number
          </label>
          <div className="flex flex-col sm:flex-row gap-2.5">
            <input
              id="quick-whatsapp-number"
              type="tel"
              value={ownerNumber}
              onChange={(e) => setOwnerNumber(e.target.value)}
              placeholder="Enter number with country code (e.g. +251...)"
              className="flex-1 min-h-[40px] rounded-sm border border-white/15 bg-[#07090C] px-3 text-sm text-white placeholder:text-[#64748B] focus:border-[#C9A96E] focus:outline-none"
            />
            <button
              type="submit"
              className="inline-flex min-h-[40px] items-center justify-center gap-1.5 rounded-sm border border-[#C9A96E]/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#DFC48E] hover:bg-[#C9A96E] hover:text-[#07090C]"
            >
              <Save className="h-3.5 w-3.5" />
              <span>Save</span>
            </button>
          </div>
          {livePreviewUrl && (
            <a
              href={livePreviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 text-xs text-[#DFC48E] underline underline-offset-4 hover:text-white"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              <span>Preview WhatsApp Link</span>
            </a>
          )}
        </form>
      </div>
    </div>
  );
}
