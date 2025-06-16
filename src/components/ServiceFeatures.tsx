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
    <div className="mt-10">
      {/* FIX: Using explicit text-align classes based on language */}
      <h3 className={`text-2xl font-bold text-white mb-6 ${language === 'ar' ? 'text-right' : 'text-left'}`}>{t('service.bestChoice')}</h3>
      <div className="space-y-4">
        {features.map((feature, index) => (
          <div key={index} className={`flex items-start gap-x-3 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
            <span className={`text-gray-200 leading-relaxed ${language === 'ar' ? 'text-right' : 'text-left'}`}>{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
