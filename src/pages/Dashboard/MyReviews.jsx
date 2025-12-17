import { useNavigate } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { FaEdit, FaTrash } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";


const MyReviews = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const {
    data: myReviews = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["myReviewsUser", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/my-reviews?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.delete(`/reviews/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myReviewsUser"]);
      toast.success("Review deleted successfully!");
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to delete review.");
    },
  });

  const handleDeleteReview = (reviewId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to revert this!",
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

  const handleEdit = (reviewId) => {
    toast.success(`Navigating to edit form...`);

    navigate(`/dashboard/edit-review/${reviewId}`);
  };

  if (isLoading)
    return <div className="text-center p-10">Loading My Reviews...</div>;

  if (isError) {
    console.error(error);
    return (
      <div className="text-center p-10 text-red-600">
        Error loading reviews: {error.message}
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-3xl font-bold text-teal-800 mb-6 border-b pb-2">
        My Submitted Reviews ({myReviews.length})
      </h2>

      {myReviews.length === 0 ? (
        <p className="p-4 bg-yellow-50 border-l-4 border-yellow-500 text-yellow-800">
          You have not submitted any reviews yet.
        </p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow-xl">
          <table className="table w-full">
            <thead>
              <tr className="bg-teal-600 text-white">
                <th>SL</th>
                <th>Reviews Name</th>
                <th>Rating</th>
                <th>Comment</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {myReviews.map((review, index) => (
                <tr key={review._id} className="hover:bg-blue-50/50">
                  <th>{index + 1}</th>
                  <td>{review.reviewerName || "N/A"}</td>
                  <td>{review.rating}/5</td>
                  <td>{review.comment?.substring(0, 70) || "No comment"}...</td>
                  <td>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(review._id)}
                        className="btn btn-xs btn-info text-white" >
                        <FaEdit /> Edit
                      </button>

                      <button
                        onClick={() => handleDeleteReview(review._id)}
                        className="btn btn-xs btn-error text-white"
                        disabled={deleteMutation.isPending}
                      >
                        <FaTrash /> Delete
                      </button>
                    </div>
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

export default MyReviews;
