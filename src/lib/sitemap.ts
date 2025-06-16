
import { countries, services, cities } from '@/data/mockData';

export interface SitemapEntry {
  url: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

export function generateSitemap(): SitemapEntry[] {
  const baseUrl = 'https://localservices.com';
  const currentDate = new Date().toISOString().split('T')[0];
  const entries: SitemapEntry[] = [];

  // Homepage
  entries.push({
    url: baseUrl,
    lastmod: currentDate,
    changefreq: 'daily',
    priority: 1.0
  });

  // Static pages
  const staticPages = ['/about', '/contact'];
  staticPages.forEach(page => {
    entries.push({
      url: `${baseUrl}${page}`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.8
    });
  });

  // Country pages
  countries.forEach(country => {
    entries.push({
      url: `${baseUrl}/${country.slug}`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 0.9
    });
  });

  // Service pages for each city in each country
  countries.forEach(country => {
    const countryCities = cities.filter(city => city.countryId === country.id);
    
    countryCities.forEach(city => {
      // City landing page
      entries.push({
        url: `${baseUrl}/${country.slug}/${city.slug}`,
        lastmod: currentDate,
        changefreq: 'weekly',
        priority: 0.8
      });

      // Individual service pages
      services.forEach(service => {
        entries.push({
          url: `${baseUrl}/${country.slug}/${city.slug}/${service.slug}`,
          lastmod: currentDate,
          changefreq: 'weekly',
          priority: 0.7
        });
      });
    });
  });

  return entries.sort((a, b) => b.priority - a.priority);
}

export function generateSitemapXML(): string {
  const entries = generateSitemap();
  
  const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
  const xmlFooter = '</urlset>';
  
  const urlEntries = entries.map(entry => `
  <url>
    <loc>${entry.url}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`).join('');

  return xmlHeader + urlEntries + '\n' + xmlFooter;
}

export function generateRobotsTxt(): string {
  const baseUrl = 'https://localservices.com';
  
  return `User-agent: *
Allow: /

# Sitemaps
Sitemap: ${baseUrl}/sitemap.xml

# Crawl-delay for respectful crawling
Crawl-delay: 1

# Block admin and private areas
Disallow: /admin/
Disallow: /api/
Disallow: /.well-known/`;
}

// Generate service/city statistics for SEO insights
export function generateSEOStats() {
  const totalCountries = countries.length;
  const totalCities = cities.length;
  const totalServices = services.length;
  const totalPages = totalCountries + totalCities + (totalCities * totalServices);
  
  const citiesByCountry = countries.map(country => ({
    country: country.name,
    cityCount: cities.filter(city => city.countryId === country.id).length
  }));

  const servicesByCategory = services.reduce((acc, service) => {
    acc[service.category] = (acc[service.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return {
    totalCountries,
    totalCities,
    totalServices,
    totalPages,
    citiesByCountry,
    servicesByCategory,
    estimatedTrafficPotential: totalPages * 100 // Conservative estimate
  };
}
