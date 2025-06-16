
import { Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface Testimonial {
  id: string;
  name: string;
  rating: number;
  comment: string;
  serviceId: string;
  city: string;
  date: string;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
  serviceId: string;
  cityId: string;
}

export default function Testimonials({ testimonials, serviceId, cityId }: TestimonialsProps) {
  const displayTestimonials = testimonials.length > 0 ? testimonials : [
    {
      id: '1',
      name: 'أحمد محمد',
      rating: 5,
      comment: 'خدمة ممتازة وسريعة، الفني وصل في الوقت المحدد وحل المشكلة بكفاءة عالية.',
      serviceId,
      city: cityId,
      date: '2024-01-15'
    },
    {
      id: '2',
      name: 'فاطمة علي',
      rating: 5,
      comment: 'أنصح بهذه الخدمة، التعامل احترافي والأسعار مناسبة جداً.',
      serviceId,
      city: cityId,
      date: '2024-01-10'
    },
    {
      id: '3',
      name: 'محمد سالم',
      rating: 4,
      comment: 'خدمة جيدة ومتوفرة على مدار الساعة، شكراً لكم.',
      serviceId,
      city: cityId,
      date: '2024-01-05'
    }
  ];

  return (
    <section className="py-16 bg-white/5 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-white text-center mb-12">
          آراء العملاء
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayTestimonials.map((testimonial) => (
            <Card key={testimonial.id} className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-400'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-yellow-400 ml-2 font-semibold">
                    {testimonial.rating}/5
                  </span>
                </div>
                
                <p className="text-blue-100 mb-4 text-sm leading-relaxed">
                  {testimonial.comment}
                </p>
                
                <div className="flex justify-between items-center text-sm">
                  <span className="text-white font-semibold">{testimonial.name}</span>
                  <span className="text-blue-300">{testimonial.date}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
