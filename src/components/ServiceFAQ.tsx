import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqData } from "@/data/mockData"; // سنضيف هذا في mockData
import { useMemo } from "react";

interface ServiceFAQProps {
  serviceId: string;
}

export default function ServiceFAQ({ serviceId }: ServiceFAQProps) {
  const serviceFaqs = useMemo(() => {
    return faqData.filter(faq => faq.serviceId === serviceId);
  }, [serviceId]);

  if (serviceFaqs.length === 0) {
    return <p className="text-blue-200">لا توجد أسئلة شائعة لهذه الخدمة حاليًا.</p>;
  }

  return (
    <Accordion type="single" collapsible className="w-full">
      {serviceFaqs.map((faq, index) => (
        <AccordionItem key={index} value={`item-${index}`} className="border-white/20">
          <AccordionTrigger className="text-white text-start hover:no-underline">{faq.question}</AccordionTrigger>
          <AccordionContent className="text-blue-200">{faq.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
