import { useEffect, useState } from 'react';
import { AboutAndWhySection } from './components/AboutAndWhySection';
import { ContactSection } from './components/ContactSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { ImportProcessSection } from './components/ImportProcessSection';
import { Navbar } from './components/Navbar';
import { ShowroomManagerModal } from './components/ShowroomManagerModal';
import { VehicleCollectionSection } from './components/VehicleCollectionSection';
import { WhatsAppInquiryModal } from './components/WhatsAppInquiryModal';
import { DEFAULT_CONTACT_CONFIG } from './data/siteConfig';
import { DEFAULT_VEHICLES } from './data/vehicles';
import { ContactConfig, VehicleListing } from './types/showroom';

const STORAGE_VEHICLES_KEY = 'carexpress_vehicles_v1';
const STORAGE_CONTACT_KEY = 'carexpress_contact_v1';

function loadStoredVehicles(): VehicleListing[] {
  try {
    const raw = localStorage.getItem(STORAGE_VEHICLES_KEY);
    if (!raw) return DEFAULT_VEHICLES;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : DEFAULT_VEHICLES;
  } catch {
    return DEFAULT_VEHICLES;
  }
}

function loadStoredContact(): ContactConfig {
  try {
    const raw = localStorage.getItem(STORAGE_CONTACT_KEY);
    if (!raw) return DEFAULT_CONTACT_CONFIG;
    return { ...DEFAULT_CONTACT_CONFIG, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_CONTACT_CONFIG;
  }
}

export default function App() {
  const [vehicles, setVehicles] = useState<VehicleListing[]>(loadStoredVehicles);
  const [contactConfig, setContactConfig] = useState<ContactConfig>(loadStoredContact);

  const [managerOpen, setManagerOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<VehicleListing | undefined>(
    undefined
  );
  const [inquiryModalVehicle, setInquiryModalVehicle] =
    useState<VehicleListing | null>(null);
  const [contactSubject, setContactSubject] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_VEHICLES_KEY, JSON.stringify(vehicles));
    } catch {
      // Ignore storage quota errors in restricted browsers
    }
  }, [vehicles]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_CONTACT_KEY, JSON.stringify(contactConfig));
    } catch {
      // Ignore storage quota errors in restricted browsers
    }
  }, [contactConfig]);

  const handleOpenManager = (vehicleToEdit?: VehicleListing) => {
    setEditingVehicle(vehicleToEdit);
    setManagerOpen(true);
  };

  const handleSaveVehicle = (saved: VehicleListing) => {
    setVehicles((prev) => {
      const exists = prev.some((v) => v.id === saved.id);
      return exists
        ? prev.map((v) => (v.id === saved.id ? saved : v))
        : [saved, ...prev];
    });
    setEditingVehicle(undefined);
  };

  const handleDeleteVehicle = (id: string) => {
    setVehicles((prev) => prev.filter((v) => v.id !== id));
  };

  const handleResetVehicles = () => {
    setVehicles(DEFAULT_VEHICLES);
    setEditingVehicle(undefined);
  };

  const handleProceedToContactForm = (vehicle: VehicleListing) => {
    setContactSubject(`${vehicle.brand} ${vehicle.model} (${vehicle.category})`);
    setInquiryModalVehicle(null);
    const contactEl = document.getElementById('contact');
    contactEl?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#07090C] text-[#F4F4F5]">
      <Navbar />

      <main>
        <HeroSection />

        <VehicleCollectionSection
          vehicles={vehicles}
          whatsappNumber={contactConfig.whatsappNumber}
          onOpenManager={handleOpenManager}
          onRequestUnconfiguredInquiry={(vehicle) =>
            setInquiryModalVehicle(vehicle)
          }
        />

        <AboutAndWhySection config={contactConfig} />

        <ImportProcessSection />

        <FaqSection />

        <ContactSection
          key={contactSubject}
          config={contactConfig}
          onUpdateConfig={setContactConfig}
          onResetConfig={() => setContactConfig(DEFAULT_CONTACT_CONFIG)}
          preselectedSubject={contactSubject}
        />
      </main>

      <Footer config={contactConfig} />

      <ShowroomManagerModal
        isOpen={managerOpen}
        vehicles={vehicles}
        initialEditVehicle={editingVehicle}
        onClose={() => setManagerOpen(false)}
        onSaveVehicle={handleSaveVehicle}
        onDeleteVehicle={handleDeleteVehicle}
        onResetVehicles={handleResetVehicles}
      />

      <WhatsAppInquiryModal
        vehicle={inquiryModalVehicle}
        onClose={() => setInquiryModalVehicle(null)}
        onSaveWhatsAppNumber={(whatsappNumber) => {
          setContactConfig((prev) => ({ ...prev, whatsappNumber }));
          setInquiryModalVehicle(null);
        }}
        onProceedToContactForm={handleProceedToContactForm}
      />
    </div>
  );
}
