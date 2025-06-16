import { Star } from 'lucide-react';
import ServiceBreadcrumb from '@/components/ServiceBreadcrumb';
import { Country, City, Service } from '@/types';

interface ServiceHeroProps {
  service: Service;
  city: City;
  country: Country;
  language: string;
  averageRating: number;
  reviewCount: number;
  serviceImage: string;
}

export default function ServiceHero({ service, city, country, language, averageRating, reviewCount, serviceImage }: ServiceHeroProps) {
  return (
    <section className="relative h-80 flex items-center justify-center text-center text-white px-4 -mx-4 sm:-mx-0 rounded-b-lg sm:rounded-lg overflow-hidden">
      <div className="absolute inset-0 bg-black/60 z-10"></div>
      <img 
        src={serviceImage} 
        alt={language === 'ar' ? service.nameAr : service.name} 
        className="absolute inset-0 w-full h-full object-cover" 
        onError={(e) => { e.currentTarget.src = '/images/services/default.jpg'; }} // Fallback image
      />
      <div className="relative z-20">
        <ServiceBreadcrumb country={country} city={city} language={language} />
        <h1 className="text-4xl md:text-6xl font-bold mt-4">
          {language === 'ar' ? service.nameAr : service.name} في {language === 'ar' ? city.nameAr : city.name}
        </h1>
        <div className="flex items-center justify-center gap-x-3 mt-4">
          <div className="flex items-center gap-x-1">
            <Star className="w-5 h-5 text-yellow-400 fill-current" />
            <span>{averageRating.toFixed(1)}</span>
          </div>
          <span>({reviewCount} تقييم)</span>
        </div>
      </div>
    </section>
  );
}
