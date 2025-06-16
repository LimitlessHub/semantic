
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, MessageCircle, MapPin, Star, Clock, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { getCountries, getServices, getCities } from '@/lib/cms';
import { Country, Service, City } from '@/types';

const CityPage = () => {
  const { country, city } = useParams();
  const { language, t } = useLanguage();
  const [currentCountry, setCurrentCountry] = useState<Country | null>(null);
  const [currentCity, setCurrentCity] = useState<City | null>(null);
  const [availableServices, setAvailableServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [countriesData, servicesData, citiesData] = await Promise.all([
          getCountries(),
          getServices(),
          getCities()
        ]);

        const foundCountry = countriesData.find(c => c.slug === country);
        const foundCity = citiesData.find(c => c.slug === city && c.countryId === foundCountry?.id);
        const cityServices = servicesData.filter(s => 
          s.availableCountries.includes(foundCountry?.code || '')
        );

        setCurrentCountry(foundCountry || null);
        setCurrentCity(foundCity || null);
        setAvailableServices(cityServices);
      } catch (error) {
        console.error('Error loading city page data:', error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [country, city]);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-white text-xl">{t('loading')}</div>
        </div>
      </Layout>
    );
  }

  if (!currentCountry || !currentCity) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-white text-xl">{t('cityNotFound')}</div>
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
            <div className="flex items-center justify-center text-blue-300 mb-4">
              <MapPin className="w-5 h-5 mr-2" />
              <span>
                {language === 'ar' ? currentCountry.nameAr : currentCountry.name} → {language === 'ar' ? currentCity.nameAr : currentCity.name}
              </span>
            </div>
            
            <h1 className="text-5xl font-bold text-white mb-6">
              {t('servicesIn')} {language === 'ar' ? currentCity.nameAr : currentCity.name}
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              {t('reliableServicesDescription')} {language === 'ar' ? currentCity.nameAr : currentCity.name}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center space-x-2 text-white bg-green-600/50 px-6 py-3 rounded-lg">
                <Phone className="w-5 h-5" />
                <span className="font-semibold">{currentCity.phoneNumbers[0]}</span>
              </div>
              <div className="flex items-center space-x-2 text-white bg-blue-600/50 px-6 py-3 rounded-lg">
                <MessageCircle className="w-5 h-5" />
                <span>{t('whatsapp')}: {currentCity.whatsappNumbers[0]}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 bg-white/10 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              {t('availableServices')}
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableServices.map((service) => (
                <Card key={service.id} className="bg-white/20 backdrop-blur-sm border-white/30 hover:bg-white/30 transition-all duration-300">
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
                        {service.basePrice} {service.currency}
                      </span>
                      {service.isEmergency && (
                        <div className="flex items-center text-red-300">
                          <Shield className="w-4 h-4 mr-1" />
                          <span className="text-xs">{t('emergency')}</span>
                        </div>
                      )}
                    </div>
                    
                    <Link to={`/${country}/${city}/${service.slug}`}>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">
                        {t('bookNow')}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* City Info Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-semibold text-white mb-4">
                    {t('cityInfo')}
                  </h3>
                  <div className="space-y-3 text-blue-100">
                    <div className="flex justify-between">
                      <span>{t('region')}:</span>
                      <span>{language === 'ar' ? currentCity.regionAr : currentCity.region}</span>
                    </div>
                    {currentCity.population && (
                      <div className="flex justify-between">
                        <span>{t('population')}:</span>
                        <span>{currentCity.population.toLocaleString()}</span>
                      </div>
                    )}
                    {currentCity.isCapital && (
                      <div className="flex justify-between">
                        <span>{t('status')}:</span>
                        <span className="text-yellow-300">{t('capital')}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-semibold text-white mb-4">
                    {t('contactInfo')}
                  </h3>
                  <div className="space-y-3">
                    {currentCity.phoneNumbers.map((phone, index) => (
                      <div key={index} className="flex items-center text-blue-100">
                        <Phone className="w-4 h-4 mr-2" />
                        <span>{phone}</span>
                      </div>
                    ))}
                    {currentCity.whatsappNumbers.map((whatsapp, index) => (
                      <div key={index} className="flex items-center text-blue-100">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        <span>{whatsapp}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default CityPage;
