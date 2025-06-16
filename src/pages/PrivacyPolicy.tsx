
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';

export default function PrivacyPolicy() {
  return (
    <Layout>
      <div className="min-h-screen py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold text-white text-center mb-12">
            Privacy Policy
          </h1>
          
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-8">
              <div className="prose prose-invert max-w-none">
                <h2 className="text-2xl font-semibold text-white mb-4">Information We Collect</h2>
                <p className="text-blue-100 mb-6">
                  We collect information you provide directly to us, such as when you create an account, 
                  request services, or contact us for support.
                </p>

                <h2 className="text-2xl font-semibold text-white mb-4">How We Use Your Information</h2>
                <p className="text-blue-100 mb-6">
                  We use the information we collect to provide, maintain, and improve our services, 
                  process transactions, and communicate with you.
                </p>

                <h2 className="text-2xl font-semibold text-white mb-4">Information Sharing</h2>
                <p className="text-blue-100 mb-6">
                  We do not sell, trade, or otherwise transfer your personal information to third parties 
                  without your consent, except as described in this policy.
                </p>

                <h2 className="text-2xl font-semibold text-white mb-4">Data Security</h2>
                <p className="text-blue-100 mb-6">
                  We implement appropriate security measures to protect your personal information 
                  against unauthorized access, alteration, disclosure, or destruction.
                </p>

                <h2 className="text-2xl font-semibold text-white mb-4">Contact Us</h2>
                <p className="text-blue-100">
                  If you have questions about this Privacy Policy, please contact us at 
                  privacy@localservices.com
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
