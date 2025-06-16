import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ServicePage from "./pages/ServicePage";
import SaudiArabia from "./pages/SaudiArabia";
import UAE from "./pages/UAE";
import Kuwait from "./pages/Kuwait";
import Egypt from "./pages/Egypt";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import NotFound from "./pages/NotFound";
import CityPage from "./pages/CityPage";
import ServicesListPage from "./pages/ServicesListPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <LanguageProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              
              {/* Country routes */}
              <Route path="/sa" element={<SaudiArabia />} />
              <Route path="/ae" element={<UAE />} />
              <Route path="/kw" element={<Kuwait />} />
              <Route path="/eg" element={<Egypt />} />
              
              {/* Services routes */}
              <Route path="/services" element={<ServicesListPage />} />
              <Route path="/services/:service" element={<ServicePage />} />
              
              {/* City routes */}
              <Route path="/:country/:city" element={<CityPage />} />
              
              {/* Legal pages */}
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-conditions" element={<TermsConditions />} />
              
              {/* Dynamic service pages */}
              <Route path="/:country/:city/:service" element={<ServicePage />} />
              
              {/* Catch-all for 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </LanguageProvider>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
