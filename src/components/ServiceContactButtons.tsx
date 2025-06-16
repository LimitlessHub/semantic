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
    // FIX: Added `sm:items-stretch` to make both buttons have the same height on larger screens
    <div className="flex flex-col sm:flex-row gap-4 sm:items-stretch">
      <Button asChild className="bg-green-600 hover:bg-green-700 text-white px-6 py-4 text-base sm:text-lg w-full sm:w-auto">
        {/* Added h-full to the anchor tag to make it fill the button's height */}
        <a href={`tel:${city.phoneNumbers[0]}`} className="flex items-center justify-center gap-x-2 h-full">
          <Phone />
          <span className="break-all">{t('button.contact')}: {city.phoneNumbers[0]}</span>
        </a>
      </Button>
      <Button asChild variant="outline" className="border-white/30 bg-white/10 text-white hover:bg-white/20 px-6 py-4 text-base sm:text-lg w-full sm:w-auto">
        {/* Added h-full to the anchor tag to make it fill the button's height */}
        <a href={`https://wa.me/${city.whatsappNumbers[0].replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-x-2 h-full">
          <MessageCircle />
          <span className="break-all">{t('whatsapp')}: {city.whatsappNumbers[0]}</span>
        </a>
      </Button>
    </div>
  );
}
