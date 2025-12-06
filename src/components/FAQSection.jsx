import React, { useState } from 'react';
import { FaQuestion } from 'react-icons/fa6';
import { motion } from 'framer-motion';


export const slideInTopVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8, 
      ease: "easeOut",
    },
  },
};

const faqData = [
  {
    id: 1,
    question: "What are the minimum eligibility criteria?",
    answer: "Applicants generally must have achieved a specific GPA/CGPA (e.g., 3.50 or higher) in their last examination and must be enrolled in a recognized institution at the time of application. Some scholarships may require proof of financial need."
  },
  {
    id: 2,
    question: "Can I apply for multiple scholarships simultaneously?",
    answer: "This depends on the specific rules of each scholarship. Most organizations allow you to apply for multiple scholarships, but you may not be able to hold funds from more than one simultaneously. Always check the guidelines."
  },
  {
    id: 3,
    question: "What documents are typically required for the application?",
    answer: "Commonly required documents include: Academic transcripts/mark sheets, photo ID proof, Letters of Recommendation (LORs), and a well-written Personal Statement or Motivation Letter."
  },
  {
    id: 4,
    question: "How can the scholarship money be utilized?",
    answer: "Scholarship funds are typically intended to cover tuition fees, hostel fees, books, and other essential education-related expenses. Some scholarships pay the funds directly to your educational institution."
  },
  
];


const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="faq-item">
      <button 
        className={`faq-question ${isOpen ? 'active' : ''}`} 
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="question-text">{question}</span>
        <span className="toggle-icon">{isOpen ? '−' : '+'}</span>
      </button>

      <div 
        className="faq-answer-container" 
        style={{ maxHeight: isOpen ? '500px' : '0' }} 
      >
        <p className="faq-answer-text">{answer}</p>
      </div>
    </div>
  );
};


// Main FAQ Section Component
const FAQSection = () => {
  return (
    <motion.section
     variants={slideInTopVariants}
      initial="hidden"
      whileInView="visible" 
      viewport={{ once: true, amount: 0.1 }}
      className="faq-section-wrapper mt-[100px] m-4"
    >
      <div className="container">
        <h2 className="text-left text-2xl mg:text-3xl lg:text-4xl font-bold text-primary flex items-center">
          <span role="img" ></span><FaQuestion /> Frequently Asked Questions
        </h2>
        <p className="text-left mt-4 mb-8">Find quick answers to the most common queries regarding our scholarship stream.</p>
        
        <div className="faq-list">
          {faqData.map(item => (
            <FAQItem key={item.id} question={item.question} answer={item.answer} />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default FAQSection;