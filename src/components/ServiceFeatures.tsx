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
      <h3 className={`text-2xl font-bold text-white mb-6 ${language === 'ar' ? 'text-right' : 'text-left'}`}>{t('service.bestChoice')}</h3>
      <div className="space-y-4">
        {features.map((feature, index) => (
          // FIX: Using two different JSX structures to guarantee correct order and alignment.
          <div key={index}>
            {language === 'ar' ? (
              <div className="flex items-start gap-x-3 text-right">
                <span className="flex-1 text-gray-200 leading-relaxed">{feature}</span>
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
              </div>
            ) : (
              <div className="flex items-start gap-x-3 text-left">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                <span className="text-gray-200 leading-relaxed">{feature}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
