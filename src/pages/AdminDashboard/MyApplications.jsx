import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ThreeDot } from "react-loading-indicators";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const MyApplications = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    data: applications = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["my-applications", user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axiosSecure.get(
        `/dashboard/my-applications?email=${user.email}`
      );
      return res.data;
    },
    enabled: !!user?.email && !loading,
  });

  // Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: async (applicationId) => {
      await axiosSecure.delete(`/applications/${applicationId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["my-applications", user?.email]);
      toast.success("Application deleted successfully!");
    },
    onError: (error) => {
      toast.error("Failed to delete application.");
      console.error(error);
    },
  });

  // Action Handlers
  const handleDetails = (app) => {
    console.log("Details clicked for:", app._id);
    Swal.fire({
      title: "Application Details",
      html: `
            <p>Scholarship: <strong>${
              app.scholarshipTitle || "N/A"
            }</strong></p>
            <p>Fees Paid: <strong>$${(app.paidFees || 0).toFixed(
              2
            )}</strong></p>
            <p>Status: <strong>${app.status}</strong></p>
            <p>Transaction ID: <strong>${
              app.transactionId || "N/A"
            }</strong></p>
        `,
      icon: "info",
      confirmButtonText: "Close",
    });
  };

  const handleEdit = (app) => {
    console.log("Edit clicked for:", app._id);

    toast.info("Edit functionality coming soon!");
  };

  const handlePay = (app) => {
    console.log("Pay clicked for:", app._id);

    navigate(`/checkout/${app._id}`, {
      state: {
        applicationId: app._id,
        fees: app.paidFees || 0,
      },
    });
  };

  // Handle Review
  const handleAddReview = (app) => {
    Swal.fire({
      title: "Share Your Experience",
      html: `
        <div style="text-align: left;">
          <label style="display: block; margin-bottom: 10px; font-weight: bold;">Rate your experience:</label>
          <div class="star-rating" style="display: flex; flex-direction: row-reverse; justify-content: flex-end; gap: 10px; margin-bottom: 20px;">
            <input type="radio" id="star5" name="rating" value="5" style="display:none;"/><label for="star5" style="cursor:pointer; font-size:30px; color:#ccc;">★</label>
            <input type="radio" id="star4" name="rating" value="4" style="display:none;"/><label for="star4" style="cursor:pointer; font-size:30px; color:#ccc;">★</label>
            <input type="radio" id="star3" name="rating" value="3" style="display:none;"/><label for="star3" style="cursor:pointer; font-size:30px; color:#ccc;">★</label>
            <input type="radio" id="star2" name="rating" value="2" style="display:none;"/><label for="star2" style="cursor:pointer; font-size:30px; color:#ccc;">★</label>
            <input type="radio" id="star1" name="rating" value="1" style="display:none;"/><label for="star1" style="cursor:pointer; font-size:30px; color:#ccc;">★</label>
          </div>
          
          <label style="display: block; margin-bottom: 5px; font-weight: bold;">Your Feedback:</label>
          <textarea id="swal-input-comment" class="swal2-textarea" placeholder="Tell us more about the scholarship..." style="width: 100%; height: 100px; margin: 0;"></textarea>
        </div>
        <style>
          .star-rating label:hover,
          .star-rating label:hover ~ label,
          .star-rating input:checked ~ label { color: #f39c12 !important; }
        </style>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Submit Review",
      confirmButtonColor: "#0c5f5a",
      preConfirm: () => {
        const rating = document.querySelector(
          'input[name="rating"]:checked'
        )?.value;
        const comment = document.getElementById("swal-input-comment").value;

        if (!rating) {
          Swal.showValidationMessage("Please select a star rating");
          return false;
        }
        if (!comment) {
          Swal.showValidationMessage("Please write a comment");
          return false;
        }

        return { rating: parseInt(rating), comment: comment };
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const reviewData = {
            scholarshipId: app.scholarshipId || app._id,
            universityName: app.universityName,
            scholarshipName: app.scholarshipTitle,
            userName: user?.displayName,
            userEmail: user?.email,
            userImage: user?.photoURL,
            rating: result.value.rating,
            comment: result.value.comment,
            reviewDate: new Date().toISOString(),
          };

          const res = await axiosSecure.post("/reviews", reviewData);
          if (res.data.insertedId) {
            Swal.fire("Success!", "Review submitted successfully!", "success");
          }
        } catch (error) {
          Swal.fire("Error", "Failed to submit review. Try again.", "error");
        }
      }
    });
  };

  // Handle Delete
  const handleDelete = (applicationId, status) => {
    if (status !== "Pending") {
      toast.warning("Only Pending applications can be deleted.");
      return;
    }

    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this application?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(applicationId);
      }
    });
  };

  if (isLoading || loading) {
    return (
      <div className="p-12 text-center flex justify-center items-center h-[70vh]">
        <ThreeDot
          color="#0c5f5a"
          size="medium"
          text="Loading..."
          textColor="#0c5f5a"
        />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-12 text-center text-lg font-semibold text-red-600 h-[70vh]">
        Error loading your applications.
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-3xl font-bold text-[#0c5f5a] mb-6 border-b pb-2">
        My Submitted Applications ({applications.length})
      </h2>

      {applications.length === 0 ? (
        <div className="text-center p-10 bg-gray-50 rounded-lg shadow-inner">
          <p className="text-lg text-gray-600">
            You have not submitted any scholarship applications yet.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow-xl">
          <table className="table w-full">
            <thead>
              <tr className="bg-teal-500 text-white">
                <th>SL</th>
                <th>Scholarship Name</th>
                <th>Paid Fees</th>
                <th>Paid/Unpaid</th>
                <th>Processing</th>
                <th>Application Date</th>
                <th>Action: Details/Pay Now/Edit/Delete</th>
                <th>Add Review</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app, index) => {
              
                const currentStatus = app.status?.toLowerCase();
                const isPending = currentStatus === "pending";
                const isCompleted = currentStatus === "completed";
                const isPaid = app.paymentStatus?.toLowerCase() === "paid";

                const applicationFee = app.paidFees || app.applicationFees || 0;

                return (
                  <tr key={app._id} className="hover:bg-gray-50">
                    <th>{index + 1}</th>
                    <td>{app.scholarshipTitle || "Unknown Scholarship"}</td>
                    <td className="font-semibold text-green-600">
                      ${applicationFee.toFixed(2)}
                    </td>

                    {/* PAYMENT STATUS */}
                    <td>
                      <span
                        className={`badge badge-sm ${
                          isPaid
                            ? "badge-success text-white"
                            : "badge-warning text-gray-800"
                        }`}
                      >
                        {isPaid ? "Paid" : "Unpaid"}
                      </span>
                    </td>

                    {/* APPLICATION STATUS */}
                    <td>
                      <span
                        className={`badge badge-lg ${
                          isPending
                            ? "badge-info"
                            : isCompleted
                            ? "badge-success"
                            : "badge-error"
                        } text-white`}
                      >
                        {app.status || "Pending"}
                      </span>
                    </td>

                    <td>{new Date(app.appliedDate).toLocaleDateString()}</td>

                    <td>
                      <div className="flex flex-wrap gap-2">
                        {/* Details Button */}
                        <button
                          onClick={() => handleDetails(app)}
                          className="btn btn-xs btn-outline btn-info"
                        >
                          Details
                        </button>

                        {/* Paid/Unpaid Button */}
                        {isPending && !isPaid && (
                          <button
                            onClick={() => handlePay(app)}
                            className="btn btn-xs btn-success text-white"
                          >
                            Pay Now
                          </button>
                        )}

                        {/* Edit & Delete */}
                        {isPending && (
                          <>
                            <button
                              onClick={() => handleEdit(app)}
                              className="btn btn-xs btn-warning"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(app._id, app.status)}
                              disabled={deleteMutation.isLoading}
                              className="btn btn-xs btn-error text-white"
                            >
                              {deleteMutation.isLoading ? "..." : "Delete"}
                            </button>
                          </>
                        )}

                        {/* Add Review Button */}
                        {isCompleted && (
                          <button
                            onClick={() => handleAddReview(app)}
                            className="btn btn-xs btn-secondary text-white"
                          >
                            Add Review
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyApplications;
