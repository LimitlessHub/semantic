import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
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
  const [showUrgentForm, setShowUrgentForm] = useState(false);

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
          const related = servicesData.filter(s => s.category === foundService.category && s.id !== foundService.id).slice(0, 8);
          setRelatedServices(related);
        }
      } catch (error) { console.error('Error loading service page data:', error); } 
      finally { setLoading(false); }
    }
    if (countrySlug && citySlug && serviceSlug) { loadData(); }
  }, [countrySlug, citySlug, serviceSlug]);
  
  const handleUrgentRequest = () => {
    setShowUrgentForm(true);
    document.getElementById('service-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (loading || !currentService || !currentCity || !currentCountry) {
    return (<Layout><div className="min-h-screen flex items-center justify-center"><div className="text-white text-xl">{t('loading')}</div></div></Layout>);
  }

  const seoData = generateServicePageSEO(currentService, currentCity, currentCountry, language);
  const cityTestimonials = testimonials.filter(t => t.serviceId === currentService.slug);
  const averageRating = cityTestimonials.length > 0 ? cityTestimonials.reduce((sum, t) => sum + t.rating, 0) / cityTestimonials.length : 4.8;
  const serviceImage = `/images/services/${currentService.slug}.jpg`;

  const pageTabs = [
    { value: "overview", label: "نظرة عامة" },
    { value: "faq", label: "الأسئلة الشائعة" },
    { value: "coverage", label: "مناطق التغطية" },
  ];
  if (language === 'ar') { pageTabs.reverse(); }

  return (
    <Layout>
      <SEOHead seoData={seoData} language={language} />
      
      {currentService.isEmergency && (
        <div className="container mx-auto px-4 pt-8"><UrgentServiceIndicator onUrgentRequest={handleUrgentRequest} serviceType={language === 'ar' ? currentService.nameAr : currentService.name} isAvailable={true} /></div>
      )}
      
      <div className="container mx-auto px-4 pt-8"><ServiceHero service={currentService} city={currentCity} country={currentCountry} language={language} averageRating={averageRating} reviewCount={cityTestimonials.length} serviceImage={serviceImage}/></div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
          <main className="lg:col-span-2">
            <Tabs defaultValue={language === 'ar' ? 'coverage' : 'overview'} className="w-full">
              {/* FIX: Using programmatic reversal for tabs to ensure correct RTL layout */}
              <TabsList className="flex w-full border-b border-white/20 rounded-none bg-transparent p-0">
                {pageTabs.map(tab => (<TabsTrigger key={tab.value} value={tab.value} className="flex-1 data-[state=active]:border-blue-400">{tab.label}</TabsTrigger>))}
              </TabsList>
              
              {/* FIX: Removed `prose` class from the parent and applied specific styling to children */}
              <TabsContent value="overview" className="mt-6 text-blue-100">
                <div className="prose prose-invert max-w-none">
                  <h2 className="text-white text-start">وصف الخدمة</h2>
                  <p className="whitespace-pre-line leading-relaxed text-start">{(currentService as any).fullDescriptionAr}</p>
                </div>
                <ServiceFeatures />
              </TabsContent>
              <TabsContent value="faq" className="mt-6"><ServiceFAQ serviceId={currentService.slug} /></TabsContent>
              <TabsContent value="coverage" className="mt-6"><ServiceCoverage cityId={currentCity.id} /></TabsContent>
            </Tabs>
          </main>
          <aside className="lg:sticky lg:top-24 space-y-8" id="service-form">
            <AvailabilityStatus serviceId={currentService.id} cityId={currentCity.slug} />
            <ServiceFormSection service={currentService} city={currentCity} country={currentCountry} isUrgent={showUrgentForm} />
          </aside>
        </div>
      </div>
      
      <div className="py-12 bg-blue-900/30"><Testimonials testimonials={cityTestimonials} /></div>
      <div className="py-12"><RelatedServices services={relatedServices} city={currentCity} country={countrySlug || ''} language={language} /></div>
    </Layout>
  );
};

export default ServicePage;
