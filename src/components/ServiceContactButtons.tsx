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
    // FIX: Using flex-wrap to allow buttons to wrap on very small screens.
    <div className="flex flex-wrap gap-4 mb-8">
      <Button asChild className="bg-green-600 hover:bg-green-700 text-white px-6 py-6 text-base sm:text-lg flex-grow">
        <a href={`tel:${city.phoneNumbers[0]}`} className="flex items-center justify-center gap-x-2">
          <Phone />
          <span className="break-all">{t('button.contact')}: {city.phoneNumbers[0]}</span>
        </a>
      </Button>
      <Button asChild variant="outline" className="border-white/30 text-white hover:bg-white/10 px-6 py-6 text-base sm:text-lg flex-grow">
        <a href={`https://wa.me/${city.whatsappNumbers[0].replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-x-2">
          <MessageCircle />
          <span className="break-all">{t('whatsapp')}: {city.whatsappNumbers[0]}</span>
        </a>
      </Button>
    </div>
  );
}
