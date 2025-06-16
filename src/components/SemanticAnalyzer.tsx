
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Search, Loader2, TrendingUp, Target, Globe } from "lucide-react";

export const SemanticAnalyzer = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const [url, setUrl] = useState("");
  const [keyword, setKeyword] = useState("");

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    
    // Simulate analysis
    setTimeout(() => {
      setResults({
        semanticScore: 85,
        entityDensity: 78,
        topicalAuthority: 92,
        contentRelevance: 88,
        entities: ["Machine Learning", "AI", "Data Science", "SEO", "Analytics"],
        recommendations: [
          "Increase entity density for 'semantic search' by 15%",
          "Add more supporting content around 'topical clusters'",
          "Improve internal linking to boost topical authority"
        ]
      });
      setIsAnalyzing(false);
    }, 3000);
  };

  return (
    <section className="py-24 bg-gradient-to-r from-slate-800/50 to-blue-900/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Try Our Semantic Analysis Engine
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Get instant insights into your content's semantic strength and optimization opportunities.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white text-2xl flex items-center">
                <Search className="w-6 h-6 mr-2 text-blue-400" />
                Semantic SEO Analyzer
              </CardTitle>
              <CardDescription className="text-gray-300">
                Analyze your content's semantic structure and get actionable optimization recommendations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-white text-sm font-medium mb-2 block">Target URL</label>
                  <Input
                    placeholder="https://example.com/page"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  />
                </div>
                <div>
                  <label className="text-white text-sm font-medium mb-2 block">Primary Keyword</label>
                  <Input
                    placeholder="semantic search optimization"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  />
                </div>
              </div>
              
              <Button 
                onClick={handleAnalyze}
                disabled={isAnalyzing || !url || !keyword}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-3 text-lg font-semibold"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Analyzing Content...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5 mr-2" />
                    Analyze Semantic Structure
                  </>
                )}
              </Button>
              
              {results && (
                <div className="mt-8 space-y-6 animate-fade-in">
                  <h3 className="text-white text-xl font-semibold">Analysis Results</h3>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-gray-700/50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-300">Semantic Score</span>
                        <TrendingUp className="w-4 h-4 text-green-400" />
                      </div>
                      <div className="text-2xl font-bold text-green-400">{results.semanticScore}%</div>
                    </div>
                    
                    <div className="bg-gray-700/50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-300">Entity Density</span>
                        <Target className="w-4 h-4 text-blue-400" />
                      </div>
                      <div className="text-2xl font-bold text-blue-400">{results.entityDensity}%</div>
                    </div>
                    
                    <div className="bg-gray-700/50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-300">Topical Authority</span>
                        <Globe className="w-4 h-4 text-purple-400" />
                      </div>
                      <div className="text-2xl font-bold text-purple-400">{results.topicalAuthority}%</div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-700/30 rounded-lg p-6">
                    <h4 className="text-white font-semibold mb-3">Detected Entities</h4>
                    <div className="flex flex-wrap gap-2">
                      {results.entities.map((entity, i) => (
                        <span key={i} className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
                          {entity}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-gray-700/30 rounded-lg p-6">
                    <h4 className="text-white font-semibold mb-3">Optimization Recommendations</h4>
                    <ul className="space-y-2">
                      {results.recommendations.map((rec, i) => (
                        <li key={i} className="text-gray-300 flex items-start">
                          <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
