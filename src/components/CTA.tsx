
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Zap } from "lucide-react";

export const CTA = () => {
  return (
    <section className="py-24 bg-gradient-to-r from-blue-900/50 to-purple-900/50 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]" />
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="w-8 h-8 text-yellow-400 mr-2" />
            <span className="text-yellow-400 font-semibold text-lg">Ready to Dominate Search?</span>
          </div>
          
          <h2 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Transform Your SEO Strategy
            <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Starting Today
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Join thousands of companies using AI-powered semantic SEO to achieve breakthrough results. 
            Start your transformation with our comprehensive analysis and strategy toolkit.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-10 py-4 text-xl font-semibold hover-scale shadow-2xl"
            >
              <Zap className="w-5 h-5 mr-2" />
              Start Free Analysis
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="border-gray-400 text-gray-300 hover:bg-white hover:text-gray-900 px-10 py-4 text-xl font-semibold"
            >
              Book Strategy Call
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-blue-400">14-Day</div>
              <div className="text-gray-300">Free Trial</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-green-400">No Setup</div>
              <div className="text-gray-300">Required</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-purple-400">24/7</div>
              <div className="text-gray-300">Expert Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
