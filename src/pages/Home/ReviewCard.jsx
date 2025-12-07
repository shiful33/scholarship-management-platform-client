import React from 'react';
import { FaQuoteLeft } from 'react-icons/fa6';

const ReviewCard = ({ review }) => {

    const { id, reviewerName, comment, rating, date, reviewerImage, institutionName
     } = review;

    return (
        <div className=" bg-[#ddfffa] p-6 rounded-xl shadow-xl overflow-hidden transition-all duration-300">
    {/* <p className="mb-4 text-left"><FaQuoteLeft  className="text-[24px] text-primary text-left"/></p> */}
    <div className="flex border-b-1 border-gray-300">
      <img src={reviewerImage} className="w-18 h-16 rounded shadow-xl mr-4" /> 
      <div className="text-info">
        <h4 className="text-[#404040] text-left font-bold">{reviewerName}</h4>
        <p className="text-[#404040] font-semibold text-[14px] text-left">{institutionName}</p>
        <p className="text-[#404040] font-normal text-[14px] text-left mb-3"><span className='font-semibold'>Rating:</span> {rating}</p>
      </div>
      
    </div>
    <div className="scholarship-info mt-2">
        <p className="text-[#404040] text-sm"><span className='font-semibold'>Comment:</span> {comment}</p>
        <p className="text-[#404040] font-normal text-[14px] text-left"><span className='font-semibold'>Date:</span> {date}</p>
    </div>
  </div>
    );
};

export default ReviewCard;