import React from 'react';
import Banner from '../Banner';
import HowItWorks from '../shared/HowItWorks';
import TopScholarship from '../shared/TopScholarship';
import TestimonialSection from '../../components/TestimonialSlider';
import FAQSection from '../../components/FAQSection';
import ContactForm from '../../components/ContactForm';
import Brands from './Brands';
import Reviews from './Reviews';


const reviewsPromise = fetch('/reviewData.json')
.then(res => res.json());


const Home = () => {
    return (
        <div>
           <Banner />
           <Brands />
           <HowItWorks />
           <TopScholarship />
           <Reviews reviewsPromise={reviewsPromise} />
           <FAQSection />
           <TestimonialSection />
           <ContactForm />
        </div>
    );
};

export default Home;