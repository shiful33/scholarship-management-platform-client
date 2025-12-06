import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import banner1 from "../assets/banner/banner1.png";
import banner2 from "../assets/banner/banner2.png";
import banner3 from "../assets/banner/banner3.png";
import { FaGoogleScholar } from "react-icons/fa6";
import { BadgeDollarSign, HandHeart, HeartPlus } from "lucide-react";

const Banner = () => {
  return (
    <Carousel
    autoPlay={true}
    infiniteLoop={true}
    className="my-[80px] m-4"
    >
      <div className="transition-all duration-300 opacity-85 bg-teal-100 shadow-lg">
        <img src={banner1} className="relative m-4"/>
        
        <div className="absolute bottom-[5%] lg:bottom-[15%] lg:left-[5%] text-primary font-semibold text-left">
          <h2 className="text-xl md:text-5xl lg:text-7xl font-extrabold lg:mb-6">Find <span className="text-eye">Scholarships</span><br/> for study</h2>
            
            <p className="flex items-center gap-3 text-sm lg:text-[20px] w-[180px] lg:w-full"><HandHeart className="text-[#404040]"/>100% free scholarship</p>
            <p className="flex items-center gap-3 text-sm lg:text-[20px] w-[180px] lg:w-full"><HeartPlus  className="text-[#404040]"/>Durable opportunities for every students</p>
            <button className="hidden lg:block  bg-outline border-2 py-4 bg-[#bdfffb] hover:bg-[#0c5f5a] hover:text-white transition-colors duration-500 px-10 mt-6 cursor-pointer font-semibold text-[19px] rounded">Search Scholarship</button>
        </div>
      </div>

      <div className="transition-all duration-300 opacity-85 bg-teal-100 shadow-lg">
        <img src={banner2} className="relative m-4"/>
        
        <div className="absolute bottom-[5%] lg:bottom-[15%] lg:left-[5%] text-primary font-semibold text-left">
          <h2 className="text-xl md:text-5xl lg:text-7xl font-extrabold lg:mb-6">Find <span className="text-eye">Scholarships</span><br/> for study</h2>
            
            <p className="flex items-center gap-3 text-sm lg:text-[20px] w-[180px] lg:w-full"><HandHeart className="text-[#404040]"/>100% free scholarship</p>
            <p className="flex items-center gap-3 text-sm lg:text-[20px] w-[180px] lg:w-full"><HeartPlus  className="text-[#404040]"/>Durable opportunities for every students</p>
            <button className="hidden lg:block  bg-outline border-2 py-4 bg-[#bdfffb] hover:bg-[#0c5f5a] hover:text-white transition-colors duration-500 px-10 mt-6 cursor-pointer font-semibold text-[19px] rounded">Search Scholarship</button>
        </div>
      </div>

      <div className="transition-all duration-300 opacity-85 bg-teal-100 shadow-lg">
        <img src={banner3} className="relative m-4"/>
        
        <div className="absolute bottom-[5%] lg:bottom-[15%] lg:left-[5%] text-primary font-semibold text-left">
          <h2 className="text-xl md:text-5xl lg:text-7xl font-extrabold lg:mb-6">Find <span className="text-eye">Scholarships</span><br/> for study</h2>
            
            <p className="flex items-center gap-3 text-sm lg:text-[20px] w-[180px] lg:w-full"><HandHeart className="text-[#404040]"/>100% free scholarship</p>
            <p className="flex items-center gap-3 text-sm lg:text-[20px] w-[180px] lg:w-full"><HeartPlus  className="text-[#404040]"/>Durable opportunities for every students</p>
            <button className="hidden lg:block  bg-outline border-2 py-4 bg-[#bdfffb] hover:bg-[#0c5f5a] hover:text-white transition-colors duration-500 px-10 mt-6 cursor-pointer font-semibold text-[19px] rounded">Search Scholarship</button>
        </div>
      </div>
    </Carousel>
  );
};

export default Banner;
