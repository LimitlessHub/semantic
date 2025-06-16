import { Star } from 'lucide-react';
import ServiceBreadcrumb from '@/components/ServiceBreadcrumb';
import ServiceContactButtons from '@/components/ServiceContactButtons';
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
  
  const TextContent = (
    <div className={`flex flex-col h-full justify-center space-y-4 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
      <ServiceBreadcrumb country={country} city={city} language={language} />
      <h1 className="text-4xl md:text-5xl font-bold text-white">{language === 'ar' ? service.nameAr : service.name} في {language === 'ar' ? city.nameAr : city.name}</h1>
      <p className="text-lg text-blue-200">{language === 'ar' ? service.descriptionAr : service.description}</p>
      
      {/* FIX: Rating alignment is now forced correctly for RTL */}
      <div className={`flex items-center gap-x-3 ${language === 'ar' ? 'justify-end' : 'justify-start'}`}>
        <div className="flex items-center gap-x-1">
          {[...Array(5)].map((_, i) => ( <Star key={i} className={`w-5 h-5 ${i < Math.round(averageRating) ? 'text-yellow-400 fill-current' : 'text-gray-400'}`} /> ))}
        </div>
        <span className="text-white font-semibold">{averageRating.toFixed(1)} ({reviewCount} تقييم)</span>
      </div>

      <div className="pt-4"><ServiceContactButtons city={city} /></div>
    </div>
  );

  const ImageContent = (
    <div className="flex items-center justify-center">
      <img src={serviceImage} alt={language === 'ar' ? service.nameAr : service.name} className="rounded-lg shadow-2xl w-full max-w-md object-cover aspect-square" onError={(e) => { e.currentTarget.src = '/images/services/default.jpg'; }} />
    </div>
  );

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center py-8">
      {language === 'ar' ? (<> {TextContent} {ImageContent} </>) : (<> {ImageContent} {TextContent} </>)}
    </section>
  );
}
