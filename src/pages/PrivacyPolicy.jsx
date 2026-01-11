import React from 'react';
import { ShieldCheck, Eye, Lock } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen px-6 py-16 bg-base-100">
      <div className="max-w-4xl mx-auto">
        <h1 className="mb-12 text-4xl font-bold text-center text-white text-eye">Privacy Policy</h1>
        
        <div className="grid gap-6 mb-12 md:grid-cols-3">
          <div className="p-6 text-center bg-blue-50 ">
            <ShieldCheck className="mx-auto mb-2 text-blue-500" size={32} />
            <h3 className="font-bold text-black">Safe Data</h3>
          </div>
          <div className="p-6 text-center bg-teal-50 rounded-xl">
            <Eye className="mx-auto mb-2 text-teal-500" size={32} />
            <h3 className="font-bold text-black">Transparent Use</h3>
          </div>
          <div className="p-6 text-center bg-orange-50 rounded-xl">
            <Lock className="mx-auto mb-2 text-orange-500" size={32} />
            <h3 className="font-bold text-black">Encrypted</h3>
          </div>
        </div>

        <div className="space-y-6 dark:text-gray-300">
          <p>Your privacy is important to us. It is ScholarStream's policy to respect your privacy regarding any information we may collect from you across our website.</p>
          
          <h3 className="text-xl font-bold dark:text-white">Information We Collect</h3>
          <p>We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent.</p>

          <h3 className="text-xl font-bold dark:text-white">Data Retention</h3>
          <p>We only retain collected information for as long as necessary to provide you with your requested scholarship service.</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;