
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Phone, MapPin, Star, Clock, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Kuwait() {
  const cities = [
    { name: 'Kuwait City', nameAr: 'مدينة الكويت', slug: 'kuwait-city' },
    { name: 'Hawalli', nameAr: 'حولي', slug: 'hawalli' },
    { name: 'Salmiya', nameAr: 'السالمية', slug: 'salmiya' },
    { name: 'Jahra', nameAr: 'الجهراء', slug: 'jahra' },
    { name: 'Ahmadi', nameAr: 'الأحمدي', slug: 'ahmadi' },
    { name: 'Farwaniya', nameAr: 'الفروانية', slug: 'farwaniya' }
  ];

  const services = [
    { name: 'Plumbing', nameAr: 'السباكة', icon: '🔧', slug: 'plumbing' },
    { name: 'Electrical', nameAr: 'الكهرباء', icon: '⚡', slug: 'electrical' },
    { name: 'AC Repair', nameAr: 'تكييف', icon: '❄️', slug: 'ac-repair' },
    { name: 'Cleaning', nameAr: 'تنظيف', icon: '🧽', slug: 'cleaning' },
    { name: 'Painting', nameAr: 'دهان', icon: '🎨', slug: 'painting' },
    { name: 'Carpentry', nameAr: 'نجارة', icon: '🔨', slug: 'carpentry' }
  ];

  return (
    <Layout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto text-center">
            <div className="flex justify-center mb-6">
              <svg className="w-16 h-10 rounded" viewBox="0 0 24 16" fill="none">
                <rect width="24" height="16" fill="#007A3D"/>
                <rect x="0" y="0" width="24" height="5.33" fill="#007A3D"/>
                <rect x="0" y="5.33" width="24" height="5.34" fill="white"/>
                <rect x="0" y="10.67" width="24" height="5.33" fill="#CE1126"/>
                <polygon points="0,0 6,8 0,16" fill="#000000"/>
              </svg>
            </div>
            <h1 className="text-5xl font-bold text-white mb-6">
              Local Services in Kuwait
              <span className="block text-blue-300 text-3xl mt-2">خدمات محلية في الكويت</span>
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Reliable services across Kuwait. Professional technicians 
              available throughout all governorates.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center space-x-2 text-white bg-green-600/50 px-6 py-3 rounded-lg">
                <Phone className="w-5 h-5" />
                <span className="font-semibold">+965-XXX-XXXX</span>
              </div>
              <div className="flex items-center space-x-2 text-white bg-blue-600/50 px-6 py-3 rounded-lg">
                <Clock className="w-5 h-5" />
                <span>24/7 Emergency</span>
              </div>
            </div>
          </div>
        </section>

        {/* Cities Section */}
        <section className="py-16 bg-white/10 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Areas We Serve in Kuwait
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cities.map((city) => (
                <Card key={city.slug} className="bg-white/20 backdrop-blur-sm border-white/30 hover:bg-white/30 transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <MapPin className="w-8 h-8 text-blue-300 mx-auto mb-3" />
                    <h3 className="text-xl font-semibold text-white mb-1">{city.name}</h3>
                    <p className="text-blue-200 mb-3">{city.nameAr}</p>
                    <Link to={`/kw/${city.slug}`}>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">
                        View Services
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Available Services
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <Card key={service.slug} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-3">
                      <span className="text-3xl mr-3">{service.icon}</span>
                      <div>
                        <h3 className="text-xl font-semibold text-white">{service.name}</h3>
                        <p className="text-blue-200">{service.nameAr}</p>
                      </div>
                    </div>
                    <div className="flex items-center text-green-300 mb-3">
                      <Shield className="w-4 h-4 mr-2" />
                      <span className="text-sm">Verified Professionals</span>
                    </div>
                    <div className="flex items-center text-yellow-300">
                      <Star className="w-4 h-4 mr-1" />
                      <span className="text-sm">4.8+ Rating</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gradient-to-t from-blue-800/50 to-transparent">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Why Choose Us in Kuwait
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Trusted Service</h3>
                <p className="text-blue-100">Reliable professionals with years of experience in Kuwait</p>
              </div>
              
              <div className="text-center">
                <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Local Knowledge</h3>
                <p className="text-blue-100">Deep understanding of Kuwait's infrastructure and requirements</p>
              </div>
              
              <div className="text-center">
                <div className="bg-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Same Day Service</h3>
                <p className="text-blue-100">Quick response times across all Kuwait governorates</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
