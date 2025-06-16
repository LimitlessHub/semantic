
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, MessageCircle, Mail, MapPin, Clock } from 'lucide-react';

export default function Contact() {
  const countries = [
    {
      name: 'Saudi Arabia',
      nameAr: 'المملكة العربية السعودية',
      phone: '+966-XXX-XXXX',
      whatsapp: '+966-XXX-XXXX',
      email: 'sa@localservices.com'
    },
    {
      name: 'UAE',
      nameAr: 'الإمارات العربية المتحدة',
      phone: '+971-XXX-XXXX',
      whatsapp: '+971-XXX-XXXX',
      email: 'ae@localservices.com'
    },
    {
      name: 'Kuwait',
      nameAr: 'الكويت',
      phone: '+965-XXX-XXXX',
      whatsapp: '+965-XXX-XXXX',
      email: 'kw@localservices.com'
    },
    {
      name: 'Egypt',
      nameAr: 'مصر',
      phone: '+20-XXX-XXXX',
      whatsapp: '+20-XXX-XXXX',
      email: 'eg@localservices.com'
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen py-12 sm:py-16 md:py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
              Contact Us
            </h1>
            <p className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto px-2">
              Get in touch with us for reliable local services across the Middle East. 
              We're here to help 24/7.
            </p>
          </div>

          {/* Quick Contact Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-colors">
              <CardContent className="p-4 sm:p-6 text-center">
                <Phone className="w-8 h-8 sm:w-10 sm:h-10 text-green-400 mx-auto mb-3 sm:mb-4" />
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">Phone Support</h3>
                <p className="text-blue-100 text-sm sm:text-base">24/7 Available</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-colors">
              <CardContent className="p-4 sm:p-6 text-center">
                <MessageCircle className="w-8 h-8 sm:w-10 sm:h-10 text-green-400 mx-auto mb-3 sm:mb-4" />
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">WhatsApp</h3>
                <p className="text-blue-100 text-sm sm:text-base">Instant Response</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-colors">
              <CardContent className="p-4 sm:p-6 text-center">
                <Mail className="w-8 h-8 sm:w-10 sm:h-10 text-blue-400 mx-auto mb-3 sm:mb-4" />
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">Email</h3>
                <p className="text-blue-100 text-sm sm:text-base">Professional Support</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-colors">
              <CardContent className="p-4 sm:p-6 text-center">
                <Clock className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-400 mx-auto mb-3 sm:mb-4" />
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">Emergency</h3>
                <p className="text-blue-100 text-sm sm:text-base">15 Min Response</p>
              </CardContent>
            </Card>
          </div>

          {/* Country Contacts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {countries.map((country, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center mb-4 sm:mb-6">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-blue-300 mr-2 sm:mr-3" />
                    <h3 className="text-xl sm:text-2xl font-semibold text-white">
                      {country.name}
                    </h3>
                  </div>
                  
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                      <div className="flex items-center text-blue-100">
                        <Phone className="w-4 h-4 mr-2" />
                        <span className="text-sm sm:text-base">Phone:</span>
                      </div>
                      <Button variant="outline" size="sm" className="bg-white/10 border-white/30 text-white hover:bg-white/20 text-xs sm:text-sm">
                        {country.phone}
                      </Button>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                      <div className="flex items-center text-blue-100">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        <span className="text-sm sm:text-base">WhatsApp:</span>
                      </div>
                      <Button variant="outline" size="sm" className="bg-green-600/20 border-green-500/30 text-green-300 hover:bg-green-600/30 text-xs sm:text-sm">
                        {country.whatsapp}
                      </Button>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                      <div className="flex items-center text-blue-100">
                        <Mail className="w-4 h-4 mr-2" />
                        <span className="text-sm sm:text-base">Email:</span>
                      </div>
                      <Button variant="outline" size="sm" className="bg-blue-600/20 border-blue-500/30 text-blue-300 hover:bg-blue-600/30 text-xs sm:text-sm">
                        {country.email}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Emergency Contact */}
          <Card className="mt-6 sm:mt-8 bg-red-900/20 backdrop-blur-sm border-red-500/30">
            <CardContent className="p-4 sm:p-6 text-center">
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
                <div className="flex items-center">
                  <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-red-400 mr-2" />
                  <span className="text-lg sm:text-xl font-semibold text-white">Emergency Services</span>
                </div>
                <Button className="bg-red-600 hover:bg-red-700 text-white px-4 sm:px-6 py-2 text-sm sm:text-base">
                  Call Emergency Hotline
                </Button>
              </div>
              <p className="text-red-200 mt-2 sm:mt-3 text-sm sm:text-base">
                For urgent plumbing, electrical, or HVAC emergencies - Available 24/7
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
