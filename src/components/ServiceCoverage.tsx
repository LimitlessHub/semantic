import { MapPin } from 'lucide-react';
import { coverageData } from '@/data/mockData';
import { useLanguage } from '@/contexts/LanguageContext';
import { useMemo } from 'react';

interface ServiceCoverageProps {
  cityId: string;
}

export default function ServiceCoverage({ cityId }: ServiceCoverageProps) {
  const { language } = useLanguage();
  const cityCoverage = useMemo(() => coverageData[cityId] || [], [cityId]);

  // FIX: Using inline style for text-align to guarantee RTL works
  const textAlignStyle = { textAlign: language === 'ar' ? 'right' : 'left' } as const;

  if (cityCoverage.length === 0) {
    return <p className="text-blue-200" style={textAlignStyle}>نغطي جميع أنحاء المدينة. لمزيد من التفاصيل، يرجى التواصل معنا.</p>;
  }

  return (
    <div style={textAlignStyle}>
      <h3 className="text-xl font-bold text-white mb-4">الأحياء التي نغطيها:</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {cityCoverage.map(area => (
          <div key={area} className={`flex items-center gap-x-2 bg-white/10 p-3 rounded-md ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
            <MapPin className="w-4 h-4 text-blue-300 flex-shrink-0" />
            <span className="text-white text-sm font-medium">{area}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
