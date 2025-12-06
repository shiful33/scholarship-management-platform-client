export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 50 }, 
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: {
      duration: 0.6, 
      ease: "easeOut"
    } 
  },
};

export const slideInLeftVariants = {
  hidden: { opacity: 0, x: -100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8, 
      ease: "easeOut",
    },
  },
};