import { useQuery } from "@tanstack/react-query";
import ReviewItem from "./ReviewItem";
import useAxiosSecure from "../hooks/useAxiosSecure";

// 'scholarshipId' prop axcepted
const ScholarshipReviews = ({ scholarshipId }) => {
  const axiosSecure = useAxiosSecure();

  // Fetch Specific Scholarship Reviews
  const {
    data: reviews = [],
    isLoading: isReviewsLoading,
    isError,
  } = useQuery({
    queryKey: ["scholarshipReviews", scholarshipId],
    queryFn: async () => {
      if (!scholarshipId) return [];
      const res = await axiosSecure.get(`/reviews/${scholarshipId}`);
      return res.data;
    },
    // scholarshipId
    enabled: !!scholarshipId,
  });

  /* Loading State */
  if (isReviewsLoading) {
    return (
      <div className="text-center p-10">
        <p className="text-lg font-semibold text-orange-600">
          Loading reviews...
        </p>
        {/* Simple loading indicator */}
        <div className="animate-pulse flex space-x-4 mt-4">
          <div className="rounded-full bg-gray-300 h-12 w-12"></div>
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  /* Error State */
  if (isError) {
    return (
      <div className="text-center p-10 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-lg font-semibold text-red-600">
          Error fetching reviews for this scholarship.
        </p>
        <p className="text-sm text-red-500">Please try refreshing the page.</p>
      </div>
    );
  }

  /* No Reviews State */
  if (reviews.length === 0) {
    return (
      <div className="text-center p-10 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-lg font-semibold text-orange-600">
          No reviews found for this scholarship yet.
        </p>
        <p className="text-sm text-orange-500">
          Be the first one to review it!
        </p>
      </div>
    );
  }

  /* Main Display */
  return (
    <section className="py-8">
      <h2 className="text-3xl font-bold text-gray-800 border-b pb-2 mb-6">
        User Reviews ({reviews.length})
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Render ReviewItem for each */}
        {reviews.map((review, index) => (
          <ReviewItem key={review._id || index} review={review} />
        ))}
      </div>
    </section>
  );
};

export default ScholarshipReviews;
