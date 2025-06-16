import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqData } from "@/data/mockData";
import { useLanguage } from '@/contexts/LanguageContext';
import { useMemo } from 'react';

interface ServiceFAQProps {
  serviceId: string;
}

export default function ServiceFAQ({ serviceId }: ServiceFAQProps) {
    const { language } = useLanguage();
    const serviceFaqs = useMemo(() => faqData.filter(faq => faq.serviceId === serviceId), [serviceId]);
    
    if (serviceFaqs.length === 0) {
        return <p className={`text-blue-200 ${language === 'ar' ? 'text-right' : 'text-left'}`}>لا توجد أسئلة شائعة لهذه الخدمة حاليًا.</p>;
    }

    return (
        <div dir={language === 'ar' ? 'rtl' : 'ltr'}>
            <Accordion type="single" collapsible className="w-full">
                {serviceFaqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`} className="border-white/20">
                        <AccordionTrigger className={`hover:no-underline text-white text-base ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                           {faq.question}
                        </AccordionTrigger>
                        {/* FIX: Using a clearer, higher-contrast text color */}
                        <AccordionContent className="text-gray-300 pt-2 text-start">
                            {faq.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
}
