import { useParams } from 'react-router-dom';
import { useEffect, useState, useMemo } from 'react'; // Import useMemo
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
          const related = servicesData.filter(s => s.category === foundService.category && s.slug !== foundService.slug);
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

  // --- FIX: Generating a stable random high review count ---
  const reviewCount = useMemo(() => {
    if (!currentService) return 0;
    // Simple seeded random number generator for consistency per page
    const seed = currentService.name.length;
    return 150 + Math.floor(((seed * 9301 + 49297) % 233280) / 233280 * 350);
  }, [currentService]);


  if (loading || !currentService || !currentCity || !currentCountry) {
    return (<Layout><div className="min-h-screen flex items-center justify-center"><div className="text-white text-xl">{t('loading')}</div></div></Layout>);
  }

  const seoData = generateServicePageSEO(currentService, currentCity, currentCountry, language);
  const averageRating = 4.8; // You can also randomize this slightly if you wish
  const serviceImage = `/images/services/${currentService.slug}.jpg`;

  const pageTabs = [
    { value: "overview", label: "نظرة عامة" }, { value: "faq", label: "الأسئلة الشائعة" }, { value: "coverage", label: "مناطق التغطية" },
  ];
  if (language === 'ar') { pageTabs.reverse(); }

  return (
    <Layout>
      <SEOHead seoData={seoData} language={language} />
      
      {currentService.isEmergency && ( <div className="container mx-auto px-4 pt-8"><UrgentServiceIndicator onUrgentRequest={handleUrgentRequest} serviceType={language === 'ar' ? currentService.nameAr : currentService.name} isAvailable={true} /></div> )}
      
      <div className="container mx-auto px-4 pt-8">
        <ServiceHero service={currentService} city={currentCity} country={currentCountry} language={language} averageRating={averageRating} reviewCount={reviewCount} serviceImage={serviceImage}/>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
          <main className="lg:col-span-2">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="flex w-full border-b border-white/20 rounded-none bg-transparent p-0 rtl:flex-row-reverse">
                {pageTabs.map(tab => (<TabsTrigger key={tab.value} value={tab.value} className="flex-1 data-[state=active]:border-blue-400">{tab.label}</TabsTrigger>))}
              </TabsList>
              <div className="mt-6 text-start">
                <TabsContent value="overview"><h2 className="text-2xl font-bold text-white mb-4">وصف الخدمة</h2><p className="text-blue-100 whitespace-pre-line leading-relaxed">{(currentService as any).fullDescriptionAr}</p><ServiceFeatures /></TabsContent>
                <TabsContent value="faq"><ServiceFAQ serviceId={currentService.slug} /></TabsContent>
                <TabsContent value="coverage"><ServiceCoverage cityId={currentCity.id} /></TabsContent>
              </div>
            </Tabs>
          </main>
          <aside className="lg:sticky lg:top-24 space-y-8" id="service-form">
            <AvailabilityStatus serviceId={currentService.id} cityId={currentCity.slug} />
            <ServiceFormSection service={currentService} city={currentCity} country={currentCountry} isUrgent={showUrgentForm} />
          </aside>
        </div>
      </div>
      
      {/* Testimonials and Related Services sections can remain here */}
      
    </Layout>
  );
};

export default ServicePage;
