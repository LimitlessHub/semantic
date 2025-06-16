
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Users, Clock, Award, MapPin, CheckCircle } from 'lucide-react';

export default function About() {
  const features = [
    {
      icon: Shield,
      title: 'Verified Professionals',
      description: 'All service providers are thoroughly vetted and background-checked'
    },
    {
      icon: Clock,
      title: '24/7 Availability',
      description: 'Round-the-clock service across all major cities in the Middle East'
    },
    {
      icon: Users,
      title: 'Expert Team',
      description: 'Over 5,000 certified professionals ready to serve your needs'
    },
    {
      icon: Award,
      title: 'Quality Guaranteed',
      description: '100% satisfaction guarantee with comprehensive service warranty'
    }
  ];

  const stats = [
    { number: '50,000+', label: 'Happy Customers' },
    { number: '5,000+', label: 'Verified Professionals' },
    { number: '100+', label: 'Cities Covered' },
    { number: '4.9/5', label: 'Average Rating' }
  ];

  const coverage = [
    'Saudi Arabia - Riyadh, Jeddah, Dammam, Mecca, Medina',
    'UAE - Dubai, Abu Dhabi, Sharjah, Ajman, Fujairah',
    'Kuwait - Kuwait City, Hawalli, Ahmadi, Jahra',
    'Egypt - Cairo, Alexandria, Giza, Luxor, Aswan'
  ];

  return (
    <Layout>
      <div className="min-h-screen py-12 sm:py-16 md:py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Hero Section */}
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
              About LocalServices
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed px-2">
              We are the Middle East's leading platform connecting customers with 
              trusted local service professionals. Since 2020, we've been making 
              home and business services accessible, reliable, and affordable.
            </p>
          </div>

          {/* Mission Statement */}
          <Card className="mb-8 sm:mb-12 md:mb-16 bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6 sm:p-8 md:p-12 text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
                Our Mission
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-blue-100 leading-relaxed">
                To transform how people access local services by creating a trusted, 
                efficient, and transparent marketplace that benefits both customers and 
                service professionals across the Middle East region.
              </p>
            </CardContent>
          </Card>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12 md:mb-16">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-4 sm:p-6 text-center">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-300 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-xs sm:text-sm md:text-base text-blue-100">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12 md:mb-16">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-colors">
                  <CardContent className="p-4 sm:p-6 text-center">
                    <IconComponent className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-blue-300 mx-auto mb-3 sm:mb-4" />
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-2 sm:mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-xs sm:text-sm md:text-base text-blue-100 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Coverage Area */}
          <Card className="mb-8 sm:mb-12 bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6 sm:p-8">
              <div className="flex items-center mb-4 sm:mb-6">
                <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-blue-300 mr-3" />
                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                  Service Coverage
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {coverage.map((area, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                    <p className="text-sm sm:text-base text-blue-100 leading-relaxed">
                      {area}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Company Values */}
          <Card className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 backdrop-blur-sm border-white/20">
            <CardContent className="p-6 sm:p-8 md:p-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center mb-6 sm:mb-8">
                Why Choose Us?
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                <div className="text-center">
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">
                    Trusted Network
                  </h3>
                  <p className="text-sm sm:text-base text-blue-100 leading-relaxed">
                    Every professional in our network undergoes rigorous screening 
                    and verification processes to ensure quality service delivery.
                  </p>
                </div>
                
                <div className="text-center">
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">
                    Transparent Pricing
                  </h3>
                  <p className="text-sm sm:text-base text-blue-100 leading-relaxed">
                    No hidden fees, no surprises. Get upfront pricing and 
                    detailed quotes before any work begins.
                  </p>
                </div>
                
                <div className="text-center">
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">
                    24/7 Support
                  </h3>
                  <p className="text-sm sm:text-base text-blue-100 leading-relaxed">
                    Our customer support team is available around the clock 
                    to assist with any questions or concerns.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
