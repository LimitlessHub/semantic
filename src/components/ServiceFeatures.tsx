
import { CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function ServiceFeatures() {
  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardContent className="p-8">
        <h3 className="text-2xl font-bold text-white mb-6">لماذا نحن الأفضل؟</h3>
        <div className="space-y-4">
          <div className="flex items-center text-white">
            <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
            <span>فنيون معتمدون ومؤهلون</span>
          </div>
          <div className="flex items-center text-white">
            <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
            <span>خدمة سريعة في نفس اليوم</span>
          </div>
          <div className="flex items-center text-white">
            <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
            <span>ضمان على جميع الأعمال</span>
          </div>
          <div className="flex items-center text-white">
            <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
            <span>أسعار تنافسية وشفافة</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
