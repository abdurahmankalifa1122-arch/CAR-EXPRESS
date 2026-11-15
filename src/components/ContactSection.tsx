import { FormEvent, useState } from 'react';
import {
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Pencil,
  Phone,
  RotateCcw,
  Save,
  X,
} from 'lucide-react';
import { ContactConfig } from '../types/showroom';
import { buildWhatsAppUrl } from '../utils/whatsapp';

interface ContactSectionProps {
  config: ContactConfig;
  onUpdateConfig: (updated: ContactConfig) => void;
  onResetConfig: () => void;
  preselectedSubject?: string;
}

export function ContactSection({
  config,
  onUpdateConfig,
  onResetConfig,
  preselectedSubject = '',
}: ContactSectionProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<ContactConfig>(config);

  const [fullName, setFullName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [interest, setInterest] = useState(preselectedSubject);
  const [message, setMessage] = useState('');
  const [formError, setFormError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const openEditor = () => {
    setDraft(config);
    setEditing(true);
  };

  const handleSaveConfig = (e: FormEvent) => {
    e.preventDefault();
    onUpdateConfig(draft);
    setEditing(false);
  };

  const handleInquirySubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !clientPhone.trim() || !message.trim()) {
      setFormError('Please provide your name, contact number, and inquiry message.');
      return;
    }
    setFormError('');
    setSubmitted(true);
  };

  const directWhatsAppUrl = buildWhatsAppUrl(
    config.whatsappNumber,
    `Hello ${config.companyName}, I would like to inquire about purchasing or importing a vehicle in Ethiopia.`
  );

  const formWhatsAppUrl = buildWhatsAppUrl(
    config.whatsappNumber,
    [
      `Hello ${config.companyName},`,
      `Name: ${fullName || 'Client'}`,
      `Phone: ${clientPhone || 'Not provided'}`,
      interest ? `Vehicle / Category: ${interest}` : '',
      `Message: ${message || 'Requesting consultation'}`,
    ]
      .filter(Boolean)
      .join('\n')
  );

  return (
    <section
      id="contact"
      className="border-t border-white/10 bg-[#0A0D12] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Left: Editable Contact Details & Ethiopian Location */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-4">
                <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#C9A96E]">
                  Contact &amp; Location
                </p>
                {!editing && (
                  <button
                    type="button"
                    onClick={openEditor}
                    className="inline-flex items-center gap-1.5 rounded-sm border border-white/15 bg-[#0E1117] px-3 py-1.5 text-xs font-medium text-[#E4E7EC] whitespace-nowrap transition-colors hover:border-[#C9A96E]/60 hover:text-white focus-visible:outline-2 focus-visible:outline-[#C9A96E]"
                  >
                    <Pencil className="h-3.5 w-3.5 text-[#C9A96E]" aria-hidden="true" />
                    <span>Edit Contact &amp; Location</span>
                  </button>
                )}
              </div>

              <h2
                className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight text-white [text-wrap:balance]"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Speak With CAR EXPRESS
              </h2>

              <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#B8C0CC]">
                Contact details and our Ethiopian showroom address are directly editable below so you always display verified contact information.
              </p>

              {!editing ? (
                <dl className="mt-8 space-y-5 border-t border-white/10 pt-8 text-sm">
                  <div className="flex items-start gap-4">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#C9A96E]" aria-hidden="true" />
                    <div>
                      <dt className="text-xs font-medium tracking-[0.12em] uppercase text-[#94A3B8]">
                        Ethiopian Business Location
                      </dt>
                      <dd className="mt-1 font-medium text-white">
                        {config.locationEthiopia}
                      </dd>
                      <dd className="mt-0.5 text-[#B8C0CC]">
                        {config.showroomDistrict}
                      </dd>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Phone className="mt-0.5 h-5 w-5 shrink-0 text-[#C9A96E]" aria-hidden="true" />
                    <div>
                      <dt className="text-xs font-medium tracking-[0.12em] uppercase text-[#94A3B8]">
                        Telephone
                      </dt>
                      <dd className="mt-1 font-medium text-white tabular-nums">
                        {config.phone ? (
                          <a
                            href={`tel:${config.phone.replace(/\s+/g, '')}`}
                            className="hover:text-[#DFC48E] transition-colors"
                          >
                            {config.phone}
                          </a>
                        ) : (
                          <span className="text-[#94A3B8] font-normal">
                            Not configured — click &ldquo;Edit Contact &amp; Location&rdquo;
                          </span>
                        )}
                      </dd>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <MessageCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#C9A96E]" aria-hidden="true" />
                    <div>
                      <dt className="text-xs font-medium tracking-[0.12em] uppercase text-[#94A3B8]">
                        WhatsApp Concierge
                      </dt>
                      <dd className="mt-1 font-medium text-white tabular-nums">
                        {config.whatsappNumber ? (
                          directWhatsAppUrl ? (
                            <a
                              href={directWhatsAppUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#DFC48E] underline underline-offset-4 hover:text-white transition-colors"
                            >
                              {config.whatsappNumber}
                            </a>
                          ) : (
                            config.whatsappNumber
                          )
                        ) : (
                          <span className="text-[#94A3B8] font-normal">
                            Not configured — click &ldquo;Edit Contact &amp; Location&rdquo;
                          </span>
                        )}
                      </dd>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Mail className="mt-0.5 h-5 w-5 shrink-0 text-[#C9A96E]" aria-hidden="true" />
                    <div>
                      <dt className="text-xs font-medium tracking-[0.12em] uppercase text-[#94A3B8]">
                        Email
                      </dt>
                      <dd className="mt-1 font-medium text-white">
                        {config.email ? (
                          <a
                            href={`mailto:${config.email}`}
                            className="hover:text-[#DFC48E] transition-colors"
                          >
                            {config.email}
                          </a>
                        ) : (
                          <span className="text-[#94A3B8] font-normal">
                            Not configured — click &ldquo;Edit Contact &amp; Location&rdquo;
                          </span>
                        )}
                      </dd>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Clock className="mt-0.5 h-5 w-5 shrink-0 text-[#C9A96E]" aria-hidden="true" />
                    <div>
                      <dt className="text-xs font-medium tracking-[0.12em] uppercase text-[#94A3B8]">
                        Showroom Hours
                      </dt>
                      <dd className="mt-1 text-[#E4E7EC]">
                        {config.hours || (
                          <span className="text-[#94A3B8]">
                            Hours editable in Contact Settings
                          </span>
                        )}
                      </dd>
                    </div>
                  </div>
                </dl>
              ) : (
                <form
                  onSubmit={handleSaveConfig}
                  className="mt-6 space-y-4 rounded-md border border-[#C9A96E]/35 bg-[#0E1117] p-5"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-[#DFC48E]">
                      Edit Showroom Contact &amp; Location
                    </h3>
                    <button
                      type="button"
                      onClick={() => setEditing(false)}
                      aria-label="Cancel editing contact details"
                      className="text-[#94A3B8] hover:text-white"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  <div>
                    <label className="block text-xs text-[#B8C0CC] mb-1">
                      City / Country
                    </label>
                    <input
                      type="text"
                      value={draft.locationEthiopia}
                      onChange={(e) =>
                        setDraft({ ...draft, locationEthiopia: e.target.value })
                      }
                      placeholder="e.g. Addis Ababa, Ethiopia"
                      className="w-full rounded-sm border border-white/15 bg-[#07090C] px-3 py-2 text-sm text-white placeholder:text-[#64748B] focus:border-[#C9A96E] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-[#B8C0CC] mb-1">
                      Exact Showroom Address / Landmark
                    </label>
                    <input
                      type="text"
                      value={draft.showroomDistrict}
                      onChange={(e) =>
                        setDraft({ ...draft, showroomDistrict: e.target.value })
                      }
                      placeholder="Enter your verified street or sub-city address"
                      className="w-full rounded-sm border border-white/15 bg-[#07090C] px-3 py-2 text-sm text-white placeholder:text-[#64748B] focus:border-[#C9A96E] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-[#B8C0CC] mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={draft.phone}
                        onChange={(e) =>
                          setDraft({ ...draft, phone: e.target.value })
                        }
                        placeholder="+251 ..."
                        className="w-full rounded-sm border border-white/15 bg-[#07090C] px-3 py-2 text-sm text-white placeholder:text-[#64748B] focus:border-[#C9A96E] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-[#B8C0CC] mb-1">
                        WhatsApp Number (with country code)
                      </label>
                      <input
                        type="tel"
                        value={draft.whatsappNumber}
                        onChange={(e) =>
                          setDraft({ ...draft, whatsappNumber: e.target.value })
                        }
                        placeholder="+251 ..."
                        className="w-full rounded-sm border border-white/15 bg-[#07090C] px-3 py-2 text-sm text-white placeholder:text-[#64748B] focus:border-[#C9A96E] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-[#B8C0CC] mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={draft.email}
                        onChange={(e) =>
                          setDraft({ ...draft, email: e.target.value })
                        }
                        placeholder="sales@example.com"
                        className="w-full rounded-sm border border-white/15 bg-[#07090C] px-3 py-2 text-sm text-white placeholder:text-[#64748B] focus:border-[#C9A96E] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-[#B8C0CC] mb-1">
                        Opening Hours
                      </label>
                      <input
                        type="text"
                        value={draft.hours}
                        onChange={(e) =>
                          setDraft({ ...draft, hours: e.target.value })
                        }
                        placeholder="e.g. Mon – Sat, 9:00 – 18:00"
                        className="w-full rounded-sm border border-white/15 bg-[#07090C] px-3 py-2 text-sm text-white placeholder:text-[#64748B] focus:border-[#C9A96E] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        onResetConfig();
                        setEditing(false);
                      }}
                      className="inline-flex items-center gap-1.5 text-xs text-[#94A3B8] hover:text-white"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                      <span>Reset Defaults</span>
                    </button>
                    <button
                      type="submit"
                      className="inline-flex min-h-[40px] items-center gap-2 rounded-sm bg-[#C9A96E] px-5 py-2 text-xs font-semibold tracking-[0.12em] uppercase text-[#07090C] hover:bg-[#DFC48E]"
                    >
                      <Save className="h-3.5 w-3.5" />
                      <span>Save Details</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Right: Working Inquiry & Quotation Form */}
          <div className="lg:col-span-7">
            <div className="rounded-md border border-white/10 bg-[#0E1117] p-6 sm:p-10">
              <p className="text-xs font-medium tracking-[0.18em] uppercase text-[#C9A96E]">
                Direct Concierge Inquiry
              </p>
              <h3
                className="mt-2 text-2xl sm:text-3xl font-semibold text-white"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Request Availability or an ETB Quotation
              </h3>

              {submitted ? (
                <div className="mt-8 rounded-md border border-[#C9A96E]/35 bg-[#07090C] p-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle2
                      className="mt-0.5 h-5 w-5 shrink-0 text-[#C9A96E]"
                      aria-hidden="true"
                    />
                    <div>
                      <h4 className="text-base font-semibold text-white">
                        Inquiry Prepared for {fullName}
                      </h4>
                      <p className="mt-2 text-sm leading-relaxed text-[#B8C0CC]">
                        {formWhatsAppUrl
                          ? 'Your inquiry summary is ready. Click below to send it directly to CAR EXPRESS on WhatsApp, or submit another request.'
                          : 'Your inquiry summary is recorded. Configure a business WhatsApp number in "Edit Contact & Location" to enable instant one-click WhatsApp dispatch.'}
                      </p>
                      <div className="mt-5 flex flex-wrap items-center gap-3">
                        {formWhatsAppUrl && (
                          <a
                            href={formWhatsAppUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex min-h-[42px] items-center gap-2 rounded-sm bg-[#C9A96E] px-5 py-2 text-xs font-semibold tracking-[0.14em] uppercase text-[#07090C] hover:bg-[#DFC48E]"
                          >
                            <MessageCircle className="h-4 w-4" aria-hidden="true" />
                            <span>Send via WhatsApp</span>
                          </a>
                        )}
                        <button
                          type="button"
                          onClick={() => {
                            setSubmitted(false);
                            setMessage('');
                          }}
                          className="inline-flex min-h-[42px] items-center rounded-sm border border-white/15 px-4 py-2 text-xs font-medium uppercase tracking-[0.12em] text-[#E4E7EC] hover:border-[#C9A96E]/60 hover:text-white"
                        >
                          New Inquiry
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="mt-8 space-y-5" noValidate>
                  {formError && (
                    <div
                      role="alert"
                      className="rounded-sm border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-xs text-amber-200"
                    >
                      {formError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="inquiry-name"
                        className="block text-xs font-medium tracking-[0.1em] uppercase text-[#B8C0CC] mb-2"
                      >
                        Full Name
                      </label>
                      <input
                        id="inquiry-name"
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Your full name"
                        className="w-full min-h-[44px] rounded-sm border border-white/15 bg-[#07090C] px-4 py-2.5 text-sm text-white placeholder:text-[#64748B] focus:border-[#C9A96E] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="inquiry-phone"
                        className="block text-xs font-medium tracking-[0.1em] uppercase text-[#B8C0CC] mb-2"
                      >
                        Phone or WhatsApp Number
                      </label>
                      <input
                        id="inquiry-phone"
                        type="tel"
                        required
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        placeholder="Your phone number"
                        className="w-full min-h-[44px] rounded-sm border border-white/15 bg-[#07090C] px-4 py-2.5 text-sm text-white placeholder:text-[#64748B] focus:border-[#C9A96E] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="inquiry-interest"
                      className="block text-xs font-medium tracking-[0.1em] uppercase text-[#B8C0CC] mb-2"
                    >
                      Vehicle Category or Preferred Model
                    </label>
                    <input
                      id="inquiry-interest"
                      type="text"
                      value={interest}
                      onChange={(e) => setInterest(e.target.value)}
                      placeholder="e.g. Executive 4x4 SUV, Sedan, Luxury Vehicle, Family Car"
                      className="w-full min-h-[44px] rounded-sm border border-white/15 bg-[#07090C] px-4 py-2.5 text-sm text-white placeholder:text-[#64748B] focus:border-[#C9A96E] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="inquiry-message"
                      className="block text-xs font-medium tracking-[0.1em] uppercase text-[#B8C0CC] mb-2"
                    >
                      Message &amp; Preferred Specifications
                    </label>
                    <textarea
                      id="inquiry-message"
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Share your preferred model year, fuel type, color, or timeline."
                      className="w-full rounded-sm border border-white/15 bg-[#07090C] px-4 py-3 text-sm text-white placeholder:text-[#64748B] focus:border-[#C9A96E] focus:outline-none"
                    />
                  </div>

                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <button
                      type="submit"
                      className="inline-flex min-h-[46px] items-center justify-center rounded-sm bg-[#C9A96E] px-7 py-3 text-xs font-semibold tracking-[0.16em] uppercase text-[#07090C] whitespace-nowrap transition-colors hover:bg-[#DFC48E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A96E]"
                    >
                      Send Inquiry
                    </button>

                    {directWhatsAppUrl && (
                      <a
                        href={directWhatsAppUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-sm border border-white/15 px-6 py-3 text-xs font-semibold tracking-[0.14em] uppercase text-white whitespace-nowrap transition-colors hover:border-[#C9A96E] hover:text-[#DFC48E]"
                      >
                        <MessageCircle className="h-4 w-4 text-[#C9A96E]" aria-hidden="true" />
                        <span>Direct WhatsApp</span>
                      </a>
                    )}
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
