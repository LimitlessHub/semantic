import { Mail, Phone, MapPin, Globe } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Footer() {
  const location = useLocation();
  const currentPath = location.pathname;

  const isCountryPage = currentPath.startsWith('/sa') || currentPath.startsWith('/ae') || 
                       currentPath.startsWith('/kw') || currentPath.startsWith('/eg');

  const getCountryData = () => {
    if (currentPath.startsWith('/sa')) return { country: 'Saudi Arabia', countryAr: 'السعودية', phone: '+966-XXX-XXXX', cities: [{ name: 'Riyadh', nameAr: 'الرياض', path: '/sa/riyadh' }, { name: 'Jeddah', nameAr: 'جدة', path: '/sa/jeddah' }, { name: 'Dammam', nameAr: 'الدمام', path: '/sa/dammam' }] };
    if (currentPath.startsWith('/ae')) return { country: 'UAE', countryAr: 'الإمارات', phone: '+971-XXX-XXXX', cities: [{ name: 'Dubai', nameAr: 'دبي', path: '/ae/dubai' }, { name: 'Abu Dhabi', nameAr: 'أبوظبي', path: '/ae/abu-dhabi' }, { name: 'Sharjah', nameAr: 'الشارقة', path: '/ae/sharjah' }] };
    if (currentPath.startsWith('/kw')) return { country: 'Kuwait', countryAr: 'الكويت', phone: '+965-XXX-XXXX', cities: [{ name: 'Kuwait City', nameAr: 'مدينة الكويت', path: '/kw/kuwait-city' }, { name: 'Hawalli', nameAr: 'حولي', path: '/kw/hawalli' }, { name: 'Salmiya', nameAr: 'السالمية', path: '/kw/salmiya' }] };
    if (currentPath.startsWith('/eg')) return { country: 'Egypt', countryAr: 'مصر', phone: '+20-XXX-XXXX', cities: [{ name: 'Cairo', nameAr: 'القاهرة', path: '/eg/cairo' }, { name: 'Alexandria', nameAr: 'الإسكندرية', path: '/eg/alexandria' }, { name: 'Giza', nameAr: 'الجيزة', path: '/eg/giza' }] };
    return null;
  };

  const countryData = getCountryData();
  const mainFooterGridClasses = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center sm:text-start";
  const copyrightClasses = "border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm";

  // Footer for country-specific pages
  if (isCountryPage && countryData) {
    return (
      <footer className="bg-blue-950/90 border-t border-white/10 mt-auto">
        <div className="container mx-auto px-4 py-12">
          <div className={mainFooterGridClasses}>
            {/* Column 1 */}
            <div>
              <h3 className="text-white text-lg font-bold mb-4">LocalServices {countryData.country}</h3>
              <p className="text-blue-200 text-sm mb-4">Your trusted local service provider in {countryData.country}</p>
              <div className="flex gap-x-4 justify-center sm:justify-start">
                <Globe className="w-5 h-5 text-blue-300" />
                <Mail className="w-5 h-5 text-blue-300" />
                <Phone className="w-5 h-5 text-blue-300" />
              </div>
            </div>
            
            {/* Column 2 */}
            <div>
              <h4 className="text-white font-semibold mb-4">Major Cities</h4>
              <ul className="space-y-2">
                {countryData.cities.map((city) => (
                  <li key={city.path}><Link to={city.path} className="text-blue-200 hover:text-white text-sm transition-colors">{city.name} - {city.nameAr}</Link></li>
                ))}
              </ul>
            </div>
            
            {/* Column 3 */}
            <div>
              <h4 className="text-white font-semibold mb-4">Popular Services</h4>
              <ul className="space-y-2">
                <li><Link to="/services/plumbing" className="text-blue-200 hover:text-white text-sm transition-colors">Plumbing - السباكة</Link></li>
                <li><Link to="/services/electrical" className="text-blue-200 hover:text-white text-sm transition-colors">Electrical - الكهرباء</Link></li>
                <li><Link to="/services/ac-repair" className="text-blue-200 hover:text-white text-sm transition-colors">AC Repair - تكييف</Link></li>
              </ul>
            </div>
            
            {/* Column 4 */}
            <div>
              <h4 className="text-white font-semibold mb-4">Contact {countryData.country}</h4>
              <div className="space-y-3 text-blue-200">
                <div className="flex items-center gap-x-2 justify-center sm:justify-start"><Phone className="w-4 h-4" /> <span className="text-sm">{countryData.phone}</span></div>
                <div className="flex items-center gap-x-2 justify-center sm:justify-start"><Mail className="w-4 h-4" /> <span className="text-sm break-all">{countryData.country.toLowerCase().replace(' ', '')}@localservices.com</span></div>
                <div className="flex items-center gap-x-2 justify-center sm:justify-start"><MapPin className="w-4 h-4" /> <span className="text-sm">{countryData.country}</span></div>
              </div>
            </div>
          </div>
          
          <div className={copyrightClasses}>
            <p className="text-blue-300 mb-4 md:mb-0">© 2024 LocalServices {countryData.country}. All rights reserved.</p>
            <div className="flex gap-x-4"><Link to="/privacy-policy" className="hover:text-white">Privacy</Link><Link to="/terms-conditions" className="hover:text-white">Terms</Link></div>
          </div>
        </div>
      </footer>
    );
  }

  // Main global footer
  return (
    <footer className="bg-blue-950/90 border-t border-white/10 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className={mainFooterGridClasses}>
          {/* Column 1 */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">LocalServices</h3>
            <p className="text-blue-200 text-sm mb-4">Connecting you with trusted local professionals across the Middle East.</p>
            <div className="flex gap-x-4 justify-center sm:justify-start"><Globe className="w-5 h-5 text-blue-300" /><Mail className="w-5 h-5 text-blue-300" /><Phone className="w-5 h-5 text-blue-300" /></div>
          </div>
          
          {/* Column 2 */}
          <div>
            <h4 className="text-white font-semibold mb-4">Countries</h4>
            <ul className="space-y-2">
              <li><Link to="/sa" className="text-blue-200 hover:text-white text-sm transition-colors">Saudi Arabia - السعودية</Link></li>
              <li><Link to="/ae" className="text-blue-200 hover:text-white text-sm transition-colors">United Arab Emirates - الإمارات</Link></li>
              <li><Link to="/kw" className="text-blue-200 hover:text-white text-sm transition-colors">Kuwait - الكويت</Link></li>
              <li><Link to="/eg" className="text-blue-200 hover:text-white text-sm transition-colors">Egypt - مصر</Link></li>
            </ul>
          </div>
          
          {/* Column 3 */}
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><Link to="/services/plumbing" className="text-blue-200 hover:text-white text-sm transition-colors">Plumbing</Link></li>
              <li><Link to="/services/electrical" className="text-blue-200 hover:text-white text-sm transition-colors">Electrical</Link></li>
              <li><Link to="/services/ac-repair" className="text-blue-200 hover:text-white text-sm transition-colors">AC Repair</Link></li>
              <li><Link to="/services/cleaning" className="text-blue-200 hover:text-white text-sm transition-colors">Cleaning</Link></li>
            </ul>
          </div>
          
          {/* Column 4 */}
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <div className="space-y-3 text-blue-200">
              <div className="flex items-center gap-x-2 justify-center sm:justify-start"><Phone className="w-4 h-4" /> <span className="text-sm">24/7 Support Available</span></div>
              <div className="flex items-center gap-x-2 justify-center sm:justify-start"><Mail className="w-4 h-4" /> <span className="text-sm">info@localservices.com</span></div>
              <div className="flex items-center gap-x-2 justify-center sm:justify-start"><MapPin className="w-4 h-4" /> <span className="text-sm">Middle East Region</span></div>
            </div>
          </div>
        </div>
        
        <div className={copyrightClasses}>
            <p className="text-blue-300 mb-4 md:mb-0">© 2024 LocalServices. All rights reserved.</p>
            <div className="flex gap-x-4"><Link to="/about" className="hover:text-white">About</Link><Link to="/contact" className="hover:text-white">Contact</Link><Link to="/privacy-policy" className="hover:text-white">Privacy</Link><Link to="/terms-conditions" className="hover:text-white">Terms</Link></div>
        </div>
      </div>
    </footer>
  );
}
