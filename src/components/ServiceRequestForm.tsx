import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Phone, MessageCircle, Clock, AlertTriangle, User, Mail, MapPin, Loader2 } from 'lucide-react';
import { Service, City, Country } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

const formSchema = z.object({
  name: z.string().min(2, 'الاسم يجب أن يكون حرفين على الأقل'),
  phone: z.string().min(8, 'الرجاء إدخال رقم هاتف صحيح'),
  email: z.string().email('الرجاء إدخال بريد إلكتروني صحيح').optional().or(z.literal('')),
  address: z.string().min(5, 'العنوان يجب أن يكون 5 أحرف على الأقل'),
  description: z.string().min(10, 'الرجاء تقديم تفاصيل أكثر (10 أحرف على الأقل)'),
  agreeToTerms: z.boolean().refine(val => val === true, 'يجب الموافقة على الشروط والأحكام'),
});

type FormData = z.infer<typeof formSchema>;

interface ServiceRequestFormProps {
  service: Service;
  city: City;
  country: Country;
  isUrgent?: boolean;
}

export default function ServiceRequestForm({ service, city, country, isUrgent = false }: ServiceRequestFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { language, t } = useLanguage();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      address: '',
      description: '',
      agreeToTerms: false,
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    console.log('Service request submitted:', { ...data, service: service.name, city: city.name, country: country.name, timestamp: new Date().toISOString() });
    
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast({
      title: 'تم استلام طلبك بنجاح!',
      description: `سنتواصل معك في أقرب وقت ممكن.`,
      variant: 'default',
    });

    form.reset();
    setIsSubmitting(false);
  };

  return (
    <Card className="bg-white/95 backdrop-blur-sm shadow-xl border-gray-200">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">{t('button.bookNow')}</CardTitle>
        <CardDescription>
          {t('form.requestFor')} {language === 'ar' ? service.nameAr : service.name} {t('form.in')} {language === 'ar' ? city.nameAr : city.name}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <FormField control={form.control} name="name" render={({ field }) => ( <FormItem><FormControl><Input placeholder={t('form.fullName')} {...field} className="ps-10" /></FormControl><FormMessage /></FormItem> )} />
            </div>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <FormField control={form.control} name="phone" render={({ field }) => ( <FormItem><FormControl><Input placeholder={`${t('form.phone')} (${country.phonePrefix})`} {...field} className="ps-10" /></FormControl><FormMessage /></FormItem> )} />
            </div>
             <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <FormField control={form.control} name="email" render={({ field }) => ( <FormItem><FormControl><Input type="email" placeholder={t('form.email')} {...field} className="ps-10" /></FormControl><FormMessage /></FormItem> )} />
            </div>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <FormField control={form.control} name="address" render={({ field }) => ( <FormItem><FormControl><Textarea placeholder={t('form.address')} {...field} className="ps-10 min-h-[80px]" /></FormControl><FormMessage /></FormItem> )} />
            </div>
            <FormField control={form.control} name="description" render={({ field }) => ( <FormItem><FormControl><Textarea placeholder={t('form.problemDescription')} {...field} className="min-h-[100px]" /></FormControl><FormMessage /></FormItem> )} />
            <FormField control={form.control} name="agreeToTerms" render={({ field }) => ( <FormItem className="flex flex-row items-center gap-x-3 space-y-0"><FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl><div className="space-y-1 leading-none"><label htmlFor="agreeToTerms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{t('form.agreeToTerms')}</label><FormMessage /></div></FormItem> )} />

            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg font-semibold flex items-center gap-x-2" disabled={isSubmitting}>
              {isSubmitting ? ( <><Loader2 className="w-5 h-5 animate-spin" /> {t('form.submitting')}</> ) : ( <>{t('button.submitRequest')}</> )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
