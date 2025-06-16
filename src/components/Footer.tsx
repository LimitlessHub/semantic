
import { Mail, Phone, MapPin, Globe } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Footer() {
  const location = useLocation();
  const currentPath = location.pathname;

  // تحديد Footer حسب الصفحة الحالية
  const isCountryPage = currentPath.startsWith('/sa') || currentPath.startsWith('/ae') || 
                       currentPath.startsWith('/kw') || currentPath.startsWith('/eg');

  const getCountryData = () => {
    if (currentPath.startsWith('/sa')) {
      return {
        country: 'Saudi Arabia',
        countryAr: 'السعودية',
        phone: '+966-XXX-XXXX',
        cities: [
          { name: 'Riyadh', nameAr: 'الرياض', path: '/sa/riyadh' },
          { name: 'Jeddah', nameAr: 'جدة', path: '/sa/jeddah' },
          { name: 'Dammam', nameAr: 'الدمام', path: '/sa/dammam' }
        ]
      };
    } else if (currentPath.startsWith('/ae')) {
      return {
        country: 'UAE',
        countryAr: 'الإمارات',
        phone: '+971-XXX-XXXX',
        cities: [
          { name: 'Dubai', nameAr: 'دبي', path: '/ae/dubai' },
          { name: 'Abu Dhabi', nameAr: 'أبوظبي', path: '/ae/abu-dhabi' },
          { name: 'Sharjah', nameAr: 'الشارقة', path: '/ae/sharjah' }
        ]
      };
    } else if (currentPath.startsWith('/kw')) {
      return {
        country: 'Kuwait',
        countryAr: 'الكويت',
        phone: '+965-XXX-XXXX',
        cities: [
          { name: 'Kuwait City', nameAr: 'مدينة الكويت', path: '/kw/kuwait-city' },
          { name: 'Hawalli', nameAr: 'حولي', path: '/kw/hawalli' },
          { name: 'Salmiya', nameAr: 'السالمية', path: '/kw/salmiya' }
        ]
      };
    } else if (currentPath.startsWith('/eg')) {
      return {
        country: 'Egypt',
        countryAr: 'مصر',
        phone: '+20-XXX-XXXX',
        cities: [
          { name: 'Cairo', nameAr: 'القاهرة', path: '/eg/cairo' },
          { name: 'Alexandria', nameAr: 'الإسكندرية', path: '/eg/alexandria' },
          { name: 'Giza', nameAr: 'الجيزة', path: '/eg/giza' }
        ]
      };
    }
    return null;
  };

  const countryData = getCountryData();

  if (isCountryPage && countryData) {
    // Footer خاص بالدول
    return (
      <footer className="bg-blue-950/90 border-t border-white/10 mt-auto">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white text-xl font-bold mb-4">
                LocalServices {countryData.country}
              </h3>
              <p className="text-blue-200 mb-4">
                Your trusted local service provider in {countryData.country}
              </p>
              <div className="flex space-x-4">
                <Globe className="w-5 h-5 text-blue-300" />
                <Mail className="w-5 h-5 text-blue-300" />
                <Phone className="w-5 h-5 text-blue-300" />
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Major Cities</h4>
              <ul className="space-y-2">
                {countryData.cities.map((city) => (
                  <li key={city.path}>
                    <Link to={city.path} className="text-blue-200 hover:text-white transition-colors">
                      {city.name} - {city.nameAr}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Popular Services</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/services/plumbing" className="text-blue-200 hover:text-white transition-colors">
                    Plumbing - السباكة
                  </Link>
                </li>
                <li>
                  <Link to="/services/electrical" className="text-blue-200 hover:text-white transition-colors">
                    Electrical - الكهرباء
                  </Link>
                </li>
                <li>
                  <Link to="/services/ac-repair" className="text-blue-200 hover:text-white transition-colors">
                    AC Repair - تكييف
                  </Link>
                </li>
                <li>
                  <Link to="/services/cleaning" className="text-blue-200 hover:text-white transition-colors">
                    Cleaning - تنظيف
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Contact {countryData.country}</h4>
              <div className="space-y-2 text-blue-200">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  <span>{countryData.phone}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  <span>{countryData.country.toLowerCase().replace(' ', '')}@localservices.com</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{countryData.country}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-blue-300 mb-4 md:mb-0">
              © 2024 LocalServices {countryData.country}. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <Link to="/" className="text-blue-300 hover:text-white transition-colors">
                Home
              </Link>
              <Link to="/privacy-policy" className="text-blue-300 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms-conditions" className="text-blue-300 hover:text-white transition-colors">
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  // Footer الرئيسي للصفحة الرئيسية
  return (
    <footer className="bg-blue-950/90 border-t border-white/10 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white text-xl font-bold mb-4">LocalServices</h3>
            <p className="text-blue-200 mb-4">
              Connecting you with trusted local professionals across the Middle East.
            </p>
            <div className="flex space-x-4">
              <Globe className="w-5 h-5 text-blue-300" />
              <Mail className="w-5 h-5 text-blue-300" />
              <Phone className="w-5 h-5 text-blue-300" />
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Countries</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/sa" className="text-blue-200 hover:text-white transition-colors">
                  Saudi Arabia - السعودية
                </Link>
              </li>
              <li>
                <Link to="/ae" className="text-blue-200 hover:text-white transition-colors">
                  United Arab Emirates - الإمارات
                </Link>
              </li>
              <li>
                <Link to="/kw" className="text-blue-200 hover:text-white transition-colors">
                  Kuwait - الكويت
                </Link>
              </li>
              <li>
                <Link to="/eg" className="text-blue-200 hover:text-white transition-colors">
                  Egypt - مصر
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/services/plumbing" className="text-blue-200 hover:text-white transition-colors">
                  Plumbing - السباكة
                </Link>
              </li>
              <li>
                <Link to="/services/electrical" className="text-blue-200 hover:text-white transition-colors">
                  Electrical - الكهرباء
                </Link>
              </li>
              <li>
                <Link to="/services/ac-repair" className="text-blue-200 hover:text-white transition-colors">
                  AC Repair - تكييف
                </Link>
              </li>
              <li>
                <Link to="/services/cleaning" className="text-blue-200 hover:text-white transition-colors">
                  Cleaning - تنظيف
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <div className="space-y-2 text-blue-200">
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                <span>24/7 Support Available</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                <span>info@localservices.com</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                <span>Middle East Region</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-blue-300 mb-4 md:mb-0">
            © 2024 LocalServices. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <Link to="/about" className="text-blue-300 hover:text-white transition-colors">
              About Us
            </Link>
            <Link to="/contact" className="text-blue-300 hover:text-white transition-colors">
              Contact
            </Link>
            <Link to="/privacy-policy" className="text-blue-300 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-conditions" className="text-blue-300 hover:text-white transition-colors">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
