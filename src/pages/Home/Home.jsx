import React from 'react';
import Banner from '../Banner';
import HowItWorks from '../shared/HowItWorks';
import TopScholarship from '../shared/TopScholarship';
import TestimonialSection from '../../components/TestimonialSlider';
import FAQSection from '../../components/FAQSection';
import ContactForm from '../../components/ContactForm';


const Home = () => {
    return (
        <div>
           <Banner />
           <HowItWorks />
           <TopScholarship />
           <TestimonialSection />
           <FAQSection />
           <ContactForm />
        </div>
    );
};

export default Home;