import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Service, City } from '@/types';
import ServiceIcon from './ServiceIcon';

interface RelatedServicesProps {
  services: Service[];
  city: City;
  country: string;
  language: string;
}

export default function RelatedServices({ services, city, country, language }: RelatedServicesProps) {
  if (!services || services.length === 0) {
    return null;
  }

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <Card key={service.id} className="bg-white/5 backdrop-blur-sm border-white/10 hover:border-white/20 transition-all duration-300 h-full">
            <CardContent className="flex flex-col p-6 h-full">
              <div className="flex items-center gap-x-4 mb-3">
                <ServiceIcon iconName={service.icon} className="w-10 h-10 text-blue-300 flex-shrink-0" />
                <h4 className="text-lg font-semibold text-white text-start">
                  {language === 'ar' ? service.nameAr : service.name}
                </h4>
              </div>
              <p className="text-sm text-blue-200 mb-4 flex-grow text-start">
                {language === 'ar' ? service.descriptionAr.substring(0, 90) : service.description.substring(0, 90)}...
              </p>
              <Link to={`/${country}/${city.slug}/${service.slug}`} className="mt-auto w-full">
                {/* FIX: Set text color to dark on hover when background becomes white */}
                <Button variant="outline" className="w-full border-white/40 text-white hover:bg-white hover:text-blue-900 font-semibold transition-colors duration-300">
                  عرض التفاصيل
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
