import { Phone, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { City } from '@/types';

interface ServiceContactButtonsProps {
  city: City;
}

export default function ServiceContactButtons({ city }: ServiceContactButtonsProps) {
  const { t } = useLanguage();
  return (
    // FIX: Using a responsive grid and simplified button content
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white">
        <a href={`tel:${city.phoneNumbers[0]}`} className="flex items-center justify-center gap-x-2">
          <Phone />
          <span>{t('button.contact')}</span>
        </a>
      </Button>
      <Button asChild size="lg" variant="outline" className="border-white/30 bg-white/10 text-white hover:bg-white/20">
        <a href={`https://wa.me/${city.whatsappNumbers[0].replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-x-2">
          <MessageCircle />
          <span>{t('whatsapp')}</span>
        </a>
      </Button>
    </div>
  );
}
