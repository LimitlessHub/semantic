import { Country, Service, City } from '@/types';

export const countries: Country[] = [
  { id: '1', name: 'Saudi Arabia', nameAr: 'المملكة العربية السعودية', code: 'SA', slug: 'sa', phonePrefix: '+966', emergencyNumber: '911', currency: 'SAR', currencyAr: 'ريال سعودي', isActive: true },
  { id: '2', name: 'United Arab Emirates', nameAr: 'دولة الإمارات العربية المتحدة', code: 'AE', slug: 'ae', phonePrefix: '+971', emergencyNumber: '999', currency: 'AED', currencyAr: 'درهم إماراتي', isActive: true },
  { id: '3', name: 'Kuwait', nameAr: 'دولة الكويت', code: 'KW', slug: 'kw', phonePrefix: '+965', emergencyNumber: '112', currency: 'KWD', currencyAr: 'دينار كويتي', isActive: true },
  { id: '4', name: 'Egypt', nameAr: 'جمهورية مصر العربية', code: 'EG', slug: 'eg', phonePrefix: '+20', emergencyNumber: '122', currency: 'EGP', currencyAr: 'جنيه مصري', isActive: true }
];

export const cities: City[] = [
  { id: 'sa-1', name: 'Riyadh', nameAr: 'الرياض', slug: 'riyadh', countryId: '1', region: 'Riyadh Province', regionAr: 'منطقة الرياض', phoneNumbers: ['+966-11-123-4567'], whatsappNumbers: ['+966-50-123-4567'], coordinates: { lat: 24.7136, lng: 46.6753 }, population: 7676654, isCapital: true },
  { id: 'ae-1', name: 'Dubai', nameAr: 'دبي', slug: 'dubai', countryId: '2', region: 'Dubai Emirate', regionAr: 'إمارة دبي', phoneNumbers: ['+971-4-123-4567'], whatsappNumbers: ['+971-50-123-4567'], coordinates: { lat: 25.2048, lng: 55.2708 }, population: 3137000 },
  { id: 'ae-2', name: 'Abu Dhabi', nameAr: 'أبوظبي', slug: 'abu-dhabi', countryId: '2', region: 'Abu Dhabi Emirate', regionAr: 'إمارة أبوظبي', phoneNumbers: ['+971-2-123-4567'], whatsappNumbers: ['+971-56-123-4567'], coordinates: { lat: 24.4539, lng: 54.3773 }, population: 1483000, isCapital: true },
];

export const services: Service[] = [
  {
    id: 'emergency-plumbing', slug: 'emergency-plumbing', name: 'Emergency Plumbing', nameAr: 'سباكة طارئة', category: 'Plumbing', categoryAr: 'السباكة',
    description: '24/7 emergency plumbing for leaks, clogs, and bursts.',
    descriptionAr: 'خدمات سباكة طارئة 24/7 للتسريبات والانسدادات.',
    fullDescription: `We offer 24/7 emergency plumbing services. Our certified technicians handle leaks, clogs, water heater issues, and burst pipes. We use modern equipment to ensure a lasting fix.`,
    fullDescriptionAr: `نقدم خدمات السباكة الطارئة على مدار الساعة. فريقنا جاهز للتعامل مع التسريبات، الانسدادات، مشاكل السخانات، وانفجار المواسير. نستخدم أحدث المعدات لضمان حل المشكلة بشكل فوري ودائم.`,
    icon: 'wrench', basePrice: 150, currency: 'SAR', estimatedDuration: '1-2 hours', estimatedDurationAr: '1-2 ساعة', rating: 4.8, reviewCount: 1250, isPopular: true, isEmergency: true, isActive: true,
    keywords: ['leak', 'clog', 'burst pipe', 'تسريب', 'انسداد'], availableCountries: ['SA', 'AE', 'KW', 'EG']
  },
  {
    id: 'emergency-electrical', slug: 'emergency-electrical', name: 'Emergency Electrical', nameAr: 'كهرباء طارئة', category: 'Electrical', categoryAr: 'الكهرباء',
    description: 'Urgent electrical services for power outages and hazards.',
    descriptionAr: 'خدمات كهرباء عاجلة لانقطاع التيار والمخاطر الكهربائية.',
    fullDescription: 'Our emergency electricians are available 24/7 to handle power outages, short circuits, and other electrical hazards. We prioritize safety and rapid response.',
    fullDescriptionAr: 'كهربائيو الطوارئ لدينا متاحون على مدار الساعة للتعامل مع انقطاع التيار، الشورت الكهربائي، والمخاطر الأخرى. أولويتنا هي السلامة والاستجابة السريعة.',
    icon: 'zap', basePrice: 180, currency: 'SAR', estimatedDuration: '1-3 hours', estimatedDurationAr: '1-3 ساعة', rating: 4.9, reviewCount: 1450, isPopular: true, isEmergency: true, isActive: true,
    keywords: ['power outage', 'short circuit', 'انقطاع التيار', 'شورت'], availableCountries: ['SA', 'AE', 'KW', 'EG']
  },
];

export const faqData = [
  { serviceId: 'emergency-plumbing', question: 'ما هي تكلفة الخدمة الطارئة؟', answer: 'تعتمد التكلفة على طبيعة المشكلة والوقت. نقدم كشفًا مبدئيًا وتحديدًا للتكلفة قبل البدء بالعمل.' },
  { serviceId: 'emergency-plumbing', question: 'هل تقدمون ضمانًا على الإصلاح؟', answer: 'نعم، جميع خدماتنا تأتي مع ضمان لمدة 30 يومًا على الأقل على العمل المنجز.' },
  { serviceId: 'emergency-electrical', question: 'هل يمكنكم التعامل مع انقطاع التيار الكهربائي الكامل؟', answer: 'نعم، فنيونا مؤهلون لتحديد سبب انقطاع التيار وإصلاحه بأمان تام.' },
];

type CoverageData = {
  [cityId: string]: string[];
};

export const coverageData: CoverageData = {
  'sa-1': ['الملز', 'العليا', 'النسيم', 'السليمانية', 'الروضة', 'الشفاء'], // Riyadh
  'ae-1': ['ديرة', 'بر دبي', 'جميرا', 'المرابع العربية', 'دبي مارينا', 'البرشاء'], // Dubai
  'ae-2': ['جزيرة الريم', 'الخالدية', 'شارع المطار', 'المشرف', 'مدينة محمد بن زايد'], // Abu Dhabi
};
