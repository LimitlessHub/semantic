
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, Zap, CheckCircle } from 'lucide-react';

interface AvailabilityStatusProps {
  serviceId: string;
  cityId: string;
}

interface AvailabilityData {
  status: 'available' | 'busy' | 'limited';
  responseTime: string;
  techniciansAvailable: number;
  nextSlot: string;
  emergencyAvailable: boolean;
}

export default function AvailabilityStatus({ serviceId, cityId }: AvailabilityStatusProps) {
  const [availability, setAvailability] = useState<AvailabilityData>({
    status: 'available',
    responseTime: '30 minutes',
    techniciansAvailable: 3,
    nextSlot: 'Today 2:00 PM',
    emergencyAvailable: true,
  });

  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      // Simulate dynamic availability based on time and random factors
      const hour = new Date().getHours();
      const isBusinessHours = hour >= 8 && hour <= 20;
      const randomFactor = Math.random();

      let newStatus: AvailabilityData['status'] = 'available';
      let technicians = 3;
      let responseTime = '30 minutes';

      if (!isBusinessHours) {
        newStatus = 'limited';
        technicians = 1;
        responseTime = '1 hour';
      } else if (randomFactor < 0.2) {
        newStatus = 'busy';
        technicians = 1;
        responseTime = '2-3 hours';
      } else if (randomFactor < 0.4) {
        newStatus = 'limited';
        technicians = 2;
        responseTime = '1 hour';
      }

      setAvailability({
        status: newStatus,
        responseTime,
        techniciansAvailable: technicians,
        nextSlot: getNextAvailableSlot(),
        emergencyAvailable: technicians > 0,
      });

      setLastUpdated(new Date());
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [serviceId, cityId]);

  const getNextAvailableSlot = () => {
    const now = new Date();
    const slots = ['Today 2:00 PM', 'Today 4:00 PM', 'Tomorrow 9:00 AM', 'Tomorrow 11:00 AM'];
    return slots[Math.floor(Math.random() * slots.length)];
  };

  const statusConfig = {
    available: {
      color: 'bg-green-500',
      badge: 'success',
      text: 'Available Now',
      icon: CheckCircle,
    },
    limited: {
      color: 'bg-yellow-500',
      badge: 'warning',
      text: 'Limited Availability',
      icon: Clock,
    },
    busy: {
      color: 'bg-red-500',
      badge: 'destructive',
      text: 'Busy - Queue Available',
      icon: Users,
    },
  };

  const config = statusConfig[availability.status];
  const IconComponent = config.icon;

  return (
    <Card className="bg-white/95 backdrop-blur-sm border-2 border-gray-200">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`w-3 h-3 rounded-full ${config.color} animate-pulse`}></div>
            <h3 className="text-lg font-semibold">Real-Time Availability</h3>
          </div>
          <Badge variant={config.badge as any} className="flex items-center space-x-1">
            <IconComponent className="w-3 h-3" />
            <span>{config.text}</span>
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <Clock className="w-6 h-6 mx-auto mb-2 text-blue-600" />
            <div className="text-sm text-gray-600">Response Time</div>
            <div className="font-semibold text-blue-700">{availability.responseTime}</div>
          </div>

          <div className="text-center p-3 bg-green-50 rounded-lg">
            <Users className="w-6 h-6 mx-auto mb-2 text-green-600" />
            <div className="text-sm text-gray-600">Technicians</div>
            <div className="font-semibold text-green-700">{availability.techniciansAvailable} Available</div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Next Available Slot:</span>
            <span className="font-medium">{availability.nextSlot}</span>
          </div>

          {availability.emergencyAvailable && (
            <div className="flex items-center space-x-2 p-2 bg-red-50 rounded-lg">
              <Zap className="w-4 h-4 text-red-600" />
              <span className="text-sm text-red-700 font-medium">Emergency service available 24/7</span>
            </div>
          )}

          <div className="text-xs text-gray-500 mt-3">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
