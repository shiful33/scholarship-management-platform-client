import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  FaEye,
  FaCommentDots,
  FaCheckCircle,
  FaTimesCircle,
  FaSpinner,
} from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ManageAppliedApplication = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedApp, setSelectedApp] = useState(null);
  const [feedbackAppId, setFeedbackAppId] = useState("");

  const {
    data: applications = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["manage-applications"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-applications");
      return res.data;
    },
  });

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const res = await axiosSecure.patch(`/application-status/${id}`, {
        status: newStatus,
      });
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire("Updated!", `Status changed to ${newStatus}`, "success");
      }
    } catch (error) {
      Swal.fire("Error", "Failed to update status", "error");
    }
  };

  const handleFeedback = async (e) => {
    e.preventDefault();
    const feedback = e.target.feedback.value;
    try {
      const res = await axiosSecure.patch(
        `/application-feedback/${feedbackAppId}`,
        { feedback }
      );
      if (res.data.modifiedCount > 0) {
        Swal.fire("Submitted!", "Feedback sent to student", "success");
        document.getElementById("feedback-modal").close();
        refetch();
      }
    } catch (error) {
      Swal.fire("Error", "Failed to send feedback", "error");
    }
  };

  if (isLoading)
    return (
      <div className="text-center mt-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-3xl font-bold mb-8 text-[#0c5f5a] border-b pb-4">
        Manage Student Applications
      </h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full shadow-sm border">
          <thead className="bg-[#0c5f5a] text-white">
            <tr>
              <th>Applicant Name</th>
              <th>Applicant Email</th>
              <th>University Name</th>
              <th>Scholarship Name</th>
              <th>Status</th>
              <th>Payment</th>
              <th className="text-center">Actions:Details/Feedback/Status Update/Cancel</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app._id} className="hover:bg-gray-50">
                <td>{app.applicantName}</td>
                <td>{app.applicantEmail}</td>
                <td>{app.universityName}</td>
                <td>{app.scholarshipTitle}</td>
                <td>
                  <span
                    className={`badge font-medium p-3 ${
                      app.status === "Pending"
                        ? "badge-warning"
                        : app.status === "Processing"
                        ? "badge-info text-white"
                        : app.status === "Completed"
                        ? "badge-success text-white"
                        : "badge-error text-white"
                    }`}
                  >
                    {app.status}
                  </span>
                </td>
                <td>
                  <span className="badge badge-outline badge-success">
                    Paid
                  </span>
                </td>
                <td className="flex justify-center gap-2">
                  {/* Details Action */}
                  <button
                    onClick={() => {
                      setSelectedApp(app);
                      document.getElementById("details-modal").showModal();
                    }}
                    className="btn btn-sm btn-circle btn-info text-white"
                    title="Details"
                  >
                    <FaEye />
                  </button>

                  {/* Feedback Action */}
                  <button
                    onClick={() => {
                      setFeedbackAppId(app._id);
                      document.getElementById("feedback-modal").showModal();
                    }}
                    className="btn btn-sm btn-circle btn-warning text-white"
                    title="Feedback"
                  >
                    <FaCommentDots />
                  </button>

                  {/* Status Dropdown */}
                  <div className="dropdown dropdown-end">
                    <label
                      tabIndex={0}
                      className="btn btn-sm btn-accent text-white"
                    >
                      Status
                    </label>
                    <ul
                      tabIndex={0}
                      className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-40"
                    >
                      <li>
                        <a
                          onClick={() =>
                            handleUpdateStatus(app._id, "Processing")
                          }
                        >
                          <FaSpinner className="text-blue-500" /> Processing
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={() =>
                            handleUpdateStatus(app._id, "Completed")
                          }
                        >
                          <FaCheckCircle className="text-green-500" /> Completed
                        </a>
                      </li>
                    </ul>
                  </div>

                  {/* Cancel Action */}
                  <button
                    onClick={() => handleUpdateStatus(app._id, "Rejected")}
                    className="btn btn-sm btn-circle btn-error text-white"
                    title="Cancel/Reject"
                  >
                    <FaTimesCircle />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <dialog id="details-modal" className="modal">
        <div className="modal-box w-11/12 max-w-2xl">
          <h3 className="font-bold text-xl mb-4 text-[#0c5f5a]">
            Full Application Details
          </h3>
          {selectedApp && (
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="p-2 bg-gray-50 rounded">
                <strong>University Name:</strong> {selectedApp.universityName}
              </div>
              <div className="p-2 bg-gray-50 rounded">
                <strong>Scholarship Title:</strong> {selectedApp.scholarshipTitle}
              </div>
              <div className="p-2 bg-gray-50 rounded">
                <strong>Applicant Name:</strong> {selectedApp.applicantName}
              </div>
              <div className="p-2 bg-gray-50 rounded">
                <strong>Transaction Id:</strong> {selectedApp.transactionId}
              </div>
              <div className="p-2 bg-gray-50 rounded col-span-2">
                <strong>Applicant User:</strong> {selectedApp.applicantEmail || "N/A"}
              </div>
              <div className="p-2 bg-gray-50 rounded">
                <strong>Paid Fees:</strong> ${selectedApp.paidFees}
              </div>
              <div className="p-2 bg-gray-50 rounded">
                <strong>Applied Date:</strong> {selectedApp.appliedDate}
              </div>
            </div>
          )}
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>

      <dialog id="feedback-modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Write Application Feedback</h3>
          <form onSubmit={handleFeedback}>
            <textarea
              name="feedback"
              className="textarea textarea-bordered w-full h-32"
              placeholder="Provide reason for status change or extra info..."
              required
            ></textarea>
            <div className="modal-action">
              <button type="submit" className="btn btn-success text-white">
                Submit Feedback
              </button>
              <button
                type="button"
                className="btn"
                onClick={() =>
                  document.getElementById("feedback-modal").close()
                }
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default ManageAppliedApplication;
