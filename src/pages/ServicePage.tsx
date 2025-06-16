import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import Testimonials from '@/components/Testimonials';
import SEOHead from '@/components/SEOHead';
import AvailabilityStatus from '@/components/AvailabilityStatus';
import ServiceBreadcrumb from '@/components/ServiceBreadcrumb';
import ServiceFormSection from '@/components/ServiceFormSection';
import RelatedServices from '@/components/RelatedServices'; // سنقوم بتعديل هذا لاحقًا ليصبح كاروسل
import { useLanguage } from '@/contexts/LanguageContext';
import { getCountries, getServices, getCities } from '@/lib/cms';
import { generateServicePageSEO } from '@/lib/seo';
import { testimonials } from '@/lib/testimonials';
import { Country, Service, City } from '@/types';
import ServiceIcon from '@/components/ServiceIcon';
import { Star } from 'lucide-react';

// استيراد مكونات Tabs
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ServiceFeatures from '@/components/ServiceFeatures';
import ServiceFAQ from '@/components/ServiceFAQ'; // مكون جديد للأسئلة الشائعة
import ServiceCoverage from '@/components/ServiceCoverage'; // مكون جديد لمناطق التغطية

const ServicePage = () => {
  const { country: countrySlug, city: citySlug, service: serviceSlug } = useParams();
  const { language, t } = useLanguage();
  // ... (باقي الـ state hooks كما هي)
  const [currentCountry, setCurrentCountry] = useState<Country | null>(null);
  const [currentService, setCurrentService] = useState<Service | null>(null);
  const [currentCity, setCurrentCity] = useState<City | null>(null);
  const [relatedServices, setRelatedServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      // ... (منطق جلب البيانات يبقى كما هو)
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
          const related = servicesData.filter(s => s.category === foundService.category && s.id !== foundService.id).slice(0, 8); // زيادة العدد للكاروسل
          setRelatedServices(related);
        }
      } catch (error) { console.error('Error loading service page data:', error); } 
      finally { setLoading(false); }
    }
    if (countrySlug && citySlug && serviceSlug) { loadData(); }
  }, [countrySlug, citySlug, serviceSlug]);

  if (loading || !currentService || !currentCity || !currentCountry) {
    return (<Layout><div className="min-h-screen flex items-center justify-center"><div className="text-white text-xl">{t('loading')}</div></div></Layout>);
  }

  const seoData = generateServicePageSEO(currentService, currentCity, currentCountry, language);
  const cityTestimonials = testimonials.filter(t => t.serviceId === currentService.id && (t.city === currentCity.name || t.city === currentCity.slug));
  const averageRating = cityTestimonials.length > 0 ? cityTestimonials.reduce((sum, t) => sum + t.rating, 0) / cityTestimonials.length : 4.8;
  
  // صورة افتراضية للخدمة، يمكن تخصيصها لاحقًا في mockData
  const serviceImage = `/images/services/${currentService.slug}.jpg`; 

  return (
    <Layout>
      <SEOHead seoData={seoData} language={language} />

      {/* --- FIX: Hero Section with Image --- */}
      <section className="relative h-96 flex items-center justify-center text-center text-white px-4">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <img src={serviceImage} alt={currentService.name} className="absolute inset-0 w-full h-full object-cover" />
        <div className="relative z-20">
          <ServiceBreadcrumb country={currentCountry} city={currentCity} language={language} />
          <h1 className="text-4xl md:text-6xl font-bold mt-4">
            {language === 'ar' ? currentService.nameAr : currentService.name} في {language === 'ar' ? currentCity.nameAr : currentCity.name}
          </h1>
          <div className="flex items-center justify-center gap-x-3 mt-4">
            <div className="flex items-center gap-x-1"><Star className="w-5 h-5 text-yellow-400 fill-current" /><span>{averageRating.toFixed(1)}</span></div>
            <span>({cityTestimonials.length} تقييم)</span>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
          
          {/* Main Content Column with Tabs */}
          <main className="lg:col-span-2">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-white/10 text-white">
                <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
                <TabsTrigger value="faq">الأسئلة الشائعة</TabsTrigger>
                <TabsTrigger value="coverage">مناطق التغطية</TabsTrigger>
              </TabsList>
              
              {/* Overview Tab Content */}
              <TabsContent value="overview" className="mt-6">
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white">وصف الخدمة</h2>
                  <p className="text-blue-100 whitespace-pre-line">{language === 'ar' ? currentService.fullDescriptionAr : currentService.fullDescription}</p>
                  <ServiceFeatures />
                </div>
              </TabsContent>
              
              {/* FAQ Tab Content */}
              <TabsContent value="faq" className="mt-6">
                 <ServiceFAQ serviceId={currentService.id} />
              </TabsContent>

              {/* Coverage Tab Content */}
              <TabsContent value="coverage" className="mt-6">
                <ServiceCoverage cityId={currentCity.id} />
              </TabsContent>
            </Tabs>
          </main>

          {/* Sidebar Column */}
          <aside className="lg:sticky lg:top-24 space-y-8">
            <AvailabilityStatus serviceId={currentService.id} cityId={currentCity.slug} />
            <ServiceFormSection service={currentService} city={currentCity} country={currentCountry} isUrgent={false} />
          </aside>
        </div>
      </div>
      
      <div className="py-12">
        <Testimonials testimonials={cityTestimonials} serviceId={currentService.id} cityId={currentCity.slug} />
      </div>

      <div className="py-12">
        <h2 className="text-3xl font-bold text-white text-center mb-8">{t('service.related')}</h2>
        <RelatedServices services={relatedServices} city={currentCity} country={countrySlug || ''} language={language} />
      </div>
    </Layout>
  );
};

export default ServicePage;
