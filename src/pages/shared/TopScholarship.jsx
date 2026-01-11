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
      const res = await axiosSecure.get("/all-scholarships");
      return res.data.slice(0, 6);
    },
  });

  if (isLoading) {
    return (
      <div className="py-20 text-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="mt-4 text-gray-600">Loading top scholarships...</p>
      </div>
    );
  }

  if (!Array.isArray(scholarships) || scholarships.length === 0) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-bold text-primary">
          No Top Scholarships Found.
        </h2>
        <p className="mt-2 text-gray-500">
          Check back later or explore all scholarships.
        </p>
      </div>
    );
  }

  return (
    <div className="py-12 m-4 lg:m-0 bg-base-100 text-base-content">
      <motion.div
        className="px-4 text-left lg:px-0"
        variants={slideInLeftVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <h2 className="mb-4 text-3xl font-extrabold md:text-4xl lg:text-5xl text-primary">
          Top 6<span className="text-eye"> Scholarships Here</span>
        </h2>

        <p className="text-[18px] lg:w-[550px] mb-6 dark:text-white">
          Scholarships.com is a free college scholarship search platform that
          matches you to college scholarships you qualify for.
        </p>

        <Link to="/all-scholarships">
          <button className="px-8 py-3 font-normal transition-all duration-300 bg-transparent border-2 border-orange-600 rounded-lg dark:text-white hover:bg-orange-600 hover:text-white">
            Find Scholarship Now
          </button>
        </Link>
      </motion.div>

      <div className="px-4 mx-auto mt-12 lg:px-0">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {scholarships.map((scholarship) => (
            <motion.div
              key={scholarship._id}
              className="flex flex-col h-full overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-lg rounded-xl hover:shadow-2xl"
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <div className="overflow-hidden bg-gray-200 h-70">
                <img
                  src={scholarship.universityImage}
                  alt={scholarship.universityName}
                  className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
                />
              </div>

              <div className="flex flex-col flex-grow p-6">
                <h3 className="text-xl font-bold text-[#0c5f5a] line-clamp-2">
                  {scholarship.scholarshipName}
                </h3>
                <p className="mt-1 text-lg font-semibold text-gray-700">
                  {scholarship.universityName}
                </p>

                <div className="flex-grow mt-4 space-y-3 text-sm text-gray-600">
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
                    <button
                      className="w-full px-4 py-3 font-semibold text-white transition-all duration-300 transform rounded-lg shadow-md cursor-pointer bg-gradient-to-r from-teal-400 to-orange-200 hover:from-orange-300 hover:to-teal-400 hover:scale-105"
                    >
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
