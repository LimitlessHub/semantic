
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ServiceIcon from '@/components/ServiceIcon';
import { Service, City } from '@/types';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface RelatedServicesProps {
  services: Service[];
  city: City;
  country: string;
  language: string;
}

export default function RelatedServices({ 
  services, 
  city, 
  country, 
  language 
}: RelatedServicesProps) {
  if (services.length === 0) return null;

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-white text-center mb-12">
          خدمات ذات صلة في {language === 'ar' ? city.nameAr : city.name}
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card key={service.id} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <ServiceIcon 
                    iconName={service.icon} 
                    className="w-8 h-8 mr-3 text-blue-300" 
                    size={32}
                  />
                  <h3 className="text-xl font-semibold text-white">
                    {language === 'ar' ? service.nameAr : service.name}
                  </h3>
                </div>
                
                <p className="text-blue-100 mb-4 text-sm">
                  {language === 'ar' ? service.descriptionAr : service.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {service.keywords.slice(0, 3).map((keyword, index) => (
                    <span key={index} className="text-xs bg-blue-600/50 text-white px-2 py-1 rounded">
                      {keyword}
                    </span>
                  ))}
                </div>
                
                <Link to={`/${country}/${city.slug}/${service.slug}`}>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    احجز الآن
                    <ArrowRight className="w-4 h-4 mr-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
