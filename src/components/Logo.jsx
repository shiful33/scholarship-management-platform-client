import React from "react";
import { SiSemanticscholar } from "react-icons/si";
import { motion } from "framer-motion";


const slideDownVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const Logo = () => {
  return (
    <motion.div
      variants={slideDownVariants}
      initial="hidden" 
      animate="visible"
    >
      <div className="">
        <SiSemanticscholar className="text-4xl text-orange-700 ml-50 mb-[-16px]" />
        <a className="text-3xl font-extrabold text-primary text-eye flex items-center ml-5">
          Scholar<span className="text-secondary">Stream</span>
        </a>
      </div>
    </motion.div>
  );
};

export default Logo;
