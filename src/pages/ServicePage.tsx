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
            <h1 className="text-3xl font-bold text-white mb-4">{t('service.notFound')}</h1>
            <p className="text-blue-200">{t('service.notAvailable')}</p>
            <p className="text-blue-200">{t('service.checkURL')}</p>
          </div>
        </div>
      </Layout>
    );
  }

  const seoData = generateServicePageSEO(currentService, currentCity, currentCountry, language);

  const cityTestimonials = testimonials.filter(
    t => t.serviceId === currentService.id && (t.city === currentCity.name || t.city === currentCity.slug)
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

      <div className="container mx-auto px-4 py-8">
        {currentService.isEmergency && (
          <UrgentServiceIndicator
            onUrgentRequest={handleUrgentRequest}
            serviceType={language === 'ar' ? currentService.nameAr : currentService.name}
            isAvailable={true}
          />
        )}
      </div>

      {/* --- FIX: Restructured the main grid to be responsive --- */}
      <main className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
          
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-8">
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

          {/* Sidebar Column */}
          <aside className="lg:sticky lg:top-24">
            <AvailabilityStatus
              serviceId={currentService.id}
              cityId={currentCity.slug}
            />
          </aside>
        </div>
      </main>

      <div className="mt-12">
        <ServiceFormSection
          service={currentService}
          city={currentCity}
          country={currentCountry}
          isUrgent={showUrgentForm}
        />
      </div>

      <div className="mt-12">
        <Testimonials
          testimonials={cityTestimonials}
          serviceId={currentService.id}
          cityId={currentCity.slug}
        />
      </div>

      <div className="mt-12">
        <RelatedServices
          services={relatedServices}
          city={currentCity}
          country={countrySlug || ''}
          language={language}
        />
      </div>
    </Layout>
  );
};

export default ServicePage;
