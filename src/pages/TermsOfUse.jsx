import React from 'react';

const TermsOfUse = () => {
  return (
    <div className="min-h-screen px-6 py-16 bg-base-100">
      <div className="max-w-4xl mx-auto prose dark:prose-invert">
        <h1 className="mb-6 text-4xl font-bold text-center text-white text-eye">Terms of Use</h1>
        <p className="mb-10 text-sm text-center text-gray-500">Last Updated: January 11, 2026</p>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">1. Acceptance of Terms</h2>
          <p>By accessing and using ScholarStream, you accept and agree to be bound by the terms and provision of this agreement.</p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">2. Use License</h2>
          <p>Permission is granted to temporarily download one copy of the materials on ScholarStream's website for personal, non-commercial transitory viewing only.</p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">3. User Conduct</h2>
          <p>Users are prohibited from posting or transmitting any unlawful, threatening, or offensive material. Fraudulent applications for scholarships will lead to immediate account termination.</p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">4. Disclaimer</h2>
          <p>The materials on ScholarStream's website are provided on an 'as is' basis. We make no warranties, expressed or implied, regarding scholarship approvals.</p>
        </section>
      </div>
    </div>
  );
};

export default TermsOfUse;