import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import Testimonials from '@/components/Testimonials';
import SEOHead from '@/components/SEOHead';
import AvailabilityStatus from '@/components/AvailabilityStatus';
import UrgentServiceIndicator from '@/components/UrgentServiceIndicator';
import ServiceBreadcrumb from '@/components/ServiceBreadcrumb';
import ServiceHero from '@/components/ServiceHero';
import ServiceContactButtons from '@/components/ServiceContactButtons';
import ServiceFeatures from '@/components/ServiceFeatures';
import ServiceFormSection from '@/components/ServiceFormSection';
import RelatedServices from '@/components/RelatedServices';
import { useLanguage } from '@/contexts/LanguageContext';
import { getCountries, getServices, getCities } from '@/lib/cms';
import { generateServicePageSEO } from '@/lib/seo';
import { testimonials } from '@/lib/testimonials';
import { Country, Service, City } from '@/types';

const ServicePage = () => {
  const { country, city, service } = useParams();
  const { language } = useLanguage();
  const [currentCountry, setCurrentCountry] = useState<Country | null>(null);
  const [currentService, setCurrentService] = useState<Service | null>(null);
  const [currentCity, setCurrentCity] = useState<City | null>(null);
  const [relatedServices, setRelatedServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [showUrgentForm, setShowUrgentForm] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const [countriesData, servicesData, citiesData] = await Promise.all([
          getCountries(),
          getServices(),
          getCities()
        ]);

        const foundCountry = countriesData.find(c => c.slug === country);
        const foundService = servicesData.find(s => s.slug === service);
        const foundCity = citiesData.find(c => c.slug === city && c.countryId === foundCountry?.id);

        setCurrentCountry(foundCountry || null);
        setCurrentService(foundService || null);
        setCurrentCity(foundCity || null);

        // Get related services (same category, different service)
        if (foundService) {
          const related = servicesData
            .filter(s => s.category === foundService.category && s.id !== foundService.id)
            .slice(0, 3);
          setRelatedServices(related);
        }
      } catch (error) {
        console.error('Error loading service page data:', error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [country, city, service]);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-white text-xl">Loading...</div>
        </div>
      </Layout>
    );
  }

  if (!currentCountry || !currentService || !currentCity) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-white text-xl">Service not found</div>
        </div>
      </Layout>
    );
  }

  const seoData = generateServicePageSEO(currentService, currentCity, currentCountry, language);

  const cityTestimonials = testimonials.filter(
    t => t.serviceId === currentService.id && t.city === (language === 'ar' ? currentCity.nameAr : currentCity.name)
  );

  const averageRating = cityTestimonials.length > 0 
    ? cityTestimonials.reduce((sum, t) => sum + t.rating, 0) / cityTestimonials.length 
    : 4.8;

  const handleUrgentRequest = () => {
    setShowUrgentForm(true);
    document.getElementById('service-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Layout>
      <SEOHead seoData={seoData} language={language} />
      
      {/* Urgent Service Indicator */}
      <section className="py-4 px-4">
        <div className="container mx-auto">
          <UrgentServiceIndicator 
            onUrgentRequest={handleUrgentRequest}
            serviceType={currentService.name}
            isAvailable={true}
          />
        </div>
      </section>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <ServiceBreadcrumb 
                country={currentCountry}
                city={currentCity}
                language={language}
              />
              
              <ServiceHero 
                service={currentService}
                city={currentCity}
                language={language}
                averageRating={averageRating}
                reviewCount={cityTestimonials.length}
              />

              <ServiceContactButtons city={currentCity} />

              <ServiceFeatures />
            </div>

            {/* Availability Status */}
            <div>
              <AvailabilityStatus 
                serviceId={currentService.id} 
                cityId={currentCity.slug} 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Service Request Form */}
      <ServiceFormSection 
        service={currentService}
        city={currentCity}
        country={currentCountry}
        isUrgent={showUrgentForm}
      />

      {/* Testimonials for this specific service and city */}
      <Testimonials 
        testimonials={cityTestimonials} 
        serviceId={currentService.id}
        cityId={currentCity.slug}
      />

      {/* Related Services */}
      <RelatedServices 
        services={relatedServices}
        city={currentCity}
        country={country || ''}
        language={language}
      />

      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": `${currentService.name} في ${currentCity.name}`,
            "description": currentService.description,
            "address": {
              "@type": "PostalAddress",
              "addressLocality": currentCity.name,
              "addressCountry": currentCountry.name
            },
            "telephone": currentCity.phoneNumbers[0],
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": averageRating.toFixed(1),
              "reviewCount": cityTestimonials.length,
              "bestRating": "5",
              "worstRating": "1"
            },
            "areaServed": {
              "@type": "City",
              "name": currentCity.name
            }
          })
        }}
      />
    </Layout>
  );
};

export default ServicePage;
