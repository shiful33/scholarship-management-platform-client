import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { slideInLeftVariants } from "./data/variants";

import { ThreeDot } from "react-loading-indicators";
import { FaGraduationCap, FaMapMarkerAlt, FaMoneyBill } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const TopScholarship = () => {
  const axiosSecure = useAxiosSecure();

  const { data: scholarships = [], isLoading } = useQuery({
    queryKey: ["topScholarships"],
    queryFn: async () => {
      const res = await axiosSecure.get("/scholarships/all");
      return res.data.slice(0, 6);
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <ThreeDot color="#0c5f5a" size="medium" />
      </div>
    );
  }

  return (
    <div className="m-4 lg:m-0 py-12">
      <motion.div
        className="text-left px-4 lg:px-0"
        variants={slideInLeftVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 text-primary">
          Top 6<span className="text-eye"> Scholarships Here</span>
        </h2>
        <p className="text-[18px] lg:w-[550px] mb-6 text-gray-600">
          Scholarships.com is a free college scholarship search platform that
          matches you to college scholarships you qualify for.
        </p>
        <Link to="/all-scholarships">
          <button className="font-normal border-2 bg-transparent px-8 py-3 rounded-lg hover:bg-orange-600 text-[#404040] transition-all duration-300 hover:text-white border-orange-600">
            Find Scholarship Now
          </button>
        </Link>
      </motion.div>

      {/* Top 6 Cards Grid */}
      <div className=" mx-auto px-4 lg:px-0 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {scholarships.map((scholarship) => (
            <motion.div
              key={scholarship._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col h-full"
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
            >
              {/* Image */}
              <div className="h-48 bg-gray-200 overflow-hidden">
                <img
                  src={scholarship.universityImage}
                  alt={scholarship.universityName}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-[#0c5f5a] line-clamp-2">
                  {scholarship.scholarshipName}
                </h3>
                <p className="text-lg font-semibold text-gray-700 mt-1">
                  {scholarship.universityName}
                </p>

                <div className="mt-4 space-y-3 text-sm text-gray-600 flex-grow">
                  <p className="flex items-center">
                    <FaGraduationCap className="mr-3 text-orange-500" />
                    <span className="font-medium">Category:</span>
                    <span className="ml-2">
                      {scholarship.scholarshipCategory}
                    </span>
                  </p>

                  <p className="flex items-center">
                    <FaMapMarkerAlt className="mr-3 text-blue-500" />
                    <span className="font-medium">Location:</span>
                    <span className="ml-2">
                      {scholarship.city}, {scholarship.country}
                    </span>
                  </p>

                  <p className="flex items-center font-bold text-green-600">
                    <FaMoneyBill className="mr-3" />
                    Fees:{" "}
                    {scholarship.applicationFees
                      ? `$${scholarship.applicationFees}`
                      : "Free"}
                  </p>
                </div>

                <div className="mt-6">
                  <Link to={`/scholarship-details/${scholarship._id}`}>
                    <button className="w-full py-3 px-4 bg-gradient-to-r from-teal-400 to-orange-200 text-white font-semibold rounded-lg 
                      hover:from-orange-300 hover:to-teal-400 transform hover:scale-105 transition-all duration-300 
                      shadow-md cursor-pointer">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopScholarship;
