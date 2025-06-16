import { CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
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
    <Card className="bg-white/10 backdrop-blur-sm border-white/20 mt-8">
      <CardContent className="p-6 sm:p-8">
        <h3 className="text-2xl font-bold text-white mb-6">{t('service.bestChoice')}</h3>
        <div className="space-y-4">
          {/* FIX: Added `text-start` to ensure text aligns to the right in RTL mode */}
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-x-3 text-start">
              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
