import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import { FaSave } from "react-icons/fa";

const EditReview = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    data: reviewData = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["singleReview", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews/single/${id}`);
      return res.data;
    },
    enabled: !!id,
  });


  const updateMutation = useMutation({
    mutationFn: async (updatedData) => {
      const res = await axiosSecure.patch(`/reviews/${id}`, updatedData);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Review updated successfully! ✨");

      queryClient.invalidateQueries({ queryKey: ["myReviewsUser"] });
      queryClient.invalidateQueries({ queryKey: ["singleReview", id] });

      navigate("/dashboard/my-reviews");
    },
    onError: (error) => {
      console.error("Review Update Error:", error);
      const message =
        error.response?.data?.message || "Failed to update review.";
      toast.error(message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedReview = {
      rating: parseFloat(form.rating.value),
      comment: form.comment.value,
    };

    if (updatedReview.rating < 1 || updatedReview.rating > 5) {
      return toast.error("Rating must be between 1 and 5.");
    }

    updateMutation.mutate(updatedReview);
  };

  if (isLoading) {
    return (
      <div className="text-center p-20 text-teal-600 font-bold">
        Loading review data...
      </div>
    );
  }

  if (isError || !reviewData?._id) {
    return (
      <div className="text-center p-20 text-red-600 font-semibold">
        Review not found or invalid ID. ❌
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-teal-800 mb-8 border-b-4 border-teal-800 pb-3">
        Edit Your Review
      </h2>

      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-lg border">
        
        <div className="mb-6 p-4 border rounded-lg bg-teal-50">
          <p className="text-lg font-semibold text-teal-800">
            Scholarship: {reviewData.scholarshipTitle || "N/A"}
          </p>
          <p className="text-sm text-gray-600 italic">
            Reviewer: {reviewData.reviewerName} ({reviewData.reviewerEmail})
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Rating Input */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text text-gray-700 font-bold">
                Rating (1-5)
              </span>
            </label>
            <input
              type="number"
              name="rating"
              className="input input-bordered w-full focus:outline-teal-600"
              defaultValue={reviewData.rating}
              min="1"
              max="5"
              step="0.1"
              required
            />
          </div>

          {/* Comment Textarea */}
          <div className="form-control mb-6">
            <label className="label">
              <span className="label-text text-gray-700 font-bold">
                Your Comment
              </span>
            </label>
            <textarea
              name="comment"
              className="textarea textarea-bordered w-full h-32 focus:outline-teal-600"
              defaultValue={reviewData.comment}
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="btn w-full bg-teal-600 hover:bg-teal-700 text-white text-lg flex items-center gap-2"
              disabled={updateMutation.isPending}
            >
              {updateMutation.isPending ? (
                <span className="loading loading-spinner"></span>
              ) : (
                <FaSave />
              )}
              {updateMutation.isPending
                ? "Saving Changes..."
                : "Save Updated Review"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditReview;
