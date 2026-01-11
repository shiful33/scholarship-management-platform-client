import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen px-6 py-16 bg-base-100">
      <div className="grid max-w-5xl gap-12 mx-auto md:grid-cols-2">
        {/* Left Side: Contact Info */}
        <div className="space-y-8">
          <h1 className="text-4xl font-bold text-white text-eye">Get in Touch</h1>
          <p className="text-lg opacity-70">Have questions? We are here to help you secure your future.</p>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="p-4 text-teal-600 bg-teal-100 rounded-full"><Mail /></div>
              <div><p className="font-bold">Email us</p><p className="opacity-70">support@scholarstream.com</p></div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-4 text-orange-600 bg-orange-100 rounded-full"><Phone /></div>
              <div><p className="font-bold">Call us</p><p className="opacity-70">+880 1234 567 890</p></div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-4 text-blue-600 bg-blue-100 rounded-full"><MapPin /></div>
              <div><p className="font-bold">Office</p><p className="opacity-70">Dhanmondi, Dhaka, Bangladesh</p></div>
            </div>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="p-8 bg-white border border-gray-100 shadow-xl dark:bg-gray-800 rounded-2xl dark:border-gray-700">
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="form-control">
              <label className="label"><span className="label-text">Full Name</span></label>
              <input type="text" placeholder="Your Name" className="w-full input input-bordered dark:bg-gray-300" required />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text">Email Address</span></label>
              <input type="email" placeholder="Your Email" className="w-full input input-bordered dark:bg-gray-300" required />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text">Message</span></label> <br />
              <textarea className="w-full h-32 textarea textarea-bordered dark:bg-gray-300" placeholder="How can we help?"></textarea>
            </div>
            <button className="w-full text-white bg-teal-500 border-none btn hover:bg-teal-600">
              <Send size={18} className="mr-2" /> Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;