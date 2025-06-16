
import { Brain, BarChart3, Zap, Target, Database, Globe } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Semantic Analysis",
    description: "Advanced NLP algorithms analyze content semantics, entity relationships, and topical authority to optimize for modern search engines."
  },
  {
    icon: BarChart3,
    title: "Data Science Insights",
    description: "Python-powered analytics provide deep competitive intelligence, trend analysis, and predictive modeling for strategic SEO decisions."
  },
  {
    icon: Target,
    title: "SaaS Growth Optimization",
    description: "Specialized tools for SaaS companies to optimize acquisition funnels, reduce churn, and drive product-led growth through SEO."
  },
  {
    icon: Database,
    title: "Technical SEO Automation",
    description: "Automated technical audits, structured data validation, and site architecture optimization powered by machine learning."
  },
  {
    icon: Globe,
    title: "E-E-A-T Authority Building",
    description: "Strategic content planning and optimization focused on Experience, Expertise, Authoritativeness, and Trustworthiness signals."
  },
  {
    icon: Zap,
    title: "Real-Time Performance Tracking",
    description: "Live monitoring of rankings, traffic patterns, and conversion metrics with intelligent alerting and recommendations."
  }
];

export const Features = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-transparent to-slate-800/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            The Complete SEO Intelligence Platform
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Combining cutting-edge AI, data science, and deep SEO expertise to deliver 
            unparalleled insights and measurable results for modern search optimization.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 border-gray-700 hover:border-blue-500/50 transition-all duration-300 hover-scale"
            >
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-white text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-300 text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
