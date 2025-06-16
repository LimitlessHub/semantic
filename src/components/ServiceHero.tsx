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
    // FIX: Main container is now a responsive grid. Order is reversed for RTL on large screens.
    <section className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${language === 'ar' ? 'lg:grid-flow-col-dense' : ''}`}>
      
      {/* Text Content Column - Will appear on the right in RTL */}
      <div className={`space-y-4 ${language === 'ar' ? 'lg:col-start-2' : ''} text-center ${language === 'ar' ? 'lg:text-right' : 'lg:text-left'}`}>
        <ServiceBreadcrumb country={country} city={city} language={language} />
        
        <h1 className="text-4xl md:text-5xl font-bold text-white">
          {language === 'ar' ? service.nameAr : service.name} في {language === 'ar' ? city.nameAr : city.name}
        </h1>

        <p className="text-lg text-blue-200">
          {language === 'ar' ? service.descriptionAr : service.description}
        </p>
        
        <div className={`flex items-center gap-x-3 ${language === 'ar' ? 'justify-center lg:justify-end' : 'justify-center lg:justify-start'}`}>
          <div className="flex items-center gap-x-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-5 h-5 ${i < Math.round(averageRating) ? 'text-yellow-400 fill-current' : 'text-gray-400'}`} />
            ))}
          </div>
          <span className="text-white font-semibold">
            {averageRating.toFixed(1)} ({reviewCount} تقييم)
          </span>
        </div>
      </div>

      {/* Image Column - Will appear on the left in RTL */}
      <div className={`flex items-center justify-center ${language === 'ar' ? 'lg:col-start-1' : ''}`}>
        <img 
          src={serviceImage} 
          alt={language === 'ar' ? service.nameAr : service.name} 
          className="rounded-lg shadow-2xl w-full max-w-md object-cover aspect-square"
          onError={(e) => { e.currentTarget.src = '/images/services/default.jpg'; }}
        />
      </div>

    </section>
  );
}
