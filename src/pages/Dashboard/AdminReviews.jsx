import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AdminReviews = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: allReviews = [], isLoading } = useQuery({
    queryKey: ["allReviewsAdmin"],
    queryFn: async () => {
      const res = await axiosSecure.get("/latest-reviews");
      return res.data;
    },
  });

  // Review Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      // DELETE /reviews/:id 
      await axiosSecure.delete(`/reviews/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["allReviewsAdmin"]);
      toast.success("Review deleted successfully!");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to delete review.");
    },
  });

  const handleDeleteReview = (reviewId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to permanently delete this review?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(reviewId);
      }
    });
  };

  if (isLoading)
    return <div className="text-center p-10">Loading Reviews...</div>;

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-3xl font-bold text-teal-700 mb-6 border-b pb-2">
        Manage All Reviews ({allReviews.length})
      </h2>

      {allReviews.length === 0 ? (
        <p>No reviews found to manage.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow-xl">
          <table className="table w-full">
            <thead>
              <tr className="bg-teal-600 text-white">
                <th>SL</th>
                <th>Name</th>
                <th>Reviewer</th>
                <th>Rating</th>
                <th>Comment</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {allReviews.map((review, index) => (
                <tr key={review._id} className="hover:bg-red-50/50">
                  <th>{index + 1}</th>
                  <td>{review.reviewerName || "N/A"}</td>
                  <td>
                    {review.reviewerName} ({review.reviewerEmail})
                  </td>
                  <td>{review.rating}/5</td>
                  <td>{review.comment.substring(0, 50)}...</td>
                  <td className="text-center">
                    <button
                      onClick={() => handleDeleteReview(review._id)}
                      className="btn btn-xs btn-error text-white"
                      disabled={deleteMutation.isLoading}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminReviews;
