import React from "react";
import { FaSearch, FaFolderOpen, FaAward } from "react-icons/fa";
import { IoIosContacts } from "react-icons/io";
import { cardData } from "./data/cardData";

const HowItWorks = () => {


  return (
    <div className="m-4 lg:m-0">
        <div className="text-left">
            <h2 className="text-3xl md:text-4xl  lg:text-5xl font-extrabold mb-4 text-primary">How<span className=" text-eye"> It Works</span></h2>
            <p className="text-[18px] lg:w-[500px] mb-4">Scholarships.com is a free college scholarship search platform that matches you to college scholarships you qualify for.</p>
            <button className="font-normal border-2 bg-transparent px-6 py-2 cursor-pointer rounded-lg hover:bg-orange-600 text-[#404040] transition-all duration-300 hover:text-white border-orange-600 mt-4">Find Scholarship Now</button>
        </div>
    <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6 my-15">
      {cardData.map((item, index) => {
        

        return (
          <div
            key={index}
            className="relative hover:bg-teal-600 bg-teal-500 rounded-xl p-6 shadow-xl transition-all duration-300"
          >
            <div className="absolute -top-5 left-6 w-14 h-14 bg-teal-600 text-white
            flex items-center justify-center rounded-full 
            border-4 border-white shadow-lg glow-pulse
            hover:scale-110 hover:shadow-teal-500/70 transition-all duration-300">
              <item.icon size={26} />
            </div>

            <h3 className="font-bold text-lg text-[#212121] mt-6">
              {item.title}
            </h3>
            <p className="text-white mt-2 leading-relaxed">{item.desc}</p>
          </div>
        );
      })}
    </div>
    </div>
  );
};

export default HowItWorks;
