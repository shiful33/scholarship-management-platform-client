import React from 'react';
import { Cookie } from 'lucide-react';

const CookiePolicy = () => {
  return (
    <div className="min-h-screen px-6 py-16 bg-base-200">
      <div className="max-w-3xl p-10 mx-auto border border-gray-100 shadow-lg dark:bg-gray-800 rounded-3xl dark:border-gray-700">
        <div className="flex items-center gap-4 mb-8">
          <Cookie size={48} className="text-orange-400 animate-pulse" />
          <h1 className="text-3xl font-bold text-eye">Cookie Policy</h1>
        </div>

        <div className="space-y-6">
          <p className="text-lg font-medium">What are cookies?</p>
          <p className="opacity-80">Cookies are small text files that are used to store small pieces of information. They are stored on your device when the website is loaded on your browser.</p>

          <div className="divider opacity-10"></div>

          <p className="text-lg font-medium">How we use cookies?</p>
          <ul className="ml-6 space-y-2 list-disc opacity-80">
            <li>To remember your login status.</li>
            <li>To understand how you use our scholarship search tools.</li>
            <li>To improve your overall browsing experience.</li>
          </ul>

          <div className="p-4 mt-6 border-l-4 border-teal-500 rounded-lg dark:bg-gray-900">
            <p className="text-sm">By continuing to use our site, you agree to the use of cookies as described in this policy.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;