import { div } from "framer-motion/client";
import React, { use } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { slideInLeftVariants } from "../shared/data/variants";
import { motion } from "framer-motion";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import ReviewCard from "./ReviewCard";

const Reviews = ({ reviewsPromise }) => {
  const reviews = use(reviewsPromise);
  console.log(reviews);

  return (
    <div className="mt-[120px] m-4">
      <motion.div
        variants={slideInLeftVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        <h1 className="text-2xl md:text-3xl lg:text-5xl font-extrabold mb-4 text-left text-primary">
          Students <span className="text-eye">Reviews</span>
        </h1>
        <p className="text-[18px] text-left  lg:w-[650px] mb-12">
          community projects, and social initiatives. It encourages socially
          responsible education and provides funds to advance impactful
          projects.
        </p>
      </motion.div>

      <Swiper
        loop={true}
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        spaceBetween={30}
        slidesPerView={3}
        coverflowEffect={{
          rotate: 30,
          stretch: '50%',
          depth: 200,
          modifier: 1,
          scale: 0.75,
          slideShadows: true,
        }}
        // autoplay={{ delay:2000, disableOnInteraction: false }}
        pagination={true}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="mySwiper"
      >
        {reviews.map((review) => (
          <SwiperSlide key={review.id}>
            <ReviewCard review={review}/>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Reviews;
