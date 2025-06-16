
import { CheckCircle, Phone, MapPin } from 'lucide-react';

export default function PlatformFeaturesSection() {
  return (
    <section className="py-16 bg-gradient-to-t from-blue-800/50 to-transparent">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-white text-center mb-12">
          Why Choose Our Platform
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Verified Professionals</h3>
            <p className="text-blue-100">All service providers are thoroughly vetted and verified</p>
          </div>
          
          <div className="text-center">
            <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Instant Connection</h3>
            <p className="text-blue-100">Get connected with local professionals immediately</p>
          </div>
          
          <div className="text-center">
            <div className="bg-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Local Expertise</h3>
            <p className="text-blue-100">Professionals who understand your local area and needs</p>
          </div>
        </div>
      </div>
    </section>
  );
}
