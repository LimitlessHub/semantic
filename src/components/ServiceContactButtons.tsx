
import { Phone, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { City } from '@/types';

interface ServiceContactButtonsProps {
  city: City;
}

export default function ServiceContactButtons({ city }: ServiceContactButtonsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg">
        <Phone className="w-5 h-5 mr-2" />
        اتصل الآن: {city.phoneNumbers[0]}
      </Button>
      <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-3 text-lg">
        <MessageCircle className="w-5 h-5 mr-2" />
        واتساب: {city.whatsappNumbers[0]}
      </Button>
    </div>
  );
}
