import React, { createContext, useContext, useState, useEffect } from 'react';

interface LanguageContextType {
  language: 'ar' | 'en';
  direction: 'rtl' | 'ltr';
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// قاموس الترجمة الكامل
const translations = {
  ar: {
    'nav.home': 'الرئيسية',
    'nav.about': 'من نحن',
    'nav.contact': 'اتصل بنا',
    'nav.services': 'الخدمات',
    'nav.countries': 'الدول',
    'nav.saudi': 'السعودية',
    'nav.uae': 'الإمارات',
    'nav.kuwait': 'الكويت',
    'nav.egypt': 'مصر',
    'nav.privacy': 'سياسة الخصوصية',
    'nav.terms': 'الشروط والأحكام',
    'hero.title': 'ابحث عن خدمات محلية',
    'hero.subtitle': 'في جميع أنحاء الشرق الأوسط',
    'hero.description': 'تواصل مع محترفين معتمدين في السعودية، الإمارات، الكويت، ومصر. احصل على عروض أسعار فورية وخدمة موثوقة لمنزلك وعملك.',
    'hero.call': 'اتصل الآن: +966-XXX-XXXX',
    'hero.support': 'دعم 24/7',
    'about.title': 'عن LocalServices',
    'about.mission': 'مهمتنا',
    'contact.title': 'اتصل بنا',
    'services.title': 'جميع الخدمات',
    'services.description': 'تصفح جميع خدماتنا المتاحة في المنطقة.',
    'terms.title': 'الشروط والأحكام',
    'privacy.title': 'سياسة الخصوصية',
    'notFound.title': 'الصفحة غير موجودة',
    'notFound.description': 'الصفحة التي تبحث عنها غير موجودة أو تم نقلها.',
    'button.viewServices': 'عرض الخدمات',
    'button.viewDetails': 'عرض التفاصيل',
    'button.bookNow': 'احجز الآن',
    'button.goBack': 'العودة',
    'button.goHome': 'الرئيسية',
    'button.contact': 'اتصل الآن',
    'language.toggle': 'EN',
    'city.servicesIn': 'الخدمات في',
    'city.reliableServices': 'خدمات موثوقة ومتاحة على مدار الساعة في',
    'city.availableServices': 'الخدمات المتاحة',
    'city.info': 'معلومات المدينة',
    'city.contact': 'معلومات التواصل',
    'city.region': 'المنطقة',
    'city.population': 'عدد السكان',
    'city.status': 'الحالة',
    'city.capital': 'العاصمة',
    'city.notFound': 'المدينة غير موجودة',
    'service.notFound': 'الخدمة غير متوفرة',
    'service.notAvailable': 'قد لا تكون الخدمة المطلوبة متوفرة في هذه المدينة، أو أن الرابط غير صحيح.',
    'service.checkURL': 'يرجى التحقق من الرابط أو الانتقال من صفحتنا الرئيسية.',
    'service.bestChoice': 'لماذا نحن الأفضل؟',
    'service.related': 'خدمات ذات صلة في',
    'service.features.certified': 'فنيون معتمدون ومؤهلون',
    'service.features.fast': 'خدمة سريعة في نفس اليوم',
    'service.features.warranty': 'ضمان على جميع الأعمال',
    'service.features.pricing': 'أسعار تنافسية وشفافة',
    'loading': 'جاري التحميل...',
    'whatsapp': 'واتساب',
    'emergency': 'طوارئ',
    'verified': 'موثق',
  },
  en: {
    'nav.home': 'Home',
    'nav.about': 'About Us',
    'nav.contact': 'Contact Us',
    'nav.services': 'Services',
    'nav.countries': 'Countries',
    'nav.saudi': 'Saudi Arabia',
    'nav.uae': 'UAE',
    'nav.kuwait': 'Kuwait',
    'nav.egypt': 'Egypt',
    'nav.privacy': 'Privacy Policy',
    'nav.terms': 'Terms & Conditions',
    'hero.title': 'Find Local Services',
    'hero.subtitle': 'Across the Middle East',
    'hero.description': 'Connect with verified local professionals in Saudi Arabia, UAE, Kuwait, and Egypt. Get instant quotes and reliable service for your home and business needs.',
    'hero.call': 'Call Now: +966-XXX-XXXX',
    'hero.support': '24/7 Support',
    'about.title': 'About LocalServices',
    'about.mission': 'Our Mission',
    'contact.title': 'Contact Us',
    'services.title': 'All Services',
    'services.description': 'Browse all our available services in the region.',
    'terms.title': 'Terms & Conditions',
    'privacy.title': 'Privacy Policy',
    'notFound.title': 'Page Not Found',
    'notFound.description': "The page you're looking for doesn't exist or has been moved.",
    'button.viewServices': 'View Services',
    'button.viewDetails': 'View Details',
    'button.bookNow': 'Book Now',
    'button.goBack': 'Go Back',
    'button.goHome': 'Go Home',
    'button.contact': 'Call Now',
    'language.toggle': 'عربي',
    'city.servicesIn': 'Services in',
    'city.reliableServices': 'Reliable services available 24/7 in',
    'city.availableServices': 'Available Services',
    'city.info': 'City Information',
    'city.contact': 'Contact Information',
    'city.region': 'Region',
    'city.population': 'Population',
    'city.status': 'Status',
    'city.capital': 'Capital',
    'city.notFound': 'City not found',
    'service.notFound': 'Service Not Available',
    'service.notAvailable': 'The requested service may not be available in this city, or the URL is incorrect.',
    'service.checkURL': 'Please check the URL or navigate from our homepage.',
    'service.bestChoice': 'Why Choose Us?',
    'service.related': 'Related Services in',
    'service.features.certified': 'Certified & Qualified Technicians',
    'service.features.fast': 'Fast, Same-Day Service',
    'service.features.warranty': 'Warranty on All Work',
    'service.features.pricing': 'Competitive & Transparent Pricing',
    'loading': 'Loading...',
    'whatsapp': 'WhatsApp',
    'emergency': 'Emergency',
    'verified': 'Verified',
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'ar' | 'en'>('ar');
  const direction = language === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.setAttribute('dir', direction);
    document.documentElement.setAttribute('lang', language);
  }, [language, direction]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'ar' ? 'en' : 'ar');
  };

  // --- FIX: This is the corrected, simplified translation function. ---
  // It performs a direct lookup without splitting the key.
  const t = (key: string): string => {
    return (translations[language] as any)[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, direction, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
