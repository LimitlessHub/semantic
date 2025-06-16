import { useParams } from 'react-router-dom';
import { useEffect, useState, useMemo } from 'react';
import Layout from '@/components/Layout';
import Testimonials from '@/components/Testimonials';
import SEOHead from '@/components/SEOHead';
import AvailabilityStatus from '@/components/AvailabilityStatus';
import UrgentServiceIndicator from '@/components/UrgentServiceIndicator';
import ServiceFormSection from '@/components/ServiceFormSection';
import RelatedServices from '@/components/RelatedServices';
import ServiceHero from '@/components/ServiceHero';
import ServiceFeatures from '@/components/ServiceFeatures';
import ServiceFAQ from '@/components/ServiceFAQ';
import ServiceCoverage from '@/components/ServiceCoverage';
import { useLanguage } from '@/contexts/LanguageContext';
import { getCountries, getServices, getCities } from '@/lib/cms';
import { generateServicePageSEO } from '@/lib/seo';
import { testimonials } from '@/lib/testimonials';
import { Country, Service, City } from '@/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ServicePage = () => {
  const { country: countrySlug, city: citySlug, service: serviceSlug } = useParams();
  const { language, t } = useLanguage();
  const [currentCountry, setCurrentCountry] = useState<Country | null>(null);
  const [currentService, setCurrentService] = useState<Service | null>(null);
  const [currentCity, setCurrentCity] = useState<City | null>(null);
  const [relatedServices, setRelatedServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const [countriesData, servicesData, citiesData] = await Promise.all([ getCountries(), getServices(), getCities() ]);
        const foundCountry = countriesData.find(c => c.slug === countrySlug);
        const foundService = servicesData.find(s => s.slug === serviceSlug);
        const foundCity = citiesData.find(c => c.slug === citySlug && c.countryId === foundCountry?.id);
        setCurrentCountry(foundCountry || null);
        setCurrentService(foundService || null);
        setCurrentCity(foundCity || null);
        if (foundService) {
          const related = servicesData.filter(s => s.category === foundService.category && s.slug !== foundService.slug);
          setRelatedServices(related);
        }
      } catch (error) { console.error('Error loading service page data:', error); } 
      finally { setLoading(false); }
    }
    if (countrySlug && citySlug && serviceSlug) { loadData(); }
  }, [countrySlug, citySlug, serviceSlug]);

  const reviewCount = useMemo(() => {
    if (!currentService) return 0;
    const seed = currentService.name.length;
    return 150 + Math.floor(((seed * 9301 + 49297) % 233280) / 233280 * 350);
  }, [currentService]);

  if (loading || !currentService || !currentCity || !currentCountry) {
    return (<Layout><div className="min-h-screen flex items-center justify-center"><div className="text-white text-xl">{t('loading')}</div></div></Layout>);
  }

  const seoData = generateServicePageSEO(currentService, currentCity, currentCountry, language);
  const averageRating = 4.8;
  const serviceImage = `/images/services/${currentService.slug}.jpg`;

  return (
    <Layout>
      <SEOHead seoData={seoData} language={language} />
      
      {currentService.isEmergency && ( <div className="container mx-auto px-4 pt-8"><UrgentServiceIndicator onUrgentRequest={() => {}} serviceType={language === 'ar' ? currentService.nameAr : currentService.name} isAvailable={true} /></div> )}
      
      <div className="container mx-auto px-4 pt-8"><ServiceHero service={currentService} city={currentCity} country={currentCountry} language={language} averageRating={averageRating} reviewCount={reviewCount} serviceImage={serviceImage}/></div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
          <main className="lg:col-span-2">
            <Tabs defaultValue="overview" className="w-full">
              {/* FIX: Removed programmatic reversal. The new plugin will handle flex direction automatically */}
              <TabsList className="flex w-full border-b border-white/10 rounded-none bg-transparent p-0">
                  <TabsTrigger value="overview" className="flex-1 text-blue-300 data-[state=active]:text-white data-[state=active]:border-white data-[state=active]:shadow-none border-b-2 border-transparent transition-colors duration-300">نظرة عامة</TabsTrigger>
                  <TabsTrigger value="faq" className="flex-1 text-blue-300 data-[state=active]:text-white data-[state=active]:border-white data-[state=active]:shadow-none border-b-2 border-transparent transition-colors duration-300">الأسئلة الشائعة</TabsTrigger>
                  <TabsTrigger value="coverage" className="flex-1 text-blue-300 data-[state=active]:text-white data-[state=active]:border-white data-[state=active]:shadow-none border-b-2 border-transparent transition-colors duration-300">مناطق التغطية</TabsTrigger>
              </TabsList>
              
              {/* FIX: Using `text-start` which is now powered by the RTL plugin */}
              <div className="mt-6 text-start">
                <TabsContent value="overview"><h2 className="text-2xl font-bold text-white mb-4">وصف الخدمة</h2><p className="text-gray-300 whitespace-pre-line leading-relaxed">{(currentService as any).fullDescriptionAr || 'وصف الخدمة غير متوفر حاليًا.'}</p></TabsContent>
                <TabsContent value="faq"><ServiceFAQ serviceId={currentService.slug} /></TabsContent>
                <TabsContent value="coverage"><ServiceCoverage cityId={currentCity.id} /></TabsContent>
              </div>
            </Tabs>
            <ServiceFeatures />
          </main>
          <aside className="lg:sticky lg:top-24 space-y-8" id="service-form">
            <AvailabilityStatus serviceId={currentService.id} cityId={currentCity.slug} />
            <ServiceFormSection service={currentService} city={currentCity} country={currentCountry} />
          </aside>
        </div>
      </div>
      
      <div className="py-12 bg-blue-900/30"><Testimonials testimonials={testimonials.filter(t => t.serviceId === currentService.slug)} /></div>
      
      {relatedServices.length > 0 && (
        <section className="py-12"><h2 className="text-3xl font-bold text-white text-center mb-8">{t('service.related')}</h2><RelatedServices services={relatedServices} city={currentCity} country={countrySlug || ''} language={language} /></section>
      )}
    </Layout>
  );
};

export default ServicePage;
