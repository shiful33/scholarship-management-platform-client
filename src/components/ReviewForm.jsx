import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";

const ReviewForm = ({ scholarshipId, scholarshipTitle }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          onClick={() => setRating(i)}
          className={`cursor-pointer text-2xl transition-colors duration-150 ${
            i <= rating
              ? "text-yellow-500"
              : "text-gray-300 hover:text-yellow-400"
          }`}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  // Review Submission Mutation
  const submitReviewMutation = useMutation({
    mutationFn: async (reviewData) => {
      const res = await axiosSecure.post("/reviews", reviewData);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Thank you for your valuable feedback!");

      queryClient.invalidateQueries(["scholarshipReviews", scholarshipId]);

      setRating(0);
      setComment("");
    },
    onError: (error) => {
      console.error("Review Submission Error:", error);
      const errorMessage =
        error.response?.data?.message ||
        "Could not submit review. Please try again.";
      toast.error(errorMessage);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please log in to submit a review.");
      return;
    }

    if (rating === 0) {
      toast.warn("Please give a rating before submitting.");
      return;
    }

    const reviewData = {
      scholarshipId,
      scholarshipTitle,
      reviewerName: user.displayName || "Anonymous User",
      reviewerEmail: user.email,
      reviewerPhoto: user.photoURL || null,
      rating: rating,
      comment: comment.trim(),
    };

    submitReviewMutation.mutate(reviewData);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
      <h3 className="text-2xl font-bold mb-4 text-orange-600 border-b pb-2">
        Your Review
      </h3>

      <form onSubmit={handleSubmit}>
        {/* Rating Input */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Your Rating (1-5)
          </label>
          <div className="flex space-x-1">{renderStars()}</div>
          <p className="text-sm text-gray-500 mt-1">
            Selected Rating: {rating} stars
          </p>
        </div>

        {/* Comment Input */}
        <div className="mb-4">
          <label
            htmlFor="comment"
            className="block text-gray-700 font-medium mb-2"
          >
            Your Comment
          </label>
          <textarea
            id="comment"
            rows="3"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Tell us about your experience..."
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition duration-300 disabled:bg-gray-400"
          disabled={submitReviewMutation.isLoading || rating === 0 || !user}
        >
          {submitReviewMutation.isLoading ? "Submitting..." : "Submit Review"}
        </button>
        {!user && (
          <p className="text-red-500 text-sm mt-2 text-center">
            Please log in to submit a review.
          </p>
        )}
      </form>
    </div>
  );
};

export default ReviewForm;
