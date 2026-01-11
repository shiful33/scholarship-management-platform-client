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
    <div className="p-6 transition-all duration-300 border border-gray-100 shadow-lg bg-base-100 rounded-xl hover:shadow-xl h-110">
      {/* Reviewer Info */}
      <div className="flex items-center mb-4">
        <img
          src={review.reviewerImage || defaultImage}
          alt={review.reviewerName || "Reviewer"}
          className="flex-shrink-0 object-cover w-12 h-12 mr-4 border-2 border-orange-400 rounded-full"
        />
        <div>
          {/* Reviewer Name */}
          <p className="font-bold dark:text-gray-800">
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
            <span className="ml-2 text-xs dark:text-gray-500">({rating}/5)</span>
          </div>
        </div>
      </div>

      {/* Comment */}
      <p className="dark:text-gray-700 italic border-l-4 border-teal-400 pl-4 min-h-[60px]">
        "{review.comment || "No comment provided."}"
      </p>

      <p className="mt-3 text-xs text-left text-gray-400">
        Reviewed on: {reviewDate}
      </p>
    </div>
  );
};

export default ReviewItem;
