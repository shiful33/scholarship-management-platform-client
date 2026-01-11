import React from "react";
import { cardData } from "./data/cardData";
import { motion } from "framer-motion";
import { containerVariants, itemVariants, slideInLeftVariants } from "./data/variants";


const HowItWorksCard = ({ item, index }) => (
  <motion.div
    key={index}
    variants={itemVariants}
    className="relative p-6 transition-all duration-300 bg-teal-500 shadow-xl hover:bg-teal-600 rounded-xl group"
  >
    <div
      className="absolute flex items-center justify-center text-white transition-all duration-300 bg-teal-600 border-4 border-white rounded-full shadow-lg -top-5 left-6 w-14 h-14 glow-pulse group-hover:scale-110 group-hover:shadow-teal-500/70"
    >
      <item.icon size={26} />
    </div>

    <div className="mt-8">
      <h3 className="mt-6 text-lg font-bold text-white group-hover:text-white">
        {item.title}
      </h3>
      <p className="mt-2 leading-relaxed text-white">{item.description}</p>
    </div>
  </motion.div>
);

const HowItWorks = () => {
  
  return (
    <section className="py-16 m-4 lg:m-0 bg-base-100 text-base-content">
      
      <motion.div
        variants={slideInLeftVariants}
        initial="hidden"
        whileInView="visible" 
        viewport={{ once: true, amount: 0.5 }}
        className="mb-12 text-left"
      >
        <h2 className="mb-4 text-3xl font-extrabold md:text-4xl lg:text-5xl text-primary">
          How<span className="text-orange-600 text-eye"> It Works</span>
        </h2>
        <p className="text-[18px] lg:w-[500px] mb-4 mx-auto lg:mx-0  dark:text-white">
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
        className="grid gap-6 my-12 md:grid-cols-2 lg:grid-cols-4"
      >
        {cardData.map((item, index) => (
          <HowItWorksCard key={index} item={item} index={index} />
        ))}
      </motion.div>
    </section>
  );
};

export default HowItWorks;