
import { CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import ServiceIcon from '@/components/ServiceIcon';
import { Service } from '@/types';

interface PopularServicesSectionProps {
  services: Service[];
}

export default function PopularServicesSection({ services }: PopularServicesSectionProps) {
  return (
    <section id="services" className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-white text-center mb-12">
          Popular Services
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card key={service.id} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-3">
                  <ServiceIcon 
                    iconName={service.icon} 
                    className="w-8 h-8 mr-3 text-blue-300" 
                    size={32}
                  />
                  <h3 className="text-xl font-semibold text-white">{service.name}</h3>
                </div>
                <p className="text-blue-100 mb-4">{service.description}</p>
                
                <div className="flex items-center text-green-300 mb-3">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  <span className="text-sm">Available in all countries</span>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {service.keywords.slice(0, 3).map((keyword, index) => (
                    <span key={index} className="text-xs bg-blue-600/50 text-white px-2 py-1 rounded">
                      {keyword}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
