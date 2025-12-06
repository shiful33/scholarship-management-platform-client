import React from 'react';
import { topScholarships } from './data/topScholarshipsData';

const TopScholarship = () => {
    return (

        <div className="m-4 lg:m-0">
        <div className="text-left mt-[100px]">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 text-primary">Top 6<span className=" text-eye"> Scholarships Here</span></h2>
            <p className="text-[18px] lg:w-[500px] mb-4">Scholarships.com is a free college scholarship search platform that matches you to college scholarships you qualify for.</p>
            <button className="font-normal border-2 bg-transparent px-6 py-2 cursor-pointer rounded-lg hover:bg-orange-600 text-[#404040] transition-all duration-300 hover:text-white border-orange-600 mt-4">Find Scholarship Now</button>
        </div>
        <div className="grid md:grid-cols-3 gap-8 mt-15">
      {topScholarships.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-xl shadow-md hover:shadow-xl overflow-hidden transition-all duration-300"
        >
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-48 object-cover"
          />

          <div className="p-5 text-left">
            <h3 className="font-bold text-lg text-gray-900">
              {item.title}
            </h3>

            <p className="text-[#404040] mt-2 text-md leading-relaxed">
              {item.description}
            </p>

            <div className="mt-4">
              <button className="px-4 py-2 border border-teal-600 text-teal-700 font-semibold rounded-lg hover:bg-teal-600 hover:text-white transition-all duration-300 cursor-pointer">
                View Details
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};


export default TopScholarship;