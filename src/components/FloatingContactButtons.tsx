import { Phone, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getCities, getCountries } from '@/lib/cms';
import { City, Country } from '@/types';
import { useLanguage } from '@/contexts/LanguageContext'; // ١. استيراد hook اللغة

export default function FloatingContactButtons() {
  const location = useLocation();
  const { language } = useLanguage(); // ٢. استخدام hook اللغة
  const [contactInfo, setContactInfo] = useState<{ phone: string; whatsapp: string; } | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const path = location.pathname;
    const pathParts = path.split('/').filter(Boolean);
    
    async function loadContactInfo() {
      try {
        const [cities, countries] = await Promise.all([ getCities(), getCountries() ]);
        let phone = '+966-XXX-XXXX';
        let whatsapp = '+966-XXX-XXXX';
        if (pathParts.length >= 1) {
          const countrySlug = pathParts[0];
          const country = countries.find(c => c.slug === countrySlug);
          if (country) {
            const countryCities = cities.filter(c => c.countryId === country.id);
            let cityToUse: City | undefined;
            if (pathParts.length >= 2) {
              const citySlug = pathParts[1];
              cityToUse = cities.find(c => c.slug === citySlug && c.countryId === country.id);
            } else {
              cityToUse = countryCities.find(c => c.isCapital) || countryCities[0];
            }
            if (cityToUse) {
              phone = cityToUse.phoneNumbers[0];
              whatsapp = cityToUse.whatsappNumbers[0];
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
  
  // ٣. تحديد مكان الأزرار بناءً على اللغة
  const positionClass = language === 'ar' ? 'right-6' : 'left-6';

  return (
    <div className={`fixed bottom-6 ${positionClass} z-50 flex flex-col gap-3`}>
      <Button
        onClick={handlePhoneClick}
        className="w-12 h-12 rounded-2xl bg-blue-600 hover:bg-blue-700 shadow-lg transition-all duration-300 hover:scale-110 group"
        size="icon"
      >
        {/* ٤. تكبير حجم الأيقونة */}
        <Phone className="w-7 h-7 text-white" />
        <span className={`absolute top-1/2 -translate-y-1/2 bg-gray-800 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${language === 'ar' ? 'left-14' : 'right-14'}`}>
          {contactInfo.phone}
        </span>
      </Button>

      <Button
        onClick={handleWhatsAppClick}
        className="w-12 h-12 rounded-2xl bg-green-500 hover:bg-green-600 shadow-lg transition-all duration-300 hover:scale-110 group"
        size="icon"
      >
        {/* ٤. تكبير حجم الأيقونة */}
        <MessageCircle className="w-7 h-7 text-white" />
        <span className={`absolute top-1/2 -translate-y-1/2 bg-gray-800 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${language === 'ar' ? 'left-14' : 'right-14'}`}>
          WhatsApp
        </span>
      </Button>
    </div>
  );
}
