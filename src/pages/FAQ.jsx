import React from 'react';

const FAQ = () => {
  const faqs = [
    { q: "How do I apply for a scholarship?", a: "Register an account, browse scholarships, and click the 'Apply' button on the details page." },
    { q: "Is there any application fee?", a: "No, ScholarStream is free for all students. However, some universities might have their own fees." },
    { q: "How can I track my application status?", a: "Go to your User Dashboard and click on 'My Applications' to see real-time status." },
    { q: "Can I apply for multiple scholarships?", a: "Yes, you can apply for as many as you qualify for." }
  ];

  return (
    <div className="min-h-screen px-6 py-16 bg-base-200">
      <div className="max-w-3xl mx-auto">
        <h1 className="mb-10 text-4xl font-bold text-center text-teal-600">Frequently Asked Questions</h1>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white shadow-sm collapse collapse-plus dark:bg-gray-800 rounded-xl">
              <input type="radio" name="my-accordion-3" defaultChecked={index === 0} /> 
              <div className="text-xl font-medium text-gray-800 collapse-title dark:text-white">
                {faq.q}
              </div>
              <div className="text-gray-600 collapse-content dark:text-gray-300"> 
                <p>{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-8 mt-12 text-center text-white bg-teal-500 rounded-2xl">
          <h2 className="mb-2 text-2xl font-bold">Still need help?</h2>
          <p className="mb-4">Our support team is available 24/7 to assist you.</p>
          <button className="text-white border-white btn btn-outline hover:bg-white hover:text-teal-600">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default FAQ;