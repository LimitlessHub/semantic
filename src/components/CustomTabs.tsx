import { Phone, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getCities, getCountries } from '@/lib/cms';
import { City, Country } from '@/types';

export default function FloatingContactButtons() {
  const location = useLocation();
  const [contactInfo, setContactInfo] = useState<{ phone: string; whatsapp: string; } | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const path = location.pathname;
    const pathParts = path.split('/').filter(Boolean);
    
    async function loadContactInfo() {
      try {
        const [cities, countries] = await Promise.all([ getCities(), getCountries() ]);

        // Default contact info
        let phone = '+966-XXX-XXXX';
        let whatsapp = '+966-XXX-XXXX';

        if (pathParts.length >= 1) {
          const countrySlug = pathParts[0];
          const country = countries.find(c => c.slug === countrySlug);
          
          if (country) {
            if (pathParts.length >= 2) {
              const citySlug = pathParts[1];
              const city = cities.find(c => c.slug === citySlug && c.countryId === country.id);
              if (city) {
                phone = city.phoneNumbers[0];
                whatsapp = city.whatsappNumbers[0];
              }
            } else {
              const countryCities = cities.filter(c => c.countryId === country.id);
              const capitalCity = countryCities.find(c => c.isCapital) || countryCities[0];
              if (capitalCity) {
                phone = capitalCity.phoneNumbers[0];
                whatsapp = capitalCity.whatsappNumbers[0];
              }
            }
          }
        }
        setContactInfo({ phone, whatsapp });
      } catch (error) {
        console.error('Error loading contact info:', error);
        setContactInfo({ phone: '+966-XXX-XXXX', whatsapp: '+966-XXX-XXXX' });
      }
    }

    loadContactInfo();
    const timer = setTimeout(() => setIsVisible(true), 1000);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (!contactInfo || !isVisible) return null;

  const handlePhoneClick = () => { window.open(`tel:${contactInfo.phone}`, '_self'); };
  const handleWhatsAppClick = () => {
    const cleanNumber = contactInfo.whatsapp.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${cleanNumber}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 end-6 z-50 flex flex-col gap-3">
      {/* --- FIX: Updated size, shape, and color for the Phone button --- */}
      <Button
        onClick={handlePhoneClick}
        className="w-12 h-12 rounded-2xl bg-blue-600 hover:bg-blue-700 shadow-lg transition-all duration-300 hover:scale-110 group"
        size="icon"
      >
        <Phone className="w-6 h-6 text-white" />
        <span className="absolute end-14 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {contactInfo.phone}
        </span>
      </Button>

      {/* --- FIX: Updated size and shape for the WhatsApp button --- */}
      <Button
        onClick={handleWhatsAppClick}
        className="w-12 h-12 rounded-2xl bg-green-500 hover:bg-green-600 shadow-lg transition-all duration-300 hover:scale-110 group"
        size="icon"
      >
        <MessageCircle className="w-6 h-6 text-white" />
        <span className="absolute end-14 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          WhatsApp
        </span>
      </Button>
    </div>
  );
}
