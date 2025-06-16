import { useState } from 'react';
import { Menu, Phone, Globe, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';

export default function Header() {
  const { language, toggleLanguage, t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const countries = [
    { name: t('nav.saudi'), path: '/sa' },
    { name: t('nav.uae'), path: '/ae' },
    { name: t('nav.kuwait'), path: '/kw' },
    { name: t('nav.egypt'), path: '/eg' }
  ];

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="bg-blue-900/95 backdrop-blur-sm border-b border-white/10 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="text-white text-2xl font-bold">
            <Link to="/" className="hover:text-blue-200 transition-colors">
              LocalServices
            </Link>
          </div>
          
          <nav className="hidden lg:flex items-center space-x-6">
            <Link to="/" className="text-blue-100 hover:text-white transition-colors">{t('nav.home')}</Link>
            
            <div className="relative group">
              <button className="text-blue-100 hover:text-white transition-colors flex items-center">
                {t('nav.countries')}
                <ChevronDown className="w-4 h-4 ml-1 transition-transform group-hover:rotate-180" />
              </button>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="py-1">
                  {countries.map((country) => (
                    <Link key={country.path} to={country.path} className="block px-4 py-2 text-gray-800 hover:bg-blue-50">
                      {country.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link to="/services" className="text-blue-100 hover:text-white transition-colors">{t('nav.services')}</Link>
            <Link to="/about" className="text-blue-100 hover:text-white transition-colors">{t('nav.about')}</Link>
            <Link to="/contact" className="text-blue-100 hover:text-white transition-colors">{t('nav.contact')}</Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={toggleLanguage} className="text-white hover:bg-white/10">
              <Globe className="w-4 h-4 mr-2" />
              {t('language.toggle')}
            </Button>
            
            <div className="hidden sm:flex items-center space-x-2 text-white">
              <Phone className="w-4 h-4" />
              <span className="text-sm">{t('hero.support')}</span>
            </div>
            
            <button className="lg:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-white/20">
            <nav className="flex flex-col space-y-4 mt-4">
              <Link to="/" className="text-blue-100 hover:text-white" onClick={closeMenu}>{t('nav.home')}</Link>
              <Link to="/services" className="text-blue-100 hover:text-white" onClick={closeMenu}>{t('nav.services')}</Link>
              <Link to="/about" className="text-blue-100 hover:text-white" onClick={closeMenu}>{t('nav.about')}</Link>
              <Link to="/contact" className="text-blue-100 hover:text-white" onClick={closeMenu}>{t('nav.contact')}</Link>
              <div className="border-t border-white/10 pt-4">
                <h3 className="text-white font-semibold mb-2">{t('nav.countries')}</h3>
                {countries.map((country) => (
                   <Link key={country.path} to={country.path} className="block text-blue-200 hover:text-white py-1" onClick={closeMenu}>
                     {country.name}
                   </Link>
                ))}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
