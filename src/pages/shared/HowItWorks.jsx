import React from "react";
import { cardData } from "./data/cardData";
import { motion } from "framer-motion";
import { containerVariants, itemVariants, slideInLeftVariants } from "./data/variants";


const HowItWorksCard = ({ item, index }) => (
  <motion.div
    key={index}
    variants={itemVariants}
    className="relative hover:bg-teal-600 bg-teal-500 rounded-xl p-6 shadow-xl transition-all duration-300 group"
  >
    <div
      className="absolute -top-5 left-6 w-14 h-14 bg-teal-600 text-white
        flex items-center justify-center rounded-full 
        border-4 border-white shadow-lg glow-pulse
        group-hover:scale-110 group-hover:shadow-teal-500/70 transition-all duration-300"
    >
      <item.icon size={26} />
    </div>

    <div className="mt-8">
      <h3 className="font-bold text-lg text-white group-hover:text-white mt-6">
        {item.title}
      </h3>
      <p className="text-white mt-2 leading-relaxed">{item.description}</p>
    </div>
  </motion.div>
);

const HowItWorks = () => {
  
  return (
    <section className="m-4 lg:m-0 py-16 px-4 max-w-7xl mx-auto">
      
      <motion.div
        variants={slideInLeftVariants}
        initial="hidden"
        whileInView="visible" 
        viewport={{ once: true, amount: 0.5 }}
        className="text-center lg:text-left mb-12"
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 text-primary">
          How<span className="text-eye text-orange-600"> It Works</span>
        </h2>
        <p className="text-[18px] lg:w-[500px] mb-4 mx-auto lg:mx-0 text-gray-600">
          Scholarships.com is a free college scholarship search platform that
          matches you to college scholarships you qualify for.
        </p>
        <button className="font-normal border-2 bg-transparent px-6 py-2 cursor-pointer rounded-lg hover:bg-orange-600 text-[#404040] transition-all duration-300 hover:text-white border-orange-600 mt-4">
          Find Scholarship Now
        </button>
      </motion.div>
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 my-12"
      >
        {cardData.map((item, index) => (
          <HowItWorksCard key={index} item={item} index={index} />
        ))}
      </motion.div>
    </section>
  );
};

export default HowItWorks;