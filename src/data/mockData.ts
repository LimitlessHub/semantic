import { Country, Service, City } from '@/types';

// Add new properties to the Service interface in src/types/index.ts first
// export interface Service {
//   ...
//   fullDescription: string;
//   fullDescriptionAr: string;
// }

export const countries: Country[] = [
  { id: '1', name: 'Saudi Arabia', nameAr: 'المملكة العربية السعودية', code: 'SA', slug: 'sa', phonePrefix: '+966', emergencyNumber: '911', currency: 'SAR', currencyAr: 'ريال سعودي', isActive: true },
  { id: '2', name: 'United Arab Emirates', nameAr: 'دولة الإمارات العربية المتحدة', code: 'AE', slug: 'ae', phonePrefix: '+971', emergencyNumber: '999', currency: 'AED', currencyAr: 'درهم إماراتي', isActive: true },
  { id: '3', name: 'Kuwait', nameAr: 'دولة الكويت', code: 'KW', slug: 'kw', phonePrefix: '+965', emergencyNumber: '112', currency: 'KWD', currencyAr: 'دينار كويتي', isActive: true },
  { id: '4', name: 'Egypt', nameAr: 'جمهورية مصر العربية', code: 'EG', slug: 'eg', phonePrefix: '+20', emergencyNumber: '122', currency: 'EGP', currencyAr: 'جنيه مصري', isActive: true }
];

export const cities: City[] = [
  // ... (Cities data remains the same as the last update)
    // Saudi Arabia Cities
  { id: 'sa-1', name: 'Riyadh', nameAr: 'الرياض', slug: 'riyadh', countryId: '1', region: 'Riyadh Province', regionAr: 'منطقة الرياض', phoneNumbers: ['+966-11-123-4567'], whatsappNumbers: ['+966-50-123-4567'], coordinates: { lat: 24.7136, lng: 46.6753 }, population: 7676654, isCapital: true },
  { id: 'sa-2', name: 'Jeddah', nameAr: 'جدة', slug: 'jeddah', countryId: '1', region: 'Makkah Province', regionAr: 'منطقة مكة المكرمة', phoneNumbers: ['+966-12-123-4567'], whatsappNumbers: ['+966-55-123-4567'], coordinates: { lat: 21.4858, lng: 39.1925 }, population: 3976432 },
  { id: 'sa-3', name: 'Dammam', nameAr: 'الدمام', slug: 'dammam', countryId: '1', region: 'Eastern Province', regionAr: 'المنطقة الشرقية', phoneNumbers: ['+966-13-123-4567'], whatsappNumbers: ['+966-53-123-4567'], coordinates: { lat: 26.4207, lng: 50.0888 }, population: 1252523 },

  // UAE Cities
  { id: 'ae-1', name: 'Dubai', nameAr: 'دبي', slug: 'dubai', countryId: '2', region: 'Dubai Emirate', regionAr: 'إمارة دبي', phoneNumbers: ['+971-4-123-4567'], whatsappNumbers: ['+971-50-123-4567'], coordinates: { lat: 25.2048, lng: 55.2708 }, population: 3137000 },
  { id: 'ae-2', name: 'Abu Dhabi', nameAr: 'أبوظبي', slug: 'abu-dhabi', countryId: '2', region: 'Abu Dhabi Emirate', regionAr: 'إمارة أبوظبي', phoneNumbers: ['+971-2-123-4567'], whatsappNumbers: ['+971-56-123-4567'], coordinates: { lat: 24.4539, lng: 54.3773 }, population: 1483000, isCapital: true },
  { id: 'ae-3', name: 'Sharjah', nameAr: 'الشارقة', slug: 'sharjah', countryId: '2', region: 'Sharjah Emirate', regionAr: 'إمارة الشارقة', phoneNumbers: ['+971-6-123-4567'], whatsappNumbers: ['+971-55-123-4567'], coordinates: { lat: 25.3463, lng: 55.4209 }, population: 1274749 },

  // Kuwait Cities
  { id: 'kw-1', name: 'Kuwait City', nameAr: 'مدينة الكويت', slug: 'kuwait-city', countryId: '3', region: 'Capital Governorate', regionAr: 'محافظة العاصمة', phoneNumbers: ['+965-22-123-456'], whatsappNumbers: ['+965-99-123-456'], coordinates: { lat: 29.3759, lng: 47.9774 }, population: 637411, isCapital: true },
  { id: 'kw-2', name: 'Hawalli', nameAr: 'حولي', slug: 'hawalli', countryId: '3', region: 'Hawalli Governorate', regionAr: 'محافظة حولي', phoneNumbers: ['+965-22-234-567'], whatsappNumbers: ['+965-66-234-567'], coordinates: { lat: 29.332, lng: 48.0286 }, population: 960779 },
  
  // Egypt Cities
  { id: 'eg-1', name: 'Cairo', nameAr: 'القاهرة', slug: 'cairo', countryId: '4', region: 'Cairo Governorate', regionAr: 'محافظة القاهرة', phoneNumbers: ['+20-2-2123-4567'], whatsappNumbers: ['+20-10-1234-5678'], coordinates: { lat: 30.0444, lng: 31.2357 }, population: 9845000, isCapital: true },
  { id: 'eg-2', name: 'Alexandria', nameAr: 'الإسكندرية', slug: 'alexandria', countryId: '4', region: 'Alexandria Governorate', regionAr: 'محافظة الإسكندرية', phoneNumbers: ['+20-3-123-4567'], whatsappNumbers: ['+20-12-1234-5678'], coordinates: { lat: 31.2001, lng: 29.9187 }, population: 5200000 },
];

