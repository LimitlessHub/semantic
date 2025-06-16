
import { Phone, Clock } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative py-12 sm:py-16 md:py-20 px-4">
      <div className="container mx-auto text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
          Find Local Services
          <span className="block text-blue-300">Across the Middle East</span>
        </h1>
        <p className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto mb-6 sm:mb-8 px-2">
          Connect with verified local professionals in Saudi Arabia, UAE, Kuwait, and Egypt. 
          Get instant quotes and reliable service for your home and business needs.
        </p>
        
        {/* Quick Contact */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-12 px-4">
          <div className="flex items-center space-x-2 text-white bg-blue-700/50 px-4 sm:px-6 py-2 sm:py-3 rounded-lg w-full sm:w-auto justify-center">
            <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="font-semibold text-sm sm:text-base">Call Now: +966-XXX-XXXX</span>
          </div>
          <div className="flex items-center space-x-2 text-white bg-green-600/50 px-4 sm:px-6 py-2 sm:py-3 rounded-lg w-full sm:w-auto justify-center">
            <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-sm sm:text-base">24/7 Available</span>
          </div>
        </div>
      </div>
    </section>
  );
}
