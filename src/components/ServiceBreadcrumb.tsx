
import { MapPin } from 'lucide-react';
import { Country, City } from '@/types';

interface ServiceBreadcrumbProps {
  country: Country;
  city: City;
  language: string;
}

export default function ServiceBreadcrumb({ country, city, language }: ServiceBreadcrumbProps) {
  return (
    <div className="flex items-center text-blue-300 mb-4">
      <MapPin className="w-5 h-5 mr-2" />
      <span>
        {language === 'ar' ? country.nameAr : country.name} → {language === 'ar' ? city.nameAr : city.name}
      </span>
    </div>
  );
}
