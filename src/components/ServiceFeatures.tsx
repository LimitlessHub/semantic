import { CheckCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ServiceFeatures() {
  const { t, language } = useLanguage();

  const features = [
    t('service.features.certified'),
    t('service.features.fast'),
    t('service.features.warranty'),
    t('service.features.pricing'),
  ];

  return (
    // FIX: Wrapping the entire component with a div that has the `dir` attribute to force RTL/LTR.
    <div dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="mt-10">
        <h3 className="text-2xl font-bold text-white mb-6 text-start">{t('service.bestChoice')}</h3>
        <div className="space-y-4">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-x-3">
              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
              <span className="text-gray-200">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
