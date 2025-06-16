
import { useState } from 'react';
import { Menu, Phone, Globe, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';

export default function Header() {
  const { language, toggleLanguage } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isCountriesOpen, setIsCountriesOpen] = useState(false);

  const countries = [
    { name: 'Saudi Arabia', nameAr: 'السعودية', path: '/sa' },
    { name: 'UAE', nameAr: 'الإمارات', path: '/ae' },
    { name: 'Kuwait', nameAr: 'الكويت', path: '/kw' },
    { name: 'Egypt', nameAr: 'مصر', path: '/eg' }
  ];

  const services = [
    { name: 'Plumbing', nameAr: 'السباكة', path: '/services/plumbing' },
    { name: 'Electrical', nameAr: 'الكهرباء', path: '/services/electrical' },
    { name: 'AC Repair', nameAr: 'تكييف', path: '/services/ac-repair' },
    { name: 'Cleaning', nameAr: 'تنظيف', path: '/services/cleaning' }
  ];

  return (
    <header className="bg-blue-900/95 backdrop-blur-sm border-b border-white/10 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="text-white text-2xl font-bold">
            <Link to="/" className="hover:text-blue-200 transition-colors">
              LocalServices
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8">
            <Link to="/" className="text-blue-100 hover:text-white transition-colors">
              {language === 'ar' ? 'الرئيسية' : 'Home'}
            </Link>
            
            {/* Countries Dropdown */}
            <div className="relative group">
              <button
                className="text-blue-100 hover:text-white transition-colors flex items-center"
                onClick={() => setIsCountriesOpen(!isCountriesOpen)}
              >
                {language === 'ar' ? 'الدول' : 'Countries'}
                <ChevronDown className="w-4 h-4 ml-1" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                {countries.map((country) => (
                  <Link
                    key={country.path}
                    to={country.path}
                    className="block px-4 py-2 text-gray-800 hover:bg-blue-50 first:rounded-t-lg last:rounded-b-lg"
                  >
                    {language === 'ar' ? country.nameAr : country.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Services Dropdown */}
            <div className="relative group">
              <button
                className="text-blue-100 hover:text-white transition-colors flex items-center"
                onClick={() => setIsServicesOpen(!isServicesOpen)}
              >
                {language === 'ar' ? 'الخدمات' : 'Services'}
                <ChevronDown className="w-4 h-4 ml-1" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                {services.map((service) => (
                  <Link
                    key={service.path}
                    to={service.path}
                    className="block px-4 py-2 text-gray-800 hover:bg-blue-50 first:rounded-t-lg last:rounded-b-lg"
                  >
                    {language === 'ar' ? service.nameAr : service.name}
                  </Link>
                ))}
              </div>
            </div>
            
            <Link to="/about" className="text-blue-100 hover:text-white transition-colors">
              {language === 'ar' ? 'من نحن' : 'About'}
            </Link>
            <Link to="/contact" className="text-blue-100 hover:text-white transition-colors">
              {language === 'ar' ? 'اتصل بنا' : 'Contact'}
            </Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="text-white hover:bg-white/10"
            >
              <Globe className="w-4 h-4 mr-2" />
              {language === 'ar' ? 'EN' : 'عربي'}
            </Button>
            
            <div className="hidden sm:flex items-center space-x-2 text-white">
              <Phone className="w-4 h-4" />
              <span className="text-sm">24/7 Support</span>
            </div>
            
            <button 
              className="lg:hidden text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-white/20">
            <nav className="flex flex-col space-y-4 mt-4">
              <Link 
                to="/" 
                className="text-blue-100 hover:text-white transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {language === 'ar' ? 'الرئيسية' : 'Home'}
              </Link>
              
              <div>
                <button
                  className="text-blue-100 hover:text-white transition-colors flex items-center w-full"
                  onClick={() => setIsCountriesOpen(!isCountriesOpen)}
                >
                  {language === 'ar' ? 'الدول' : 'Countries'}
                  <ChevronDown className="w-4 h-4 ml-1" />
                </button>
                {isCountriesOpen && (
                  <div className="ml-4 mt-2 space-y-2">
                    {countries.map((country) => (
                      <Link
                        key={country.path}
                        to={country.path}
                        className="block text-blue-200 hover:text-white transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {language === 'ar' ? country.nameAr : country.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <button
                  className="text-blue-100 hover:text-white transition-colors flex items-center w-full"
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                >
                  {language === 'ar' ? 'الخدمات' : 'Services'}
                  <ChevronDown className="w-4 h-4 ml-1" />
                </button>
                {isServicesOpen && (
                  <div className="ml-4 mt-2 space-y-2">
                    {services.map((service) => (
                      <Link
                        key={service.path}
                        to={service.path}
                        className="block text-blue-200 hover:text-white transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {language === 'ar' ? service.nameAr : service.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              
              <Link 
                to="/about" 
                className="text-blue-100 hover:text-white transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {language === 'ar' ? 'من نحن' : 'About'}
              </Link>
              <Link 
                to="/contact" 
                className="text-blue-100 hover:text-white transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {language === 'ar' ? 'اتصل بنا' : 'Contact'}
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
