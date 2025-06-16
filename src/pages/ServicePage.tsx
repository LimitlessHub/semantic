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
  const { country: countrySlug, city: citySlug, service: serviceSlug } = useParams();
  const { language, t } = useLanguage();
  const [currentCountry, setCurrentCountry] = useState<Country | null>(null);
  const [currentService, setCurrentService] = useState<Service | null>(null);
  const [currentCity, setCurrentCity] = useState<City | null>(null);
  const [relatedServices, setRelatedServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [showUrgentForm, setShowUrgentForm] = useState(false);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const [countriesData, servicesData, citiesData] = await Promise.all([
          getCountries(),
          getServices(),
          getCities()
        ]);

        const foundCountry = countriesData.find(c => c.slug === countrySlug);
        const foundService = servicesData.find(s => s.slug === serviceSlug);
        const foundCity = citiesData.find(c => c.slug === citySlug && c.countryId === foundCountry?.id);

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

    if (countrySlug && citySlug && serviceSlug) {
      loadData();
    }
  }, [countrySlug, citySlug, serviceSlug]);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-white text-xl">{t('loading')}</div>
        </div>
      </Layout>
    );
  }

  if (!currentCountry || !currentService || !currentCity) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center text-center px-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-4">Service Not Available</h1>
            <p className="text-blue-200">The requested service may not be available in this city, or the URL is incorrect.</p>
            <p className="text-blue-200">Please check the URL or navigate from our homepage.</p>
          </div>
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

      <section className="py-4 px-4">
        <div className="container mx-auto">
          {currentService.isEmergency && (
            <UrgentServiceIndicator
              onUrgentRequest={handleUrgentRequest}
              serviceType={language === 'ar' ? currentService.nameAr : currentService.name}
              isAvailable={true}
            />
          )}
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-3 gap-12 items-start">
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

            <div className="mt-12 lg:mt-0">
              <AvailabilityStatus
                serviceId={currentService.id}
                cityId={currentCity.slug}
              />
            </div>
          </div>
        </div>
      </section>

      <ServiceFormSection
        service={currentService}
        city={currentCity}
        country={currentCountry}
        isUrgent={showUrgentForm}
      />

      <Testimonials
        testimonials={cityTestimonials}
        serviceId={currentService.id}
        cityId={currentCity.slug}
      />

      <RelatedServices
        services={relatedServices}
        city={currentCity}
        country={countrySlug || ''}
        language={language}
      />
    </Layout>
  );
};

export default ServicePage;
