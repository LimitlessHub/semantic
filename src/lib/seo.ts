
import { Country, Service, City } from '@/types';

export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  canonical: string;
  schemaMarkup: object;
}

export function generateServicePageSEO(
  service: Service,
  city: City,
  country: Country,
  language: 'en' | 'ar' = 'en'
): SEOData {
  const serviceName = language === 'ar' ? service.nameAr : service.name;
  const cityName = language === 'ar' ? city.nameAr : city.name;
  const countryName = language === 'ar' ? country.nameAr : country.name;

  const title = language === 'ar' 
    ? `${serviceName} في ${cityName} | خدمة احترافية 24/7 | ${countryName}`
    : `${serviceName} in ${cityName} | Professional 24/7 Service | ${countryName}`;

  const description = language === 'ar'
    ? `احصل على أفضل خدمة ${serviceName} في ${cityName}, ${countryName}. فنيون معتمدون متاحون 24/7. اتصل الآن للحصول على خدمة سريعة وموثوقة.`
    : `Get the best ${serviceName} service in ${cityName}, ${countryName}. Certified professionals available 24/7. Call now for fast and reliable service.`;

  const keywords = [
    serviceName,
    cityName,
    countryName,
    ...service.keywords,
    language === 'ar' ? 'خدمة سريعة' : 'fast service',
    language === 'ar' ? 'فنيون معتمدون' : 'certified professionals',
    '24/7'
  ];

  const canonical = `/${country.slug}/${city.slug}/${service.slug}`;

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `${serviceName} in ${cityName}`,
    "description": language === 'ar' ? service.descriptionAr : service.description,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": cityName,
      "addressRegion": cityName,
      "addressCountry": countryName
    },
    "telephone": city.phoneNumbers[0],
    "priceRange": "$$",
    "openingHours": "Mo-Su 00:00-23:59",
    "areaServed": {
      "@type": "City",
      "name": cityName
    },
    "serviceType": serviceName,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "150",
      "bestRating": "5",
      "worstRating": "1"
    },
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "priceCurrency": getCurrencyByCountry(country.code)
    }
  };

  return {
    title,
    description,
    keywords,
    canonical,
    schemaMarkup
  };
}

export function generateHomepageSEO(language: 'en' | 'ar' = 'en'): SEOData {
  const title = language === 'ar' 
    ? 'خدمات محلية في الشرق الأوسط | السعودية، الإمارات، الكويت، مصر'
    : 'Local Services in Middle East | Saudi Arabia, UAE, Kuwait, Egypt';

  const description = language === 'ar'
    ? 'اعثر على أفضل الخدمات المحلية في السعودية والإمارات والكويت ومصر. فنيون معتمدون متاحون 24/7 لجميع احتياجاتك المنزلية والتجارية.'
    : 'Find the best local services in Saudi Arabia, UAE, Kuwait, and Egypt. Certified professionals available 24/7 for all your home and business needs.';

  const keywords = [
    language === 'ar' ? 'خدمات محلية' : 'local services',
    language === 'ar' ? 'السعودية' : 'Saudi Arabia',
    language === 'ar' ? 'الإمارات' : 'UAE',
    language === 'ar' ? 'الكويت' : 'Kuwait',
    language === 'ar' ? 'مصر' : 'Egypt',
    language === 'ar' ? 'فنيون' : 'technicians',
    '24/7'
  ];

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "LocalServices",
    "description": description,
    "url": "https://localservices.com",
    "areaServed": [
      { "@type": "Country", "name": "Saudi Arabia" },
      { "@type": "Country", "name": "United Arab Emirates" },
      { "@type": "Country", "name": "Kuwait" },
      { "@type": "Country", "name": "Egypt" }
    ],
    "serviceType": [
      "Home Services",
      "Business Services",
      "Emergency Services"
    ]
  };

  return {
    title,
    description,
    keywords,
    canonical: '/',
    schemaMarkup
  };
}

function getCurrencyByCountry(countryCode: string): string {
  const currencies: Record<string, string> = {
    'SA': 'SAR',
    'AE': 'AED',
    'KW': 'KWD',
    'EG': 'EGP'
  };
  return currencies[countryCode] || 'USD';
}