// --- Updated Services Array with Full Descriptions ---
export const services: any[] = [
  {
    id: 'emergency-plumbing', slug: 'emergency-plumbing', name: 'Emergency Plumbing', nameAr: 'سباكة طارئة', category: 'Plumbing', categoryAr: 'السباكة',
    description: '24/7 emergency plumbing services for leaks, clogs, and bursts.',
    descriptionAr: 'خدمات سباكة طارئة 24/7 للتسريبات، الانسدادات، وانفجار المواسير.',
    fullDescription: `We offer 24/7 emergency plumbing services. Our certified technicians are ready to handle the toughest problems, including leak detection, drain cleaning, water heater repairs, and burst pipe emergencies. We use the latest equipment to ensure the problem is fixed right the first time.`,
    fullDescriptionAr: `نقدم خدمات السباكة الطارئة على مدار الساعة. فريقنا من الفنيين المعتمدين جاهز للتعامل مع أصعب المشاكل، بما في ذلك كشف التسريبات، تسليك المجاري، إصلاح السخانات، وحالات انفجار المواسير. نستخدم أحدث المعدات لضمان حل المشكلة بشكل فوري ودائم.`,
    icon: 'wrench', basePrice: 150, currency: 'SAR', estimatedDuration: '1-2 hours', estimatedDurationAr: '1-2 ساعة', rating: 4.8, reviewCount: 1250, isPopular: true, isEmergency: true, isActive: true,
    keywords: ['leak', 'clog', 'burst pipe', 'تسريب', 'انسداد'], availableCountries: ['SA', 'AE', 'KW', 'EG']
  },
  {
    id: 'emergency-electrical', slug: 'emergency-electrical', name: 'Emergency Electrical', nameAr: 'كهرباء طارئة', category: 'Electrical', categoryAr: 'الكهرباء',
    description: 'Urgent electrical services for power outages and hazards.',
    descriptionAr: 'خدمات كهرباء عاجلة لانقطاع التيار والمخاطر الكهربائية.',
    fullDescription: 'Our emergency electricians are available 24/7 to handle power outages, short circuits, faulty wiring, and other electrical hazards. We prioritize safety and rapid response to restore power and secure your property.',
    fullDescriptionAr: 'كهربائيو الطوارئ لدينا متاحون على مدار الساعة للتعامل مع انقطاع التيار، الشورت الكهربائي، الأسلاك التالفة، والمخاطر الأخرى. أولويتنا هي السلامة والاستجابة السريعة لإعادة الكهرباء وتأمين منزلك.',
    icon: 'zap', basePrice: 180, currency: 'SAR', estimatedDuration: '1-3 hours', estimatedDurationAr: '1-3 ساعة', rating: 4.9, reviewCount: 1450, isPopular: true, isEmergency: true, isActive: true,
    keywords: ['power outage', 'short circuit', 'انقطاع التيار', 'شورت'], availableCountries: ['SA', 'AE', 'KW', 'EG']
  },
  // Add more services here with full descriptions...
];

// --- New Data for FAQ and Coverage ---

export const faqData = [
  { serviceId: 'emergency-plumbing', question: 'ما هي تكلفة الخدمة الطارئة؟', answer: 'تعتمد التكلفة على طبيعة المشكلة والوقت. نقدم كشفًا مبدئيًا وتحديدًا للتكلفة قبل البدء بالعمل.' },
  { serviceId: 'emergency-plumbing', question: 'هل تقدمون ضمانًا على الإصلاح؟', answer: 'نعم، جميع خدماتنا تأتي مع ضمان لمدة 30 يومًا على الأقل على العمل المنجز.' },
  { serviceId: 'emergency-electrical', question: 'هل يمكنكم التعامل مع انقطاع التيار الكهربائي الكامل؟', answer: 'نعم، فنيونا مؤهلون لتحديد سبب انقطاع التيار وإصلاحه بأمان تام.' },
  { serviceId: 'ac-repair', question: 'كم مرة يجب أن أفحص فريون التكييف؟', answer: 'يُنصح بفحص مستوى الفريون مرة واحدة سنوياً قبل بداية فصل الصيف لضمان أفضل أداء تبريد.' },
];

type CoverageData = {
  [cityId: string]: string[];
};

export const coverageData: CoverageData = {
  'sa-1': ['الملز', 'العليا', 'النسيم', 'السليمانية', 'الروضة', 'الشفاء'], // Riyadh
  'ae-1': ['ديرة', 'بر دبي', 'جميرا', 'المرابع العربية', 'دبي مارينا', 'البرشاء'], // Dubai
  'ae-2': ['جزيرة الريم', 'الخالدية', 'شارع المطار', 'المشرف', 'مدينة محمد بن زايد'], // Abu Dhabi
  'kw-1': ['شرق', 'الدسمة', 'بنيد القار', 'كيفان', 'الشويخ'], // Kuwait City
  'eg-1': ['الزمالك', 'مصر الجديدة', 'مدينة نصر', 'المعادي', 'التجمع الخامس'], // Cairo
};
