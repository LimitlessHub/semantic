
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Search, BarChart3 } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 animate-pulse" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.3),transparent_70%)]" />
      
      <div className="container mx-auto px-4 py-24 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <div className="flex items-center space-x-2 text-blue-400">
              <TrendingUp className="w-5 h-5" />
              <span className="text-sm font-semibold tracking-wide uppercase">
                Next-Gen SEO Intelligence
              </span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
              Semantic Search
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {" "}Strategy
              </span>
              <br />
              Reimagined
            </h1>
            
            <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
              Harness the power of AI, data science, and semantic SEO to dominate search rankings. 
              Build topical authority, optimize for E-E-A-T, and drive exponential SaaS growth.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-4 text-lg font-semibold hover-scale"
              >
                Start Free Analysis
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white px-8 py-4 text-lg"
              >
                View Demo
                <Search className="ml-2 w-5 h-5" />
              </Button>
            </div>
            
            <div className="flex items-center space-x-8 text-gray-400">
              <div className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-green-400" />
                <span>97% Accuracy Rate</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-blue-400" />
                <span>10M+ Keywords Analyzed</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 shadow-2xl animate-scale-in">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-white font-semibold">Semantic Analysis</h3>
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Entity Density</span>
                    <div className="w-32 bg-gray-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-green-400 to-blue-400 h-2 rounded-full w-3/4 animate-fade-in"></div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Topical Authority</span>
                    <div className="w-32 bg-gray-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-blue-400 to-purple-400 h-2 rounded-full w-5/6 animate-fade-in"></div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Content Relevance</span>
                    <div className="w-32 bg-gray-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-purple-400 to-pink-400 h-2 rounded-full w-4/5 animate-fade-in"></div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-gray-700/50 rounded-lg">
                  <div className="text-xs text-gray-400 mb-2">Semantic Entities Detected:</div>
                  <div className="flex flex-wrap gap-2">
                    {["Machine Learning", "SEO Strategy", "Data Science", "Content Marketing"].map((tag, i) => (
                      <span key={i} className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
