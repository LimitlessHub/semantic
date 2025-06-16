import { CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
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
    // The component is now self-contained and doesn't rely on parent styles
    <div className="mt-8">
      <h3 className="text-2xl font-bold text-white mb-6 text-start">{t('service.bestChoice')}</h3>
      <div className="space-y-4">
        {features.map((feature, index) => (
          // FIX: Programmatically forcing flex-direction based on language for 100% reliability
          <div key={index} className={`flex items-start gap-x-3 text-start ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
            <span className="text-white">{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
