import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ThreeDot } from "react-loading-indicators";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useState } from "react";
import { FaEye, FaEdit, FaTrashAlt, FaStar, FaMoneyBill } from "react-icons/fa";

const MyApplications = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [selectedApp, setSelectedApp] = useState(null); // Details modal
  const [reviewApp, setReviewApp] = useState(null); // Review modal

  const { data: applications = [], isLoading } = useQuery({
    queryKey: ["my-applications", user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axiosSecure.get(`/dashboard/my-applications?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email && !loading,
  });

  // Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => await axiosSecure.delete(`/applications/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["my-applications"]);
      toast.success("Application deleted!");
    },
    onError: () => toast.error("Failed to delete."),
  });

  // Submit Review Mutation
  const reviewMutation = useMutation({
    mutationFn: async ({ id, rating, comment }) => {
      await axiosSecure.post(`/reviews`, { applicationId: id, rating, comment });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["my-applications"]);
      toast.success("Review submitted!");
      setReviewApp(null);
    },
  });

  // Handle Actions
  const handleDelete = (id, title) => {
    Swal.fire({
      title: "Delete Application?",
      text: `Are you sure you want to delete "${title}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
      confirmButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) deleteMutation.mutate(id);
    });
  };

  const openDetails = (app) => setSelectedApp(app);
  const openReview = (app) => setReviewApp(app);

  if (isLoading || loading) {
    return (
      <div className="h-[60vh] flex justify-center items-center">
        <ThreeDot color="#0c5f5a" />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-2xl font-bold mb-6 text-[#0c5f5a]">My Applications</h2>

      <div className="overflow-x-auto shadow-xl rounded-lg">
        <table className="table w-full">
          <thead className="bg-[#0c5f5a] text-white">
            <tr>
              <th>University Name</th>
              <th>Address</th>
              <th>Feedback</th>
              <th>Category</th>
              <th>Fees</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => {
              const s = app.scholarshipDetails || {};
              const status = app.status?.toLowerCase();
              const isPending = status === "pending";
              const isCompleted = status === "completed";
              const isUnpaid = app.paymentStatus === "unpaid" || !app.paidFees;

              return (
                <tr key={app._id} className="hover:bg-gray-50 border-b">
                  <td className="font-bold">{s.universityName || app.universityName || "N/A"}</td>
                  <td>{s.city && s.country ? `${s.city}, ${s.country}` : "N/A"}</td>
                  <td className="text-red-500 italic">{app.feedback || "No feedback"}</td>
                  <td>{s.scholarshipCategory || "N/A"}</td>
                  <td className="font-bold text-green-700">
                    ${app.paidFees || app.applicationFee || 0}
                  </td>
                  <td>
                    <span
                      className={`badge badge-lg ${
                        isPending ? "badge-warning" : isCompleted ? "badge-success" : "badge-ghost"
                      }`}
                    >
                      {app.status || "Unknown"}
                    </span>
                  </td>
                  <td className="flex flex-wrap gap-2">
                    <button
                      onClick={() => openDetails(app)}
                      className="btn btn-xs btn-info text-white"
                    >
                      <FaEye /> Details
                    </button>

                    {isPending && (
                      <>
                        <button className="btn btn-xs btn-warning">
                          <FaEdit /> Edit
                        </button>
                        {isUnpaid && (
                          <button className="btn btn-xs btn-success text-white">
                            <FaMoneyBill /> Pay
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(app._id, s.scholarshipName || "this")}
                          className="btn btn-xs btn-error text-white"
                          disabled={deleteMutation.isPending}
                        >
                          <FaTrashAlt /> Delete
                        </button>
                      </>
                    )}

                    {isCompleted && (
                      <button
                        onClick={() => openReview(app)}
                        className="btn btn-xs btn-secondary text-white"
                      >
                        Add Review
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Details Modal */}
      {selectedApp && (
        <dialog id="details_modal" className="modal modal-open">
          <div className="modal-box max-w-2xl">
            <h3 className="font-bold text-xl mb-4">Application Details</h3>
            <div className="space-y-3">
              <p><strong>University:</strong> {selectedApp.scholarshipDetails?.universityName || "N/A"}</p>
              <p><strong>Scholarship:</strong> {selectedApp.scholarshipDetails?.scholarshipName || "N/A"}</p>
              <p><strong>Status:</strong> {selectedApp.status}</p>
              <p><strong>Fees Paid:</strong> ${selectedApp.paidFees || 0}</p>
              <p><strong>Applied Date:</strong> {new Date(selectedApp.appliedDate).toLocaleDateString()}</p>
              <p><strong>Feedback:</strong> {selectedApp.feedback || "None"}</p>
            </div>
            <div className="modal-action">
              <button className="btn" onClick={() => setSelectedApp(null)}>Close</button>
            </div>
          </div>
        </dialog>
      )}

      {/* Add Review Modal */}
      {reviewApp && (
        <dialog id="review_modal" className="modal modal-open">
          <div className="modal-box max-w-md">
            <h3 className="font-bold text-xl mb-4">Add Review</h3>
            <div className="space-y-4">
              <div className="flex justify-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    className={`text-3xl cursor-pointer ${
                      star <= (reviewApp.rating || 0) ? "text-yellow-400" : "text-gray-300"
                    }`}
                    onClick={() => setReviewApp({ ...reviewApp, rating: star })}
                  />
                ))}
              </div>
              <textarea
                className="textarea textarea-bordered w-full"
                placeholder="Write your review..."
                value={reviewApp.comment || ""}
                onChange={(e) => setReviewApp({ ...reviewApp, comment: e.target.value })}
                rows={4}
              />
            </div>
            <div className="modal-action">
              <button className="btn btn-secondary" onClick={() => setReviewApp(null)}>Cancel</button>
              <button
                className="btn btn-success text-white"
                onClick={() => {
                  if (!reviewApp.rating) {
                    toast.warning("Please select a rating");
                    return;
                  }
                  reviewMutation.mutate({
                    id: reviewApp._id,
                    rating: reviewApp.rating,
                    comment: reviewApp.comment,
                  });
                }}
                disabled={reviewMutation.isPending}
              >
                {reviewMutation.isPending ? "Submitting..." : "Submit Review"}
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default MyApplications;