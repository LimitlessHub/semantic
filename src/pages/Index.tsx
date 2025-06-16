
import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import LandingPage from '@/components/LandingPage';
import SEOHead from '@/components/SEOHead';
import { getCountries, getServices } from '@/lib/cms';
import { generateHomepageSEO } from '@/lib/seo';
import { Country, Service } from '@/types';
import { useLanguage } from '@/contexts/LanguageContext';

const Index = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const { language } = useLanguage();

  const seoData = generateHomepageSEO(language);

  useEffect(() => {
    async function loadData() {
      try {
        console.log('Loading countries and services...');
        const [countriesData, servicesData] = await Promise.all([
          getCountries(),
          getServices()
        ]);
        
        console.log('Countries loaded:', countriesData.length);
        console.log('Services loaded:', servicesData.length);
        
        setCountries(countriesData.filter(c => c.isActive));
        setServices(servicesData.filter(s => s.isActive).slice(0, 6));
      } catch (error) {
        console.error('Error loading data:', error);
        setCountries([]);
        setServices([]);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return (
      <Layout>
        <SEOHead seoData={seoData} language={language} />
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
          <div className="text-white text-xl">Loading...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEOHead seoData={seoData} language={language} />
      <LandingPage countries={countries} popularServices={services} />
    </Layout>
  );
};

export default Index;
