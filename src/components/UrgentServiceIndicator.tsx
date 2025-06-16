
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Phone, Clock, Flame } from 'lucide-react';

interface UrgentServiceIndicatorProps {
  onUrgentRequest: () => void;
  serviceType: string;
  isAvailable: boolean;
}

export default function UrgentServiceIndicator({ 
  onUrgentRequest, 
  serviceType, 
  isAvailable 
}: UrgentServiceIndicatorProps) {
  const [isBlinking, setIsBlinking] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsBlinking(prev => !prev);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!isAvailable) {
    return null;
  }

  return (
    <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white border-0 shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-center space-x-4">
          <div className={`transition-opacity duration-500 ${isBlinking ? 'opacity-100' : 'opacity-50'}`}>
            <AlertTriangle className="w-8 h-8 text-yellow-300" />
          </div>
          
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-2 flex items-center space-x-2">
              <Flame className="w-5 h-5" />
              <span>Emergency {serviceType} Service</span>
            </h3>
            <p className="text-red-100 text-sm mb-3">
              Need immediate assistance? Our emergency technicians are standing by 24/7
            </p>
            
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>15-30 min response</span>
              </div>
              <div className="flex items-center space-x-1">
                <Phone className="w-4 h-4" />
                <span>Direct hotline</span>
              </div>
            </div>
          </div>
          
          <Button 
            onClick={onUrgentRequest}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-6 py-3 shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            <AlertTriangle className="w-5 h-5 mr-2" />
            URGENT REQUEST
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
