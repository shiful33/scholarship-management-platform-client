import React, { useEffect, useState } from "react";
import Banner from "../Banner";
import HowItWorks from "../shared/HowItWorks";
import TopScholarship from "../shared/TopScholarship";
import TestimonialSection from "../../components/TestimonialSlider";
import FAQSection from "../../components/FAQSection";
import ContactForm from "../../components/ContactForm";
import Brands from "./Brands";
import ReviewsSection from "./ReviewsSection";
import LoadingPage from "../LoadingPage";

const Home = () => {
  const [globalLoading, setGlobalLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setGlobalLoading(false), 2000); 
  }, []);

  if (globalLoading) {
    return <LoadingPage />;
  }

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
