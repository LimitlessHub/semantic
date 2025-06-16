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
    
    // FIX: Using inline style for text-align to guarantee RTL works
    const textAlignStyle = { textAlign: language === 'ar' ? 'right' : 'left' } as const;

    if (serviceFaqs.length === 0) {
        return <p className="text-blue-200" style={textAlignStyle}>لا توجد أسئلة شائعة لهذه الخدمة حاليًا.</p>;
    }

    return (
        <Accordion type="single" collapsible className="w-full">
            {serviceFaqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-white/20">
                    <AccordionTrigger className={`hover:no-underline ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                       <span className="flex-1" style={textAlignStyle}>{faq.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-blue-200 pt-2" style={textAlignStyle}>
                        {faq.answer}
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    );
}
