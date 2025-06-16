import { MapPin } from 'lucide-react';
import { coverageData } from '@/data/mockData';
import { useMemo } from 'react';

interface ServiceCoverageProps {
  cityId: string;
}

export default function ServiceCoverage({ cityId }: ServiceCoverageProps) {
  const cityCoverage = useMemo(() => {
    return coverageData[cityId] || [];
  }, [cityId]);

  if (cityCoverage.length === 0) {
    return <p className="text-blue-200">نغطي جميع أنحاء المدينة. لمزيد من التفاصيل، يرجى التواصل معنا.</p>;
  }

  return (
    <div>
      <h3 className="text-xl font-bold text-white mb-4">الأحياء التي نغطيها:</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {cityCoverage.map(area => (
          <div key={area} className="flex items-center gap-x-2 bg-white/10 p-3 rounded-md">
            <MapPin className="w-4 h-4 text-blue-300 flex-shrink-0" />
            <span className="text-white text-sm font-medium">{area}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
