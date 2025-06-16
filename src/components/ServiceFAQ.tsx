import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqData } from "@/data/mockData";
import { useLanguage } from '@/contexts/LanguageContext';

interface ServiceFAQProps {
  serviceId: string;
}

export default function ServiceFAQ({ serviceId }: ServiceFAQProps) {
    const { language } = useLanguage();
    const serviceFaqs = faqData.filter(faq => faq.serviceId === serviceId);

    if (serviceFaqs.length === 0) {
        return <p className="text-blue-200">لا توجد أسئلة شائعة لهذه الخدمة حاليًا.</p>;
    }

    return (
        <Accordion type="single" collapsible className="w-full">
            {serviceFaqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-white/20">
                    {/* FIX: AccordionTrigger is now a flex container to control its children's layout */}
                    <AccordionTrigger className={`hover:no-underline ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                       <span className={`flex-1 ${language === 'ar' ? 'text-right' : 'text-left'}`}>{faq.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className={`text-blue-200 pt-2 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                        {faq.answer}
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    );
}
