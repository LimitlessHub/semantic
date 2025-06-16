import { Star } from 'lucide-react';
import ServiceIcon from '@/components/ServiceIcon';
import { Service, City } from '@/types';

interface ServiceHeroProps {
  service: Service;
  city: City;
  language: string;
  averageRating: number;
  reviewCount: number;
}

export default function ServiceHero({ 
  service, 
  city, 
  language, 
  averageRating, 
  reviewCount 
}: ServiceHeroProps) {
  return (
    <div>
      {/* FIX: Used flex and gap for proper icon-text spacing */}
      <div className="flex items-center gap-x-4 mb-4">
        <ServiceIcon 
          iconName={service.icon} 
          className="w-12 h-12 text-blue-300 flex-shrink-0" 
          size={48}
        />
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
          {language === 'ar' ? service.nameAr : service.name} في {language === 'ar' ? city.nameAr : city.name}
        </h1>
      </div>
      
      <p className="text-lg md:text-xl text-blue-100 mb-6">
        {language === 'ar' ? service.descriptionAr : service.description} - خدمة احترافية متاحة على مدار الساعة
      </p>

      {/* FIX: Used flex and gap for rating stars spacing */}
      <div className="flex items-center gap-x-3 mb-8">
        <div className="flex gap-x-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 ${
                i < Math.round(averageRating) ? 'text-yellow-400 fill-current' : 'text-gray-400'
              }`}
            />
          ))}
        </div>
        <span className="text-white font-semibold">
          {averageRating.toFixed(1)} ({reviewCount} تقييم)
        </span>
      </div>
    </div>
  );
}
