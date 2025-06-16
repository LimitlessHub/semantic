import { CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ServiceFeatures() {
  const { t } = useLanguage();

  // It's better to fetch these from a translation file, but for now this works.
  const features = [
    "فنيون معتمدون ومؤهلون",
    "خدمة سريعة في نفس اليوم",
    "ضمان على جميع الأعمال",
    "أسعار تنافسية وشفافة",
  ];

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20 mt-8">
      <CardContent className="p-6 sm:p-8">
        <h3 className="text-2xl font-bold text-white mb-6">{t('service.bestChoice')}</h3>
        <div className="space-y-4">
          {/* FIX: Using gap-x-3 for consistent icon-text spacing in all languages. */}
          {features.map((feature, index) => (
            <div key={index} className="flex items-start text-white gap-x-3">
              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
