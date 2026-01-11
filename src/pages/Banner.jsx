import React from "react";
// Swiper React components and modules
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/navigation";

import banner1 from "../assets/banner/banner1.png";
import banner2 from "../assets/banner/banner2.png";
import banner3 from "../assets/banner/banner3.png";
import { HandHeart, HeartPlus, Search } from "lucide-react";

const Banner = () => {
  const slides = [
    { img: banner1, title: "Find Scholarships", highlight: "for study", color: "bg-teal-50" },
    { img: banner2, title: "Unlock Your", highlight: "Future", color: "bg-blue-50" },
    { img: banner3, title: "Global Opportunities", highlight: "Await", color: "bg-orange-50" },
  ];

  return (
    <div className="w-full h-[60vh] lg:h-[70vh] bg-base-100 overflow-hidden mb-20">
      <Swiper
        spaceBetween={0}
        effect={"fade"}
        centeredSlides={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, EffectFade, Navigation]}
        className="h-full mySwiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className={`relative flex items-center h-full w-full ${slide.color} dark:bg-gray-900 px-6 lg:px-20`}>
              
              {/* Left Content */}
              <div className="z-10 w-full space-y-4 text-left lg:w-1/2 lg:space-y-6">
                <h2 className="text-4xl font-black leading-tight text-gray-800 md:text-6xl lg:text-6xl dark:text-white">
                  {slide.title} <br />
                  <span className="text-teal-500 underline decoration-orange-300 decoration-4">
                    {slide.highlight}
                  </span>
                </h2>
                
                <div className="space-y-2">
                  <p className="flex items-center gap-3 text-base font-medium text-gray-600 dark:text-gray-300 lg:text-xl">
                    <HandHeart className="text-teal-500" /> 100% Free scholarship programs
                  </p>
                  <p className="flex items-center gap-3 text-base font-medium text-gray-600 dark:text-gray-300 lg:text-xl">
                    <HeartPlus className="text-orange-400" /> Durable opportunities for every student
                  </p>
                </div>

                <div className="flex gap-4 pt-6">
                  <button className="px-8 py-4 text-white transition-all bg-teal-500 border-none rounded-full shadow-lg btn btn-lg hover:bg-teal-600 hover:scale-105">
                    <Search size={20} className="mr-2" /> Search Scholarship
                  </button>
                </div>
              </div>

              {/* Right Image (Floating Animation) */}
              <div className="items-center justify-center hidden w-1/2 h-full lg:flex">
                <img 
                  src={slide.img} 
                  alt="Banner" 
                  className="max-h-[85%] object-contain animate-float"
                />
              </div>

              {/* Background Decorative Element */}
              <div className="absolute w-64 h-64 rounded-full top-10 right-10 bg-teal-200/20 blur-3xl"></div>
              <div className="absolute w-48 h-48 rounded-full bottom-10 left-10 bg-orange-200/20 blur-3xl"></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom CSS for Floating Effect */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .swiper-button-next, .swiper-button-prev {
          color: #14b8a6 !important; /* Teal-500 */
        }
        .swiper-pagination-bullet-active {
          background: #14b8a6 !important;
        }
      `}</style>
    </div>
  );
};

export default Banner;