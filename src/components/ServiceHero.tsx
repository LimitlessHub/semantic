import { Star } from 'lucide-react';
import ServiceBreadcrumb from '@/components/ServiceBreadcrumb';
import { Country, City, Service } from '@/types';
import ServiceContactButtons from './ServiceContactButtons';

interface ServiceHeroProps {
  service: Service;
  city: City;
  country: Country;
  language: string;
  averageRating: number;
  reviewCount: number; // سنستقبل العدد العشوائي هنا
  serviceImage: string;
}

export default function ServiceHero({ service, city, country, language, averageRating, reviewCount, serviceImage }: ServiceHeroProps) {
  return (
    // FIX: Main container is now a responsive grid (1 col on mobile, 2 on desktop)
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
      
      {/* Text Content Column - Placed first in code for mobile */}
      {/* In RTL, this will appear on the right on large screens */}
      <div className="space-y-4 text-center rtl:lg:text-right ltr:lg:text-left">
        <ServiceBreadcrumb country={country} city={city} language={language} />
        
        <h1 className="text-4xl md:text-5xl font-bold text-white">
          {language === 'ar' ? service.nameAr : service.name} في {language === 'ar' ? city.nameAr : city.name}
        </h1>

        <p className="text-lg text-blue-200">
          {language === 'ar' ? service.descriptionAr : service.description}
        </p>
        
        <div className="flex items-center justify-center lg:justify-start gap-x-3">
          <div className="flex items-center gap-x-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${i < Math.round(averageRating) ? 'text-yellow-400 fill-current' : 'text-gray-400'}`}
              />
            ))}
          </div>
          <span className="text-white font-semibold">
            {averageRating.toFixed(1)} ({reviewCount} تقييم)
          </span>
        </div>

        <div className="pt-4">
            <ServiceContactButtons city={city} />
        </div>
      </div>

      {/* Image Column - Placed second in code for mobile */}
      {/* In RTL, this will appear on the left on large screens */}
      <div className="flex items-center justify-center">
        <img 
          src={serviceImage} 
          alt={language === 'ar' ? service.nameAr : service.name} 
          className="rounded-lg shadow-2xl w-full max-w-md object-cover aspect-square"
          onError={(e) => { e.currentTarget.src = '/images/services/default.jpg'; }} // Fallback image
        />
      </div>

    </section>
  );
}
