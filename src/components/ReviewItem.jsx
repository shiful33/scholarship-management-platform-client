import { FaStar } from "react-icons/fa";

// Default image for reviewers without a profile picture
const defaultImage = "";

const ReviewItem = ({ review }) => {
  
  const reviewDate = review.reviewDate
    ? new Date(review.reviewDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "N/A";

  // Ensure rating 
  const rating = Math.min(5, Math.max(0, review.rating || 0));

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl">
      {/* Reviewer Info */}
      <div className="flex items-center mb-4">
        <img
          src={review.reviewerImage || defaultImage}
          alt={review.reviewerName || "Reviewer"}
          className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-orange-400 flex-shrink-0"
        />
        <div>
          {/* Reviewer Name */}
          <p className="font-bold text-gray-800">
            {review.reviewerName || "Anonymous User"}
          </p>

          {/* Rating Display */}
          <div className="flex items-center text-yellow-500 text-sm mt-0.5">
            {/* Filled Stars */}
            {Array(rating)
              .fill(0)
              .map((_, i) => (
                <FaStar key={`star_filled_${i}`} className="inline mr-0.5" />
              ))}
            {/* Empty Stars */}
            {Array(5 - rating)
              .fill(0)
              .map((_, i) => (
                <FaStar
                  key={`star_empty_${i}`}
                  className="inline mr-0.5 text-gray-300"
                />
              ))}
            <span className="text-xs text-gray-500 ml-2">({rating}/5)</span>
          </div>
        </div>
      </div>

      {/* Comment */}
      <p className="text-gray-700 italic border-l-4 border-teal-400 pl-4 min-h-[60px]">
        "{review.comment || "No comment provided."}"
      </p>

      <p className="text-xs text-gray-400 mt-3 text-left">
        Reviewed on: {reviewDate}
      </p>
    </div>
  );
};

export default ReviewItem;
