import React from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import halal from "../../assets/brands/halal.png";
import daisy from "../../assets/brands/daisy.png";
import coffee from "../../assets/brands/coffee.png";
import blackberry from "../../assets/brands/blackberry.png";
import amazon from "../../assets/brands/amazon.png";
import acer from "../../assets/brands/acer.png";
import rolex from "../../assets/brands/rolex.png";
import prada from "../../assets/brands/prada.png";
import paloalto from "../../assets/brands/paloalto.png";
import whirlpool from "../../assets/brands/whirlpool.png";
import lacost from "../../assets/brands/lacost.png";
import visa from "../../assets/brands/visa.png";
import microsoft from "../../assets/brands/microsoft.jpg";
import luxury from "../../assets/brands/luxury.jpg";
import { Autoplay } from "swiper/modules";

export const brandLogos = [
  halal,
  daisy,
  coffee,
  blackberry,
  amazon,
  acer,
  rolex,
  prada,
  paloalto,
  whirlpool,
  lacost,
  visa,
  microsoft,
  luxury,
];

const Brands = () => {
  return (
    <Swiper
      loop={true}
      slidesPerView={6}
      centeredSlides={true}
      spaceBetween={30}
      grabCursor={true}
      autoplay={{
        delay: 1000,
        disableOnInteraction: false,
      }}
      modules={[Autoplay]}
    >
      {brandLogos.map((logo, index) => (
        <SwiperSlide key={index}>
          <img src={logo} className={`w-[80px] lg:w-[100px] h-[50px] lg:h-20 my-[50px] object-cover shadow-md rounded-lg`} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Brands;
