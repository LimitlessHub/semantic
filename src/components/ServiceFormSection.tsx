
import ServiceRequestForm from '@/components/ServiceRequestForm';
import { Service, City, Country } from '@/types';

interface ServiceFormSectionProps {
  service: Service;
  city: City;
  country: Country;
  isUrgent: boolean;
}

export default function ServiceFormSection({ 
  service, 
  city, 
  country, 
  isUrgent 
}: ServiceFormSectionProps) {
  return (
    <section id="service-form" className="py-16 bg-white/5 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-white text-center mb-12">
          احجز خدمتك الآن
        </h2>
        <div className="max-w-2xl mx-auto">
          <ServiceRequestForm 
            service={service}
            city={city}
            country={country}
            isUrgent={isUrgent}
          />
        </div>
      </div>
    </section>
  );
}
