
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Phone, MessageCircle, Clock, AlertTriangle } from 'lucide-react';
import { Service, City, Country } from '@/types';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(8, 'Valid phone number required'),
  email: z.string().email('Valid email required').optional().or(z.literal('')),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  urgency: z.enum(['normal', 'urgent', 'emergency']),
  preferredTime: z.string(),
  description: z.string().min(10, 'Please provide more details (minimum 10 characters)'),
  contactMethod: z.enum(['phone', 'whatsapp', 'both']),
  agreeToTerms: z.boolean().refine(val => val === true, 'You must agree to terms'),
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

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      address: '',
      urgency: isUrgent ? 'urgent' : 'normal',
      preferredTime: '',
      description: '',
      contactMethod: 'phone',
      agreeToTerms: false,
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    console.log('Service request submitted:', {
      ...data,
      service: service.name,
      city: city.name,
      country: country.name,
      timestamp: new Date().toISOString(),
    });

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast({
      title: 'Request Submitted Successfully!',
      description: `We'll contact you within ${data.urgency === 'emergency' ? '15 minutes' : data.urgency === 'urgent' ? '1 hour' : '2-4 hours'}`,
    });

    form.reset();
    setIsSubmitting(false);
  };

  const urgencyColors = {
    normal: 'text-green-600 bg-green-50',
    urgent: 'text-orange-600 bg-orange-50',
    emergency: 'text-red-600 bg-red-50',
  };

  const urgencyLabels = {
    normal: 'Normal Service',
    urgent: 'Urgent (Same Day)',
    emergency: 'Emergency (ASAP)',
  };

  return (
    <Card className="bg-white/95 backdrop-blur-sm">
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 sm:space-x-reverse text-sm sm:text-base">
          <span>Request {service.name} في {city.name}</span>
          {isUrgent && <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm">Full Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your name" {...field} className="text-sm" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm">Phone Number *</FormLabel>
                    <FormControl>
                      <Input placeholder={`${country.phonePrefix}-XXX-XXXX`} {...field} className="text-sm" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">Email (Optional)</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="your.email@example.com" {...field} className="text-sm" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">Service Address *</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter your full address" {...field} className="text-sm min-h-[80px]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="urgency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm">Service Urgency *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="text-sm">
                          <SelectValue placeholder="Select urgency" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.entries(urgencyLabels).map(([value, label]) => (
                          <SelectItem key={value} value={value}>
                            <div className={`px-2 py-1 rounded text-xs ${urgencyColors[value as keyof typeof urgencyColors]}`}>
                              {label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="preferredTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm">Preferred Time</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="text-sm">
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="morning">Morning (8AM-12PM)</SelectItem>
                        <SelectItem value="afternoon">Afternoon (12PM-5PM)</SelectItem>
                        <SelectItem value="evening">Evening (5PM-8PM)</SelectItem>
                        <SelectItem value="anytime">Anytime</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">Problem Description *</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder={`Describe your ${service.name} needs in detail...`}
                      className="min-h-[100px] text-sm"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contactMethod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">Preferred Contact Method *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="text-sm">
                        <SelectValue placeholder="How should we contact you?" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="phone">
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4" />
                          <span>Phone Call</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="whatsapp">
                        <div className="flex items-center space-x-2">
                          <MessageCircle className="w-4 h-4" />
                          <span>WhatsApp</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="both">Both Phone & WhatsApp</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="agreeToTerms"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-sm">
                      I agree to the terms of service and privacy policy *
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-base sm:text-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span className="text-sm sm:text-base">Submitting Request...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-sm sm:text-base">Submit Service Request</span>
                </div>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
