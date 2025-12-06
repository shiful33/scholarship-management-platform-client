import { FaSearch, FaFolderOpen, FaAward } from "react-icons/fa";
import { IoIosContacts } from "react-icons/io";

export const cardData = [
  {
    icon: FaSearch,
    title: "Find College Scholarships",
    description: "Get matched to college scholarships tailored to you! Complete your profile, and we will instantly search millions of scholarships to match you with the best opportunities, saving you time and maximizing your chances of success.",
  },
  {
    icon: FaFolderOpen,
    title: "Organize Your Matches",
    description: "Filter your scholarship matches by due date or award amount. Keep track of your favorite scholarships, those you’ve applied to, and those you’ve won. You’ll never miss an opportunity or scholarship deadline!",
  },
  {
    icon: FaAward,
    title: "Apply and Win",
    description: "We’ve created a personalized list of college scholarships just for you! Apply for scholarships you’ve been matched with and make college more affordable.",
  },
  {
    icon: IoIosContacts,
    title: "Communicate With Us",
    description: "Filter your scholarship matches by due date or award amount. Keep track of your favorite scholarships, those you’ve applied to, and those you’ve won. You’ll never miss an opportunity or scholarship deadline!",
  }
];

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