import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
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
  if (services.length === 0) return null;

  return (
    <div className="container mx-auto px-4">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {services.map((service) => (
            <CarouselItem key={service.id} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 h-full">
                  <CardContent className="flex flex-col items-center justify-center p-6 text-center h-full">
                    <ServiceIcon iconName={service.icon} className="w-12 h-12 text-blue-300 mb-4" />
                    <h4 className="text-lg font-semibold text-white mb-2">
                      {language === 'ar' ? service.nameAr : service.name}
                    </h4>
                    <p className="text-sm text-blue-200 mb-4 flex-grow">
                      {language === 'ar' ? service.descriptionAr.substring(0, 70) : service.description.substring(0, 70)}...
                    </p>
                    <Link to={`/${country}/${city.slug}/${service.slug}`} className="mt-auto w-full">
                      <div className="bg-blue-600 text-white rounded-md py-2 px-4 hover:bg-blue-700 transition-colors w-full">
                        عرض التفاصيل
                      </div>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>
    </div>
  );
}
