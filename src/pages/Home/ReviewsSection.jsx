import { useQuery } from "@tanstack/react-query";
import ReviewItem from "../../components/ReviewItem";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
// Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const ReviewsSection = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: latestReviews = [],
    isLoading: isReviewsLoading,
    isError,
  } = useQuery({
    queryKey: ["latestReviews"],
    queryFn: async () => {
      const res = await axiosSecure.get("/latest-reviews");
      return res.data;
    },
  });

  const slideInLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  if (isReviewsLoading) {
    return <div className="p-10 text-center">Loading reviews...</div>;
  }

  if (isError || !Array.isArray(latestReviews) || latestReviews.length === 0) {
    return null;
  }

  return (
    <section className="py-16 overflow-hidden rounded-lg shadow-lg bg-base-100 text-base-content">
      <motion.h2
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={slideInLeft}
        className="mb-12 text-4xl font-extrabold text-center text-primary"
      >
        ✨ Students Reviews
      </motion.h2>

      <div className="px-4 mx-auto max-w-7xl">
        <Swiper
          spaceBetween={30}
          slidesPerView={1} 
          loop={true} 
          speed={20000}
          // allowTouchMove={true} 
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          modules={[Autoplay]}
          className="mySwiper"
        >
          {latestReviews.map((review, index) => (
            <SwiperSlide key={review._id || index}>
              <ReviewItem review={review} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style>{`
      .swiper-wrapper {
       transition-timing-function: linear !important;
      }
    `}</style>
    </section>
  );
};

export default ReviewsSection;
