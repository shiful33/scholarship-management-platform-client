import React from "react";
import { useQuery } from "@tanstack/react-query";
import { FaTrashAlt, FaStar } from "react-icons/fa";
import Swal from "sweetalert2";

import useAxiosSecure from "../../hooks/useAxiosSecure";

const AllReviews = () => {
  const axiosSecure = useAxiosSecure();


  const { data: reviews = [], refetch, isLoading } = useQuery({
    queryKey: ["all-reviews"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-reviews");
      return res.data;
    },
  });


  const handleDeleteReview = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This review will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/review/${id}`);
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire("Deleted!", "Review has been removed.", "success");
          }
        } catch (error) {
          Swal.fire("Error", "Failed to delete review", "error");
        }
      }
    });
  };

  if (isLoading) return <div className="text-center mt-20"><span className="loading loading-spinner loading-lg"></span></div>;

  return (
    <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100">
      <h2 className="text-3xl font-bold mb-8 text-[#0c5f5a] border-b pb-4">
        All Student Reviews ({reviews.length})
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <div key={review._id} className="card bg-gray-50 shadow-sm border p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="avatar">
                  <div className="w-12 rounded-full ring ring-[#0c5f5a] ring-offset-base-100 ring-offset-2">
                    <img src={review.userImage || "https://i.ibb.co/mJR9nkv/user.png"} alt="user" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">{review.userName}</h3>
                  <p className="text-xs text-gray-500">{moment(review.reviewDate).format("MMMM Do YYYY")}</p>
                </div>
              </div>

              <div className="mb-2">
                <h4 className="font-semibold text-teal-700 text-sm italic">{review.scholarshipName}</h4>
              </div>

              <div className="flex text-orange-400 mb-3">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className={i < review.rating ? "text-orange-400" : "text-gray-300"} />
                ))}
              </div>

              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                "{review.comment}"
              </p>
            </div>

            <div className="card-actions justify-end border-t pt-4">
              <button 
                onClick={() => handleDeleteReview(review._id)}
                className="btn btn-error btn-sm text-white gap-2"
              >
                <FaTrashAlt /> Delete Review
              </button>
            </div>
          </div>
        ))}
      </div>

      {reviews.length === 0 && (
        <div className="text-center py-20 text-gray-400 font-medium">
          No reviews found to moderate.
        </div>
      )}
    </div>
  );
};

export default AllReviews;