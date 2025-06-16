
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Star, Clock, Shield, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useEffect, useState } from 'react';
import { getServices, getCountries } from '@/lib/cms';
import { Service, Country } from '@/types';

const ServicesListPage = () => {
  const { language, t } = useLanguage();
  const [services, setServices] = useState<Service[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [servicesData, countriesData] = await Promise.all([
          getServices(),
          getCountries()
        ]);
        setServices(servicesData);
        setCountries(countriesData);
        setFilteredServices(servicesData);
      } catch (error) {
        console.error('Error loading services:', error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  useEffect(() => {
    let filtered = services;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(service =>
        service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.nameAr.includes(searchTerm) ||
        service.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.categoryAr.includes(searchTerm)
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(service => service.category === selectedCategory);
    }

    // Filter by country
    if (selectedCountry !== 'all') {
      filtered = filtered.filter(service => 
        service.availableCountries.includes(selectedCountry)
      );
    }

    setFilteredServices(filtered);
  }, [searchTerm, selectedCategory, selectedCountry, services]);

  const categories = Array.from(new Set(services.map(s => s.category)));

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-white text-xl">{t('loading')}</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-5xl font-bold text-white mb-6">
              {t('allServices')}
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              {t('browseAllServices')}
            </p>
          </div>
        </section>

        {/* Filters Section */}
        <section className="py-8 bg-white/10 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder={t('searchServices')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/20 border-white/30 text-white placeholder-blue-200"
                />
              </div>

              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 bg-white/20 border border-white/30 rounded-md text-white"
              >
                <option value="all">{t('allCategories')}</option>
                {categories.map((category) => (
                  <option key={category} value={category} className="text-black">
                    {category}
                  </option>
                ))}
              </select>

              {/* Country Filter */}
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="px-3 py-2 bg-white/20 border border-white/30 rounded-md text-white"
              >
                <option value="all">{t('allCountries')}</option>
                {countries.map((country) => (
                  <option key={country.code} value={country.code} className="text-black">
                    {language === 'ar' ? country.nameAr : country.name}
                  </option>
                ))}
              </select>

              {/* Results Count */}
              <div className="flex items-center text-white">
                <span>{filteredServices.length} {t('services')}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((service) => (
                <Card key={service.id} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <span className="text-3xl mr-3">
                        {service.icon === 'wrench' && '🔧'}
                        {service.icon === 'zap' && '⚡'}
                        {service.icon === 'snowflake' && '❄️'}
                        {service.icon === 'sparkles' && '✨'}
                        {service.icon === 'paintbrush' && '🎨'}
                        {service.icon === 'hammer' && '🔨'}
                      </span>
                      <div>
                        <h3 className="text-xl font-semibold text-white">
                          {language === 'ar' ? service.nameAr : service.name}
                        </h3>
                        <p className="text-blue-200 text-sm">
                          {language === 'ar' ? service.categoryAr : service.category}
                        </p>
                      </div>
                    </div>
                    
                    <p className="text-blue-100 mb-4 text-sm">
                      {language === 'ar' ? service.descriptionAr : service.description}
                    </p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center text-yellow-300">
                        <Star className="w-4 h-4 mr-1 fill-current" />
                        <span className="text-sm">{service.rating}</span>
                      </div>
                      <div className="flex items-center text-green-300">
                        <Clock className="w-4 h-4 mr-1" />
                        <span className="text-sm">
                          {language === 'ar' ? service.estimatedDurationAr : service.estimatedDuration}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-white font-semibold">
                        {t('startingFrom')} {service.basePrice} {service.currency}
                      </span>
                      {service.isEmergency && (
                        <div className="flex items-center text-red-300">
                          <Shield className="w-4 h-4 mr-1" />
                          <span className="text-xs">{t('emergency')}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-blue-200 text-xs">
                        {t('availableIn')}: {service.availableCountries.join(', ')}
                      </p>
                    </div>
                    
                    <Link to={`/services/${service.slug}`}>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">
                        {t('viewDetails')}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {filteredServices.length === 0 && (
              <div className="text-center py-12">
                <p className="text-white text-xl">{t('noServicesFound')}</p>
                <p className="text-blue-200 mt-2">{t('tryDifferentSearch')}</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default ServicesListPage;
