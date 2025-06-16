
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';

export default function TermsConditions() {
  return (
    <Layout>
      <div className="min-h-screen py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold text-white text-center mb-12">
            Terms & Conditions
          </h1>
          
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-8">
              <div className="prose prose-invert max-w-none">
                <h2 className="text-2xl font-semibold text-white mb-4">Acceptance of Terms</h2>
                <p className="text-blue-100 mb-6">
                  By accessing and using LocalServices, you accept and agree to be bound by the 
                  terms and provision of this agreement.
                </p>

                <h2 className="text-2xl font-semibold text-white mb-4">Use License</h2>
                <p className="text-blue-100 mb-6">
                  Permission is granted to temporarily access LocalServices for personal, 
                  non-commercial transitory viewing only.
                </p>

                <h2 className="text-2xl font-semibold text-white mb-4">Service Availability</h2>
                <p className="text-blue-100 mb-6">
                  We strive to provide 24/7 service availability, but cannot guarantee 
                  uninterrupted access to our platform.
                </p>

                <h2 className="text-2xl font-semibold text-white mb-4">Limitation of Liability</h2>
                <p className="text-blue-100 mb-6">
                  LocalServices shall not be liable for any indirect, incidental, or 
                  consequential damages arising from your use of our services.
                </p>

                <h2 className="text-2xl font-semibold text-white mb-4">Contact Information</h2>
                <p className="text-blue-100">
                  For questions regarding these terms, please contact us at 
                  legal@localservices.com
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
