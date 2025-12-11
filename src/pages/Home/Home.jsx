import React from 'react';
import Banner from '../Banner';
import HowItWorks from '../shared/HowItWorks';
import TopScholarship from '../shared/TopScholarship';
import TestimonialSection from '../../components/TestimonialSlider';
import FAQSection from '../../components/FAQSection';
import ContactForm from '../../components/ContactForm';
import Brands from './Brands';
import ReviewsSection from './ReviewsSection';


const Home = () => {
    return (
        <div>
           <Banner />
           <Brands />
           <HowItWorks />
           <TopScholarship />
           <ReviewsSection />
           <FAQSection />
           <TestimonialSection />
           <ContactForm />
        </div>
    );
};

export default Home;