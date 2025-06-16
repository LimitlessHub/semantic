
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
      <div className="flex items-center mb-6">
        <ServiceIcon 
          iconName={service.icon} 
          className="w-12 h-12 mr-4 text-blue-300" 
          size={48}
        />
        <h1 className="text-4xl lg:text-5xl font-bold text-white">
          {language === 'ar' ? service.nameAr : service.name} في {language === 'ar' ? city.nameAr : city.name}
        </h1>
      </div>
      
      <p className="text-xl text-blue-100 mb-8">
        {language === 'ar' ? service.descriptionAr : service.description} - خدمة احترافية متاحة على مدار الساعة
      </p>

      <div className="flex items-center space-x-4 space-x-reverse mb-8">
        <div className="flex items-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-5 h-5 ${
                star <= averageRating ? 'text-yellow-400 fill-current' : 'text-gray-400'
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
