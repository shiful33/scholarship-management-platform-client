import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ThreeDot } from "react-loading-indicators";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify"; 
import Swal from "sweetalert2";

const MyApplications = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

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
        // Optional: Success message with Swal
        // Swal.fire("Deleted!", "Your application has been deleted.", "success");
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
        📚 My Submitted Applications ({applications.length})
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
                <th>Status</th>
                <th>Application Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app, index) => (
                <tr key={app._id} className="hover:bg-gray-50">
                  <th>{index + 1}</th>
                  <td>
                    {app.scholarshipTitle ||
                      app.scholarshipDetails?.scholarshipName ||
                      "Unknown Scholarship"}
                  </td>
                  <td className="font-semibold text-green-600">
                    ${(app.paidFees || app.applicationFees || 0)}
                  </td>
                  <td>
                    <span
                      className={`badge badge-lg ${
                        app.status === "Pending"
                          ? "badge-warning"
                          : app.status === "Rejected"
                          ? "badge-error"
                          : app.status === "Accepted"
                          ? "badge-success"
                          : "badge-ghost"
                      }`}
                    >
                      {app.status || "Pending"}
                    </span>
                  </td>
                  <td>
                    {app.paymentDate
                      ? new Date(app.paymentDate).toLocaleDateString()
                      : app.appliedDate
                      ? new Date(app.appliedDate).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td>
                    {app.status === "Pending" ? (
                      <button
                        onClick={() => handleDelete(app._id, app.status)}
                        disabled={deleteMutation.isLoading}
                        className="btn btn-error btn-sm text-white hover:bg-red-600"
                      >
                        {deleteMutation.isLoading ? "Deleting..." : "Delete"}
                      </button>
                    ) : (
                      <span className="text-gray-400 text-sm">No Action</span>
                    )}
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

export default MyApplications;
