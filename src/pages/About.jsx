import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen px-6 py-16 bg-base-100">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 text-center">
          <h1 className="mb-6 text-3xl font-bold text-white text-eye md:text-4xl">About Us</h1>
          <p className="max-w-2xl mx-auto text-lg text-base-content opacity-70">
            We are dedicated to bridging the gap between brilliant students and global scholarship opportunities. Our mission is to make higher education accessible to everyone.
          </p>
        </div>

        <div className="grid items-center gap-12 mb-20 md:grid-cols-2">
          <img src="https://i.ibb.co.com/7N4n125v/Uimg15.jpg" alt="Students" className="shadow-2xl rounded-2xl" />
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Why Choose Us?</h2>
            <p className="text-base-content opacity-80">
              ScholarStream provides a verified database of international scholarships. We help students through the entire application process, from finding the right fund to successfully securing it.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 font-medium">✅ Verified Global Opportunities</li>
              <li className="flex items-center gap-2 font-medium">✅ Real-time Application Tracking</li>
              <li className="flex items-center gap-2 font-medium">✅ Dedicated Support System</li>
            </ul>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="grid grid-cols-2 gap-8 p-10 text-center text-white bg-teal-500 md:grid-cols-4 rounded-3xl">
          <div><h3 className="text-4xl font-bold">10K+</h3><p>Active Students</p></div>
          <div><h3 className="text-4xl font-bold">500+</h3><p>Universities</p></div>
          <div><h3 className="text-4xl font-bold">$2M+</h3><p>Funds Awarded</p></div>
          <div><h3 className="text-4xl font-bold">95%</h3><p>Success Rate</p></div>
        </div>
      </div>
    </div>
  );
};

export default About;