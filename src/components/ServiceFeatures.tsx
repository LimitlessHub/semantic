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
    <div className="mt-8">
      {/* FIX: Applying text-start directly to the heading and the list container */}
      <h3 className="text-2xl font-bold text-white mb-6 text-start">{t('service.bestChoice')}</h3>
      <div className="space-y-4 text-start">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start gap-x-3">
            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
            <span className="text-white leading-relaxed">{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
