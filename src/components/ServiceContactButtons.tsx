import { Phone, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { City } from '@/types';
import { useLanguage } from '@/contexts/LanguageContext';

interface ServiceContactButtonsProps {
  city: City;
}

export default function ServiceContactButtons({ city }: ServiceContactButtonsProps) {
  const { t } = useLanguage();
  return (
    // FIX: Added flex-wrap to prevent overflow on very small screens
    <div className="flex flex-col sm:flex-row gap-4 mb-8 flex-wrap">
      <Button asChild className="bg-green-600 hover:bg-green-700 text-white px-6 py-6 text-lg w-full sm:w-auto flex-grow sm:flex-grow-0">
        <a href={`tel:${city.phoneNumbers[0]}`}>
          <Phone />
          {t('button.contact')}: {city.phoneNumbers[0]}
        </a>
      </Button>
      <Button asChild variant="outline" className="border-white/30 text-white hover:bg-white/10 px-6 py-6 text-lg w-full sm:w-auto flex-grow sm:flex-grow-0">
        <a href={`https://wa.me/${city.whatsappNumbers[0].replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer">
          <MessageCircle />
          {t('whatsapp')}: {city.whatsappNumbers[0]}
        </a>
      </Button>
    </div>
  );
}
