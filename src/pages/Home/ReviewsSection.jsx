import { useQuery } from "@tanstack/react-query";
import ReviewItem from "../../components/ReviewItem";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ReviewsSection = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: latestReviews = [],
    isLoading: isReviewsLoading,
    isError,
  } = useQuery({
    queryKey: ["latestReviews"],
    queryFn: async () => {
      const res = await axiosSecure.get("/latest-reviews");
      return res.data;
    },
  });

  if (isReviewsLoading) {
    return (
      <div className="text-center p-10">
        <p className="text-lg font-semibold text-teal-600">
          Loading reviews...
        </p>
        <div className="animate-pulse flex space-x-4 mt-4 max-w-lg mx-auto">
          <div className="rounded-full bg-gray-300 h-12 w-12"></div>
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center p-10 bg-red-50 border border-red-200 rounded-lg max-w-xl mx-auto">
        <p className="text-lg font-semibold text-red-600">
          Error fetching reviews.
        </p>
        <p className="text-sm text-red-500">
          Please try refreshing the page or check your connection.
        </p>
      </div>
    );
  }

  if (!Array.isArray(latestReviews) || latestReviews.length === 0) {
    return (
      <div className="text-center p-10 bg-blue-50 border border-blue-200 rounded-lg max-w-xl mx-auto">
        <p className="text-lg font-semibold text-orange-600">
          No reviews found yet.
        </p>
        <p className="text-sm text-orange-500">
          Be the first one to leave a review!
        </p>
      </div>
    );
  }

  return (
    <section className="py-16 shadow-lg rounded-lg bg-white">
      <h2 className="text-4xl font-extrabold text-center text-primary mb-12">
        ✨ Students Reviews
      </h2>

      <div className="mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {latestReviews.map((review, index) => (
          <ReviewItem key={review._id || index} review={review} />
        ))}
      </div>
    </section>
  );
};

export default ReviewsSection;
