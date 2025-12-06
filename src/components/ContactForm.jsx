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
      <div className="max-w-5xl mx-auto p-8 my-12 bg-green-50 border border-green-300 rounded-xl text-center shadow-lg">
        <h2 className="text-3xl font-bold text-green-600 mb-4">🎉 Thank You! Message Received.</h2>
        <p className="text-lg text-green-700">We appreciate you reaching out. Our team will respond within 24-48 hours.</p>
        <button onClick={() => setIsSubmitted(false)} className="mt-6 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">Submit Another Inquiry</button>
      </div>
    );
  }

  return (
    <motion.section
        variants={slideUpVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="lg:max-w-5xl mx-auto my-30 p-8 lg:p-0"
    >
      <div className="flex flex-col lg:flex-row shadow-2xl rounded-xl overflow-hidden bg-white">
        
        {/* Left Contact Info */}
        <div className="lg:w-1/3 p-8 bg-teal-500 text-white flex flex-col justify-center space-y-6">
          <h2 className="text-3xl font-bold text-eye">Need Help?
            <br/>Get in Touch!</h2>
          <p className="text-blue-100">Our support team is ready to assist you with your scholarship application or general questions.</p>
          
          <div className="space-y-4 pt-4">
            <div className="flex items-center space-x-3">
              <Mail className="w-10 h-10 text-blue-200"/>
              <p className="text-lg">support@scholarshipstream.com</p>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-6 h-6 text-green-600"/>
              <p className="text-lg">+880 1XXXXXXXXX</p>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="w-6 h-6 text-blue-200"/>
              <p className="text-lg">Dhaka, Bangladesh</p>
            </div>
          </div>
        </div>
        
        {/* Right Side: The Form */}
        <form className="lg:w-2/3 p-8 md:p-12" onSubmit={handleSubmit}>
          <h3 className="text-2xl font-bold text-teal-600 mb-6">Send Us a Message</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-1">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>

            <div className="col-span-1">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>
          </div>

          <div className="mt-6">
            <label htmlFor="inquiryType" className="block text-sm font-medium text-gray-700 mb-1">Inquiry Type</label>
            <select
              id="inquiryType"
              name="inquiryType"
              value={formData.inquiryType}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-teal-500 bg-white transition"
            >
              <option value="General Inquiry">General Inquiry</option>
              <option value="Application Status">Application Status</option>
              <option value="Technical Help">Technical Help (Form/Website)</option>
              <option value="Documentation">Documentation Required</option>
            </select>
          </div>

          <div className="mt-6">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              placeholder="Type your question or detailed inquiry here..."
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-teal-700 focus:text-teal-600 transition"
            />
          </div>

          <button type="submit" className="w-full flex justify-center items-center gap-2 font-semibold border-2 bg-transparent px-6 py-2 cursor-pointer rounded-lg hover:bg-orange-600 transition-all duration-300 hover:text-white border-orange-600 mt-4 text-teal-600">
            <Send className="w-5 h-5"/>
            <span>Send Message</span>
          </button>
        </form>
      </div>
    </motion.section>
  );
};

export default ContactForm;