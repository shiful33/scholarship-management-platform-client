import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { FaEye, FaEdit, FaTrashAlt, FaCreditCard, FaStar } from "react-icons/fa";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const MyApplications = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [selectedApp, setSelectedApp] = useState(null); 
  const [reviewApp, setReviewApp] = useState(null);

  const { data: myApplications = [], isLoading, refetch } = useQuery({
    queryKey: ["my-applications", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-applications?email=${user?.email}`);
      return res.data;
    },
  });

 
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const rating = form.rating.value;
    const comment = form.comment.value;

    const reviewData = {
      scholarshipId: reviewApp.scholarshipId, 
      scholarshipName: reviewApp.scholarshipName, 
      universityName: reviewApp.universityName,
      userName: user?.displayName,
      userEmail: user?.email,
      userImage: user?.photoURL,
      rating: parseInt(rating),
      comment: comment,
      reviewDate: new Date().toISOString(),
    };

    try {
      const res = await axiosSecure.post("/reviews", reviewData);
      if (res.data.insertedId) {
        Swal.fire("Success!", "Thank you for your review.", "success");
        document.getElementById("review-modal").close();
        form.reset();
      }
    } catch (error) {
      Swal.fire("Error", "You have already reviewed this!", "error");
    }
  };

  if (isLoading) return <div className="text-center mt-20">Loading...</div>;

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6 text-teal-700">My Applications</h2>
      
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="table w-full">
          <thead className="bg-teal-600 text-white">
            <tr>
              <th>University</th>
              <th>Feedback</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {myApplications.map((app) => (
              <tr key={app._id}>
                <td>
                  <div className="font-bold">{app.universityName}</div>
                  <div className="text-sm opacity-50">{app.universityAddress}</div>
                </td>
                <td className="text-orange-600 italic">{app.feedback || "Pending"}</td>
                <td>
                    <span className={`badge ${app.status === 'completed' ? 'badge-success' : 'badge-warning'}`}>
                        {app.status}
                    </span>
                </td>
                <td className="flex gap-2">
                  <button onClick={() => { setSelectedApp(app); document.getElementById("details-modal").showModal(); }} className="btn btn-xs btn-info"><FaEye /></button>

                  {/* Edit: status pending */}
                  {app.status === "pending" && (
                    <button onClick={() => navigate(`/dashboard/edit-application/${app._id}`)} className="btn btn-xs btn-warning"><FaEdit /></button>
                  )}

                  {/* Pay:  pending & unpaid */}
                  {app.status === "pending" && app.paymentStatus === "unpaid" && (
                    <button className="btn btn-xs btn-success"><FaCreditCard /></button>
                  )}

                  {/* Delete:  pending  */}
                  {app.status === "pending" && (
                    <button className="btn btn-xs btn-error text-white"><FaTrashAlt /></button>
                  )}

                  {/* Add Review: 'completed' */}
                  {app.status === "completed" && (
                    <button 
                      onClick={() => { setReviewApp(app); document.getElementById("review-modal").showModal(); }}
                      className="btn btn-xs bg-orange-500 text-white hover:bg-orange-600"
                    >
                      <FaStar className="mr-1" /> Add Review
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* REVIEW MODAL */}
      <dialog id="review-modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4 text-teal-700">Write a Review for {reviewApp?.universityName}</h3>
          <form onSubmit={handleReviewSubmit}>
            {/* Rating Input */}
            <div className="form-control w-full mb-4">
              <label className="label font-semibold">Rating (1-5 Stars)</label>
              <select name="rating" className="select select-bordered w-full" required>
                <option value="5">5 - Excellent</option>
                <option value="4">4 - Very Good</option>
                <option value="3">3 - Good</option>
                <option value="2">2 - Fair</option>
                <option value="1">1 - Poor</option>
              </select>
            </div>

            {/* Comment Input */}
            <div className="form-control w-full mb-4">
              <label className="label font-semibold">Your Comment</label>
              <textarea 
                name="comment" 
                className="textarea textarea-bordered h-24" 
                placeholder="Share your experience..." 
                required
              ></textarea>
            </div>

            <div className="modal-action">
              <button type="submit" className="btn bg-teal-600 text-white border-none">Submit Review</button>
              <button type="button" className="btn" onClick={() => document.getElementById("review-modal").close()}>Cancel</button>
            </div>
          </form>
        </div>
      </dialog>

      {/* DETAILS MODAL */}
      <dialog id="details-modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Full Application Details</h3>
          {selectedApp && (
              <div className="py-4">
                  <p><strong>Subject Category:</strong> {selectedApp.subjectCategory}</p>
                  <p><strong>Fees:</strong> ${selectedApp.applicationFees}</p>

              </div>
          )}
          <div className="modal-action">
            <button className="btn" onClick={() => document.getElementById("details-modal").close()}>Close</button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default MyApplications;