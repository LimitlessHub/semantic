
import React, { createContext, useContext, useState, useEffect } from 'react';

interface LanguageContextType {
  language: 'ar' | 'en';
  direction: 'rtl' | 'ltr';
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.about': 'عنا',
    'nav.contact': 'اتصل بنا',
    'nav.privacy': 'سياسة الخصوصية',
    'nav.terms': 'الشروط والأحكام',
    'nav.faq': 'الأسئلة الشائعة',
    'nav.howItWorks': 'كيف يعمل',
    'nav.countries': 'الدول',
    'nav.services': 'الخدمات',
    
    // About Page
    'about.title': 'عن شركتنا',
    'about.description': 'نحن منصة رائدة في ربط العملاء بمقدمي الخدمات المحليين المتخصصين في المملكة العربية السعودية والإمارات والكويت ومصر',
    'about.mission': 'مهمتنا',
    'about.missionText': 'نسعى لتوفير خدمات موثوقة وسريعة لعملائنا',
    
    // Contact Page
    'contact.title': 'اتصل بنا',
    'contact.description': 'تواصل معنا للحصول على أفضل الخدمات المحلية',
    'contact.phone': 'الهاتف',
    'contact.whatsapp': 'واتساب',
    'contact.available': 'متاح 24/7',
    
    // Services
    'servicesIn': 'الخدمات في',
    'availableServices': 'الخدمات المتاحة',
    'allServices': 'جميع الخدمات',
    'browseAllServices': 'تصفح جميع خدماتنا المتاحة في المنطقة',
    'searchServices': 'البحث في الخدمات...',
    'allCategories': 'جميع الفئات',
    'allCountries': 'جميع الدول',
    'services': 'خدمة',
    'startingFrom': 'تبدأ من',
    'availableIn': 'متاح في',
    'viewDetails': 'عرض التفاصيل',
    'bookNow': 'احجز الآن',
    'noServicesFound': 'لا توجد خدمات',
    'tryDifferentSearch': 'حاول البحث بكلمات مختلفة',
    'reliableServicesDescription': 'خدمات موثوقة ومتاحة على مدار الساعة في',
    
    // City Information
    'cityInfo': 'معلومات المدينة',
    'contactInfo': 'معلومات التواصل',
    'region': 'المنطقة',
    'population': 'عدد السكان',
    'status': 'الحالة',
    'capital': 'العاصمة',
    'cityNotFound': 'المدينة غير موجودة',
    
    // Service Details
    'emergency': 'طوارئ',
    'verified': 'موثق',
    
    // Testimonials
    'testimonials.title': 'آراء عملائنا',
    'testimonials.reviews': 'تقييم',
    'testimonials.verified': 'موثق',
    
    // Common
    'button.contact': 'اتصل الآن',
    'button.whatsapp': 'واتساب',
    'footer.rights': 'جميع الحقوق محفوظة',
    'loading': 'جاري التحميل...',
    'whatsapp': 'واتساب'
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About Us',
    'nav.contact': 'Contact Us',
    'nav.privacy': 'Privacy Policy',
    'nav.terms': 'Terms & Conditions',
    'nav.faq': 'FAQ',
    'nav.howItWorks': 'How It Works',
    'nav.countries': 'Countries',
    'nav.services': 'Services',
    
    // About Page
    'about.title': 'About Our Company',
    'about.description': 'We are a leading platform connecting customers with specialized local service providers in Saudi Arabia, UAE, Kuwait, and Egypt',
    'about.mission': 'Our Mission',
    'about.missionText': 'We strive to provide reliable and fast services to our customers',
    
    // Contact Page
    'contact.title': 'Contact Us',
    'contact.description': 'Get in touch with us for the best local services',
    'contact.phone': 'Phone',
    'contact.whatsapp': 'WhatsApp',
    'contact.available': 'Available 24/7',
    
    // Services
    'servicesIn': 'Services in',
    'availableServices': 'Available Services',
    'allServices': 'All Services',
    'browseAllServices': 'Browse all our available services in the region',
    'searchServices': 'Search services...',
    'allCategories': 'All Categories',
    'allCountries': 'All Countries',
    'services': 'services',
    'startingFrom': 'Starting from',
    'availableIn': 'Available in',
    'viewDetails': 'View Details',
    'bookNow': 'Book Now',
    'noServicesFound': 'No services found',
    'tryDifferentSearch': 'Try searching with different keywords',
    'reliableServicesDescription': 'Reliable services available 24/7 in',
    
    // City Information
    'cityInfo': 'City Information',
    'contactInfo': 'Contact Information',
    'region': 'Region',
    'population': 'Population',
    'status': 'Status',
    'capital': 'Capital',
    'cityNotFound': 'City not found',
    
    // Service Details
    'emergency': 'Emergency',
    'verified': 'Verified',
    
    // Testimonials
    'testimonials.title': 'Customer Reviews',
    'testimonials.reviews': 'reviews',
    'testimonials.verified': 'Verified',
    
    // Common
    'button.contact': 'Call Now',
    'button.whatsapp': 'WhatsApp',
    'footer.rights': 'All rights reserved',
    'loading': 'Loading...',
    'whatsapp': 'WhatsApp'
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

  const t = (key: string): string => {
    return translations[language][key] || key;
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
