
interface Testimonial {
  id: string;
  name: string;
  rating: number;
  comment: string;
  serviceId: string;
  city: string;
  date: string;
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'أحمد محمد',
    rating: 5,
    comment: 'خدمة ممتازة وسريعة، الفني وصل في الوقت المحدد وحل المشكلة بكفاءة عالية.',
    serviceId: 'plumbing',
    city: 'riyadh',
    date: '2024-01-15'
  },
  {
    id: '2',
    name: 'فاطمة علي',
    rating: 5,
    comment: 'أنصح بهذه الخدمة، التعامل احترافي والأسعار مناسبة جداً.',
    serviceId: 'electrical',
    city: 'dubai',
    date: '2024-01-10'
  },
  {
    id: '3',
    name: 'محمد سالم',
    rating: 4,
    comment: 'خدمة جيدة ومتوفرة على مدار الساعة، شكراً لكم.',
    serviceId: 'ac-repair',
    city: 'kuwait-city',
    date: '2024-01-05'
  },
  {
    id: '4',
    name: 'نورا أحمد',
    rating: 5,
    comment: 'فريق محترف ومتخصص، تم إصلاح المشكلة في وقت قياسي.',
    serviceId: 'cleaning',
    city: 'cairo',
    date: '2024-01-01'
  }
];

export default testimonials;
