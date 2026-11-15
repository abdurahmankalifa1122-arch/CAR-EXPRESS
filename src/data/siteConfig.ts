import {
  ContactConfig,
  FaqItem,
  ImportStep,
  VehicleCategory,
  WhyChooseItem,
} from '../types/showroom';

export const VEHICLE_CATEGORIES: ('All' | VehicleCategory)[] = [
  'All',
  'SUVs',
  'Sedans',
  'Luxury Vehicles',
  'Family Cars',
];

/**
 * Editable showroom contact details and Ethiopian business location.
 * Leave fields empty or update them via the in-page "Edit Contact & Location"
 * drawer before publishing. No phone numbers or street addresses are invented.
 */
export const DEFAULT_CONTACT_CONFIG: ContactConfig = {
  companyName: 'CAR EXPRESS',
  locationEthiopia: 'Ethiopia (Editable Location)',
  showroomDistrict: 'Add your city, sub-city, or showroom street address',
  phone: '',
  whatsappNumber: '',
  email: '',
  hours: '',
  aboutHeadline: 'Bespoke automotive importing and private client sales in Ethiopia.',
  aboutDescription:
    'CAR EXPRESS bridges international automotive markets and discerning buyers across Ethiopia. Whether sourcing an executive SUV, a refined daily sedan, a flagship luxury saloon, or a dependable family vehicle, our focus is verified provenance, clear documentation, and attentive personal service from initial consultation to key handover.',
};

export const WHY_CHOOSE_ITEMS: WhyChooseItem[] = [
  {
    number: '01',
    title: 'Curated International Sourcing',
    description:
      'Every vehicle is sourced to match your exact trim, drivetrain, and condition requirements from vetted international suppliers.',
  },
  {
    number: '02',
    title: 'Transparent Import Guidance',
    description:
      'Receive clear explanations of shipping timelines, duty documentation, and total landed requirements before you commit.',
  },
  {
    number: '03',
    title: 'Verified Specification Standards',
    description:
      'We prioritize documented vehicle histories, pre-shipment inspections, and authentic factory specifications without compromise.',
  },
  {
    number: '04',
    title: 'Direct Concierge Communication',
    description:
      'Connect directly with our team via WhatsApp or private consultation for real-time availability, ETB quotations, and status updates.',
  },
];

export const IMPORT_PROCESS_STEPS: ImportStep[] = [
  {
    step: '01',
    title: 'Consultation & Specification',
    description:
      'Share your preferred brand, model, budget, and category—from SUVs and luxury saloons to practical family vehicles.',
  },
  {
    step: '02',
    title: 'Sourcing & Pre-Shipment Inspection',
    description:
      'We locate qualifying vehicles, confirm mechanical and cosmetic condition reports, and provide a formal ETB quotation.',
  },
  {
    step: '03',
    title: 'Shipping & Customs Coordination',
    description:
      'Once confirmed, we coordinate export paperwork, marine freight, port transit, and Ethiopian customs clearance procedures.',
  },
  {
    step: '04',
    title: 'Final Preparation & Handover',
    description:
      'Your vehicle undergoes final presentation and documentation verification prior to delivery in Ethiopia.',
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-pricing',
    question: 'How do I receive an exact price in ETB for a vehicle?',
    answer:
      'Vehicles marked "Contact for Price" are quoted directly based on current sourcing availability, specification, and import duties. Use the WhatsApp Inquiry button on any vehicle card or submit the contact form for a tailored ETB quotation.',
  },
  {
    id: 'faq-custom-order',
    question: 'Can CAR EXPRESS import a specific car model not shown on this page?',
    answer:
      'Yes. In addition to listed vehicles, we accept custom import requests for specific brands, model years, trims, hybrid or electric powertrains, and color preferences across SUVs, sedans, luxury vehicles, and family cars.',
  },
  {
    id: 'faq-inspection',
    question: 'How is vehicle condition verified before shipping to Ethiopia?',
    answer:
      'Before purchase and export, vehicles are reviewed through specification checks and pre-shipment inspection documentation so buyers have clarity on condition, mileage, and equipment prior to dispatch.',
  },
  {
    id: 'faq-categories',
    question: 'What types of vehicles do you specialize in importing?',
    answer:
      'We work across four core categories: executive and off-road capable SUVs, fuel-efficient and hybrid sedans, flagship luxury vehicles, and spacious three-row or multi-purpose family cars.',
  },
  {
    id: 'faq-contact',
    question: 'How can I schedule an in-person consultation in Ethiopia?',
    answer:
      'Reach out via the Contact section below or WhatsApp to arrange a private consultation at our Ethiopian office once your preferred vehicle category or inquiry details are shared.',
  },
];
