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

  // FIX: Using inline style for text-align to guarantee RTL works
  const textAlignStyle = { textAlign: language === 'ar' ? 'right' : 'left' } as const;

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-bold text-white mb-6" style={textAlignStyle}>{t('service.bestChoice')}</h3>
      <div className="space-y-4">
        {features.map((feature, index) => (
          <div key={index} className={`flex items-start gap-x-3 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
            <span className="text-white leading-relaxed" style={textAlignStyle}>{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
