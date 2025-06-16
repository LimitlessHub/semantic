
import { MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Country } from '@/types';
import { Link } from 'react-router-dom';

interface CountriesSectionProps {
  countries: Country[];
}

function CountryFlag({ countryCode }: { countryCode: string }) {
  const flagComponents = {
    'SA': (
      <svg className="w-12 h-8 rounded" viewBox="0 0 24 16" fill="none">
        <rect width="24" height="16" fill="#006C35"/>
        <rect x="0" y="0" width="24" height="16" fill="#006C35"/>
        <text x="12" y="10" textAnchor="middle" fill="white" fontSize="6" fontWeight="bold">السعودية</text>
      </svg>
    ),
    'AE': (
      <svg className="w-12 h-8 rounded" viewBox="0 0 24 16" fill="none">
        <rect width="24" height="16" fill="#FF0000"/>
        <rect x="6" y="0" width="18" height="5.33" fill="#00FF00"/>
        <rect x="6" y="5.33" width="18" height="5.34" fill="white"/>
        <rect x="6" y="10.67" width="18" height="5.33" fill="#000000"/>
      </svg>
    ),
    'KW': (
      <svg className="w-12 h-8 rounded" viewBox="0 0 24 16" fill="none">
        <rect width="24" height="16" fill="#007A3D"/>
        <rect x="0" y="0" width="24" height="5.33" fill="#007A3D"/>
        <rect x="0" y="5.33" width="24" height="5.34" fill="white"/>
        <rect x="0" y="10.67" width="24" height="5.33" fill="#CE1126"/>
        <polygon points="0,0 6,8 0,16" fill="#000000"/>
      </svg>
    ),
    'EG': (
      <svg className="w-12 h-8 rounded" viewBox="0 0 24 16" fill="none">
        <rect width="24" height="16" fill="#000000"/>
        <rect x="0" y="0" width="24" height="5.33" fill="#CE1126"/>
        <rect x="0" y="5.33" width="24" height="5.34" fill="white"/>
        <rect x="0" y="10.67" width="24" height="5.33" fill="#000000"/>
        <circle cx="12" cy="8" r="2" fill="#FFD700"/>
      </svg>
    )
  };

  return flagComponents[countryCode as keyof typeof flagComponents] || (
    <div className="w-12 h-8 bg-gray-300 rounded flex items-center justify-center">
      <span className="text-xs">?</span>
    </div>
  );
}

export default function CountriesSection({ countries }: CountriesSectionProps) {
  const countryRoutes = {
    'SA': '/sa',
    'AE': '/ae', 
    'KW': '/kw',
    'EG': '/eg'
  };

  return (
    <section id="countries" className="py-16 bg-white/10 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-white text-center mb-12">
          Available in 4 Countries
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {countries.map((country) => (
            <Link 
              key={country.id} 
              to={countryRoutes[country.code as keyof typeof countryRoutes] || '#'}
              className="block"
            >
              <Card className="bg-white/20 backdrop-blur-sm border-white/30 hover:bg-white/30 transition-all duration-300 transform hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <CountryFlag countryCode={country.code} />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{country.name}</h3>
                  <div className="flex items-center justify-center text-blue-200">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{country.phonePrefix}</span>
                  </div>
                  <div className="mt-2 text-blue-100 text-sm">
                    Click to explore services
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
