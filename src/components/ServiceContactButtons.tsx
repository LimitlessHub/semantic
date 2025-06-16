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
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      {/* FIX: Removed mr-2 from icon, letting the Button's default gap handle spacing */}
      <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-6 text-lg w-full sm:w-auto">
        <Phone className="w-5 h-5" />
        {t('button.contact')}: {city.phoneNumbers[0]}
      </Button>
      <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 px-6 py-6 text-lg w-full sm:w-auto">
        <MessageCircle className="w-5 h-5" />
        {t('whatsapp')}: {city.whatsappNumbers[0]}
      </Button>
    </div>
  );
}
