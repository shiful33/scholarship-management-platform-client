import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useState } from "react";
import { FaTrashAlt, FaSearch } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ManageApplications = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // State for filtering
  const [statusFilter, setStatusFilter] = useState("All");

  // Fetch All Applications for Admin
  const {
    data: allApplications = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["adminAllApplications", statusFilter],

    queryFn: async () => {
      // /admin/all-applications API কল করা
      const res = await axiosSecure.get(
        `/admin/all-applications?status=${statusFilter}`
      );
      return res.data;
    },
  });

  // Application Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.delete(`/applications/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["adminAllApplications"]);
      toast.success("Application permanently deleted!");
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to delete application."
      );
    },
  });

  const handleDeleteApplication = (appId, title) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to delete the application for "${title}"? This cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(appId);
      }
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
        return "badge-success text-white";
      case "Rejected":
        return "badge-error text-white";
      case "Pending":
        return "badge-warning";
      default:
        return "badge-neutral";
    }
  };

  if (isLoading) {
    return (
      <div className="text-center p-10">
        <p className="text-xl font-semibold text-red-600">
          Loading All Applications...
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-3xl font-bold text-red-700 mb-6 border-b pb-2">
        📋 Manage All Applications ({allApplications.length})
      </h2>

      {/* Filter and Search Section */}
      <div className="flex justify-between items-center mb-6 p-4 bg-gray-100 rounded-lg">
        <div className="flex items-center space-x-4">
          <label htmlFor="statusFilter" className="font-semibold text-gray-700">
            Filter by Status:
          </label>
          <select
            id="statusFilter"
            className="select select-bordered w-full max-w-xs"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Application Table */}
      {allApplications.length === 0 ? (
        <div className="text-center p-10 bg-white rounded-lg shadow-xl">
          <p className="text-lg text-gray-600">
            No applications match the current filter.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow-xl">
          <table className="table w-full">
            <thead>
              <tr className="bg-red-500 text-white">
                <th>SL</th>
                <th>Scholarship Title (University)</th>
                <th>Applicant Name / Email</th>
                <th>Status</th>
                <th>Fee</th>
                <th>Applied Date</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {allApplications.map((app, index) => (
                <tr key={app._id} className="hover:bg-red-50/50">
                  <th>{index + 1}</th>
                  <td>
                    <div className="font-bold">
                      {app.scholarshipTitle || "N/A"}
                    </div>
                    <div className="text-sm opacity-50">
                      {app.universityName}
                    </div>
                  </td>
                  <td>
                    <div>{app.applicantName}</div>
                    <div className="text-sm opacity-50">
                      {app.applicantEmail}
                    </div>
                  </td>
                  <td>
                    <span
                      className={`badge ${getStatusColor(
                        app.status
                      )} font-semibold`}
                    >
                      {app.status}
                    </span>
                  </td>
                  <td>${app.applicationFee || 0}</td>
                  <td>{new Date(app.appliedDate).toLocaleDateString()}</td>
                  <td className="text-center">
                    {/* Delete Button */}
                    <button
                      onClick={() =>
                        handleDeleteApplication(app._id, app.scholarshipTitle)
                      }
                      className="btn btn-xs btn-error text-white"
                      disabled={deleteMutation.isLoading}
                    >
                      <FaTrashAlt />
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

export default ManageApplications;
