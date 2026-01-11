import { Mail, MapPin, Phone, Send } from 'lucide-react';
import React, { useState } from 'react';
import { motion } from 'framer-motion';


const slideUpVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    inquiryType: 'General Inquiry',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setFormData({
      name: '',
      email: '',
      inquiryType: 'General Inquiry',
      message: ''
    });
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  if (isSubmitted) {
    return (
      <div className="max-w-5xl p-8 mx-auto my-12 text-center border border-green-300 shadow-lg bg-green-50 rounded-xl">
        <h2 className="mb-4 text-3xl font-bold text-green-600">🎉 Thank You! Message Received.</h2>
        <p className="text-lg text-green-700">We appreciate you reaching out. Our team will respond within 24-48 hours.</p>
        <button onClick={() => setIsSubmitted(false)} className="px-6 py-2 mt-6 text-white transition bg-green-600 rounded-lg hover:bg-green-700">Submit Another Inquiry</button>
      </div>
    );
  }

  return (
    <motion.section
        variants={slideUpVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="p-8 mx-auto lg:max-w-5xl my-30 lg:p-0 bg-base-100 text-base-content"
    >
      <div className="flex flex-col overflow-hidden shadow-2xl lg:flex-row rounded-xl bg-base-100 text-base-content">
        
        {/* Left Contact Info */}
        <div className="flex flex-col justify-center p-8 space-y-6 text-white bg-teal-500 lg:w-1/3">
          <h2 className="text-3xl font-bold text-eye">Need Help?
            <br/>Get in Touch!</h2>
          <p className="text-[#ffffff]">Our support team is ready to assist you with your scholarship application or general questions.</p>
          
          <div className="pt-4 space-y-4">
            <div className="flex items-center space-x-3">
              
              <p className="text-lg text-eye">support@scholarshipstream.com</p>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-6 h-6 text-green-600"/>
              <p className="text-lg text-eye">+880 1XXXXXXXXX</p>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="w-6 h-6 text-gray-600"/>
              <p className="text-lg text-eye">Dhaka, Bangladesh</p>
            </div>
          </div>
        </div>
        
        {/* Right Side: The Form */}
        <form className="p-8 border border-white rounded-md lg:w-2/3 md:p-12" onSubmit={handleSubmit}>
          <h3 className="mb-6 text-2xl font-bold text-teal-600">Send Us a Message</h3>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="col-span-1">
              <label htmlFor="name" className="block mb-1 text-sm font-medium dark:text-white">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
                className="w-full px-4 py-3 transition border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="col-span-1">
              <label htmlFor="email" className="block mb-1 text-sm font-medium dark:text-white">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-3 transition border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="mt-6">
            <label htmlFor="inquiryType" className="block mb-1 text-sm font-medium dark:text-white">Inquiry Type</label>
            <select
              id="inquiryType"
              name="inquiryType"
              value={formData.inquiryType}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 transition border border-gray-300 rounded-lg focus:ring-primary focus:border-teal-500 dark:text bg-base-100"
            >
              <option value="General Inquiry">General Inquiry</option>
              <option value="Application Status">Application Status</option>
              <option value="Technical Help">Technical Help (Form/Website)</option>
              <option value="Documentation">Documentation Required</option>
            </select>
          </div>

          <div className="mt-6">
            <label htmlFor="message" className="block mb-1 text-sm font-medium dark:text-white">Your Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              placeholder="Type your question or detailed inquiry here..."
              required
              className="w-full px-4 py-3 transition border border-gray-300 rounded-lg focus:ring-teal-700 focus:text-teal-600"
            />
          </div>

          <button type="submit" className="flex items-center justify-center w-full gap-2 px-6 py-2 mt-4 font-semibold text-teal-600 transition-all duration-300 bg-transparent border-2 border-orange-600 rounded-lg cursor-pointer hover:bg-orange-600 hover:text-white">
            <Send className="w-5 h-5"/>
            <span>Send Message</span>
          </button>
        </form>
      </div>
    </motion.section>
  );
};

export default ContactForm;