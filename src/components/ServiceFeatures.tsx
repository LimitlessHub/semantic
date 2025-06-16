import { CheckCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ServiceFeatures() {
  const { t } = useLanguage();
  const features = [
    t('service.features.certified'),
    t('service.features.fast'),
    t('service.features.warranty'),
    t('service.features.pricing'),
  ];

  return (
    <div className="mt-10 text-start">
      <h3 className="text-2xl font-bold text-white mb-6">{t('service.bestChoice')}</h3>
      <div className="space-y-4">
        {features.map((feature, index) => (
          // The `gap-x-3` will be automatically handled by the new plugin for RTL
          <div key={index} className="flex items-start gap-x-3">
            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
            <span className="text-gray-200 leading-relaxed">{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
