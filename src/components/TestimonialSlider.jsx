import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { scholarshipTestimonials } from '../pages/shared/data/scholarshipTestimonials';
import { slideInLeftVariants } from '../pages/shared/data/variants';
import { motion } from "framer-motion";




const TestimonialCard = ({ quote, name, designation, scholarshipName, image }) => (
  <div className=" bg-[#ddfffa] p-6 rounded-xl shadow-xl overflow-hidden transition-all duration-300">
    <div className="text-[54px] text-secondary text-left">❝</div>
    <p className="mb-4 text-left">{quote}</p>
    <div className="scholarship-info">
        <p className="text-[#404040] font-bold text-[19px] text-left">{scholarshipName}</p>
    </div>
    <div className="student-details">

      <img src={image} alt={name} className="student-photo" /> 
      <div className="text-info">
        <h4 className="text-[#404040] text-left font-bold">{name}</h4>
        <p className="text-[#404040] text-sm">{designation}</p>
      </div>
    </div>
  </div>
);

// Main Slider Component
const TestimonialSlider = () => {
  return (
    <div className="mt-[120px] p-4 lg:p-0">
        <motion.div
        variants={slideInLeftVariants}
        initial="hidden"
        whileInView="visible" 
        viewport={{ once: true, amount: 0.5 }}
        >
        <h2 className='text-2xl md:text-3xl lg:text-5xl font-extrabold mb-4 text-left text-primary'>Experiences of Our <span className='text-eye'>Scholarship Students</span></h2>
        <p className='text-[18px] text-left  lg:w-[650px] mb-8'>community projects, and social initiatives. It encourages socially responsible education and provides funds to advance impactful projects.</p>
        </motion.div>
        <Swiper
            modules={[Pagination, Autoplay]} 
            spaceBetween={30} 
            slidesPerView={1}
            pagination={{ clickable: true }} 
            autoplay={{ delay: 5000, disableOnInteraction: false }}

            breakpoints={{
                320: {
                    slidesPerView: 1,
                    spaceBetween: 10,
                },
                640: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
            }}
            className=""
        >
            {scholarshipTestimonials.map((testimonial) => (
                <SwiperSlide key={testimonial.id}>
                    <TestimonialCard {...testimonial} />
                </SwiperSlide>
            ))}
        </Swiper>
    </div>
  );
};

export default TestimonialSlider;