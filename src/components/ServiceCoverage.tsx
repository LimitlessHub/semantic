import { MapPin } from 'lucide-react';
import { coverageData } from '@/data/mockData'; // سنضيف هذا في mockData
import { useMemo } from 'react';

interface ServiceCoverageProps {
  cityId: string;
}

export default function ServiceCoverage({ cityId }: ServiceCoverageProps) {
  const cityCoverage = useMemo(() => {
    return coverageData[cityId] || [];
  }, [cityId]);

  if (cityCoverage.length === 0) {
    return <p className="text-blue-200">نغطي جميع أنحاء المدينة.</p>;
  }

  return (
    <div>
      <h3 className="text-xl font-bold text-white mb-4">الأحياء التي نغطيها في هذه المدينة:</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {cityCoverage.map(area => (
          <div key={area} className="flex items-center gap-x-2 bg-white/10 p-3 rounded-md">
            <MapPin className="w-4 h-4 text-blue-300" />
            <span className="text-white text-sm">{area}</span>
          </div>
        ))}
      </div>
      {/* يمكن إضافة خريطة تفاعلية هنا مستقبلاً */}
    </div>
  );
}
