import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Link } from "react-router";
import { ThreeDot } from "react-loading-indicators";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaGraduationCap,
  FaFilter,
  FaMoneyBill,
} from "react-icons/fa";
import { toast } from "react-toastify";
import useAxiosSecure from "../hooks/useAxiosSecure";

const AllScholarships = () => {
  const axiosSecure = useAxiosSecure();
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    subject: "",
    location: "",
  });

  const {
    data: scholarships = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allScholarships", filters, searchQuery],
    queryFn: async () => {
      const params = new URLSearchParams({
        search: searchQuery,
        category: filters.category,
        subject: filters.subject,
        location: filters.location,
      }).toString();

      const res = await axiosSecure.get(`/scholarships/all?${params}`);
      return res.data;
    },
  });

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleResetFilters = () => {
    setFilters({ category: "", subject: "", location: "" });
    setSearchQuery("");
    refetch();
  };

  if (isLoading) {
    return (
      <div className="p-12 text-center flex justify-center items-center h-[70vh]">
        <ThreeDot
          color="#0c5f5a"
          size="medium"
          text="Loading Scholarships..."
          textColor="#0c5f5a"
        />
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-0 mt-25">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-[#0c5f5a]">
        Explore All Scholarships
      </h1>

      {/* Search & Filter */}
      <div className="bg-white p-6 rounded-xl shadow-lg mb-8 border border-gray-100">
        <h3 className="text-xl font-bold mb-4 flex items-center text-gray-700">
          <FaFilter className="mr-2 text-primary" /> Search & Filter Options
        </h3>

        {/* Searchbar */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by Scholarship Name, University, or Degree..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full p-3 pl-10 border border-orange-300 rounded-lg focus:ring-[#0c5f5a] focus:border-[#0c5f5a]"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary" />
          </div>
        </div>

        {/* Filter Dropdown */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Scholarship Category Filter */}
          <select
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            className="p-3 border border-orange-300 rounded-lg bg-white text-sm text-primary font-semibold"
          >
            <option value="">Filter by Category</option>
            <option value="Merit-based">Merit-based</option>
            <option value="Need-based">Need-based</option>
            <option value="Full-tuition">Full-tuition</option>
            <option value="Partial-fund">Partial-fund</option>
          </select>

          {/* Subject Category Filter */}
          <select
            name="subject"
            value={filters.subject}
            onChange={handleFilterChange}
            className="p-3 border border-orange-300 rounded-lg bg-white text-sm text-primary font-semibold"
          >
            <option value="">Filter by Subject</option>
            <option value="Science">Science</option>
            <option value="Arts">Medical</option>
            <option value="Engineering">Engineering</option>
            <option value="Humanities">Humanities</option>
            <option value="Arts">Arts</option>
          </select>

          {/* Location Filter */}
          <select
            name="location"
            value={filters.location}
            onChange={handleFilterChange}
            className="p-3 border border-orange-300 rounded-lg bg-white text-sm text-primary font-semibold"
          >
            <option value="">Filter by Location</option>
            <option value="USA">USA</option>
            <option value="UK">UK</option>
            <option value="Switzerland">Switzerland</option>
            <option value="Australia">Australia</option>
            <option value="Singapore">Singapore</option>
            <option value="Canada">Canada</option>
          </select>

          {/* Reset Button */}
          <button
            onClick={handleResetFilters}
            className="p-3 bg-teal-300 text-white rounded-lg hover:bg-teal-400 transition duration-150 font-semibold cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* Scholarship grid */}
      {scholarships.length === 0 ? (
        <div className="text-center py-20 text-gray-500 text-xl font-semibold">
          No scholarships found matching your criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {scholarships.map((scholarship) => (
            <div
              key={scholarship._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 
              flex flex-col h-full"
            >
              {/* University Image */}
              <div className="h-40 bg-gray-200 overflow-hidden">
                <img
                  src={scholarship.universityImage}
                  alt={scholarship.universityName}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-xl font-extrabold text-[#0c5f5a] mb-2 text-left line-clamp-2">
                  {scholarship.scholarshipName}
                </h2>
                <h3 className="text-lg font-semibold text-gray-700 mb-3 text-left">
                  {scholarship.universityName}
                </h3>

                <div className="space-y-3 text-sm text-gray-600 flex-grow">
                  {/* Scholarship Category */}
                  <p className="flex items-center">
                    <FaGraduationCap className="mr-2 mt-0.5 text-orange-500 flex-shrink-0" />
                    <span className="font-semibold flex-none w-[70px]">
                      Category:
                    </span>
                    {scholarship.scholarshipCategory}
                  </p>

                  {/* Location */}
                  <p className="flex items-center">
                    <FaMapMarkerAlt className="mr-2 mt-0.5 text-blue-500 flex-shrink-0" />
                    <span className="font-semibold flex-none w-[70px]">
                      Location:
                    </span>
                    {scholarship.country}, {scholarship.city}
                  </p>

                  {/* Application Fees */}
                  <p className="flex items-center text-md font-bold">
                    <FaMoneyBill className="mr-2 mt-0.5 text-green-600 flex-shrink-0" />
                    <span className="flex-none w-[70px]">Fees:</span>{" "}
                    {scholarship.applicationFees
                      ? `$${scholarship.applicationFees}`
                      : "Free"}
                  </p>
                </div>

                {/* View Details Button */}
                <div className="mt-6">
                  <Link to={`/scholarship-details/${scholarship._id}`}>
                  <button
                      className="w-full py-3 px-4 bg-gradient-to-r from-teal-400 to-orange-200 text-white font-semibold rounded-lg 
                      hover:from-orange-300 hover:to-teal-400 transform hover:scale-105 transition-all duration-300 
                      shadow-md cursor-pointer"
                    >
                      View Details
                      </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllScholarships;
