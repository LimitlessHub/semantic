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
    // FIX: Using w-full on mobile, and w-auto on larger screens. Removed flex-grow.
    <div className="flex flex-col sm:flex-row gap-4">
      <Button asChild className="bg-green-600 hover:bg-green-700 text-white px-6 py-6 text-base sm:text-lg w-full sm:w-auto">
        <a href={`tel:${city.phoneNumbers[0]}`} className="flex items-center justify-center gap-x-2">
          <Phone />
          <span className="break-all">{t('button.contact')}: {city.phoneNumbers[0]}</span>
        </a>
      </Button>
      <Button asChild variant="outline" className="border-white/30 bg-white/10 text-white hover:bg-white/20 px-6 py-6 text-base sm:text-lg w-full sm:w-auto">
        <a href={`https://wa.me/${city.whatsappNumbers[0].replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-x-2">
          <MessageCircle />
          <span className="break-all">{t('whatsapp')}: {city.whatsappNumbers[0]}</span>
        </a>
      </Button>
    </div>
  );
}
