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
    onSuccess: (data) => {
      toast.success(data.message || "Review updated successfully!");

      queryClient.invalidateQueries(["myReviewsUser"]);
      queryClient.invalidateQueries(["singleReview", id]);
      navigate("/dashboard/my-reviews");
    },
    onError: (error) => {
      console.error("Review Update Error:", error);
      toast.error(error.response?.data?.message || "Failed to update review.");
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
    return <div className="text-center p-10">Loading review data...</div>;
  }

  if (isError || !reviewData._id) {
    return (
      <div className="text-center p-10 text-red-600">
        Review not found or invalid ID.
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-green-600 mb-8 border-b-4 border-green-500 pb-3">
        ✏️ Edit Your Review
      </h2>

      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        {/* Review Context Card */}
        <div className="mb-6 p-4 border rounded-lg bg-green-50">
          <p className="text-lg font-semibold text-green-800">
            Scholarship: {reviewData.scholarshipTitle || "N/A"}
          </p>
          <p className="text-sm text-gray-600">
            Reviewer: {reviewData.reviewerName} ({reviewData.reviewerEmail})
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Rating Input */}
          <div className="mb-4">
            <label className="label">
              <span className="label-text font-semibold">Rating (1-5)</span>
            </label>
            <input
              type="number"
              name="rating"
              className="input input-bordered w-full"
              defaultValue={reviewData.rating || 1}
              min="1"
              max="5"
              step="0.1"
              required
            />
          </div>

          {/* Comment Textarea */}
          <div className="mb-6">
            <label className="label">
              <span className="label-text font-semibold">Your Comment</span>
            </label>
            <textarea
              name="comment"
              className="textarea textarea-bordered w-full h-32"
              defaultValue={reviewData.comment || ""}
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="btn w-full bg-green-600 border-none hover:bg-green-700 text-white text-lg"
              disabled={updateMutation.isLoading}
            >
              <FaSave />
              {updateMutation.isLoading
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
