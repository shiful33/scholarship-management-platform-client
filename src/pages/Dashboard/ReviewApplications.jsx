import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ReviewApplications = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch Pending Applications
  const { data: pendingApps = [], isLoading } = useQuery({
    queryKey: ["pendingApplicationsModerator"],
    queryFn: async () => {
      const res = await axiosSecure.get("/moderator/pending-applications");
      return res.data;
    },
  });

  // Status Update Mutation
  const statusUpdateMutation = useMutation({
    mutationFn: async ({ id, status, feedback }) => {
      const res = await axiosSecure.patch(`/applications/status/${id}`, {
        status,
        feedback,
      });
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["pendingApplicationsModerator"]);
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update status.");
    },
  });

  // Status Change Handle
  const handleStatusChange = async (id, title, newStatus) => {
    let feedback = "";

    if (newStatus === "Rejected") {
      const { value: text } = await Swal.fire({
        title: `Rejecting Application for ${title}`,
        input: "textarea",
        inputLabel: "Rejection Feedback (Required)",
        inputPlaceholder: "Enter reason for rejection...",
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) {
            return "You need to write a reason to reject!";
          }
        },
      });

      if (text) {
        feedback = text;
      } else {
        return;
      }
    }

    statusUpdateMutation.mutate({ id, status: newStatus, feedback });
  };

  if (isLoading) {
    return (
      <div className="text-center p-10">Loading Pending Applications...</div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-3xl font-bold text-blue-700 mb-6 border-b pb-2">
        Review Pending Applications ({pendingApps.length})
      </h2>

      {pendingApps.length === 0 ? (
        <div className="text-center p-10 bg-green-50 rounded-lg shadow-md">
          <p className="text-lg font-semibold text-green-600">
            No applications pending review at the moment.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow-xl">
          <table className="table w-full">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th>SL</th>
                <th>Scholarship (University)</th>
                <th>Applicant Details</th>
                <th>Applied Date</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {pendingApps.map((app, index) => (
                <tr key={app._id} className="hover:bg-blue-50/50">
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
                    {/* applicantAddress  */}
                  </td>
                  <td>{new Date(app.appliedDate).toLocaleDateString()}</td>
                  <td className="text-center space-x-2">
                    {/* Approve Button */}
                    <button
                      onClick={() =>
                        handleStatusChange(
                          app._id,
                          app.scholarshipTitle,
                          "Approved"
                        )
                      }
                      className="btn btn-xs btn-success text-white"
                      disabled={statusUpdateMutation.isLoading}
                    >
                      Approve
                    </button>

                    {/* Reject Button */}
                    <button
                      onClick={() =>
                        handleStatusChange(
                          app._id,
                          app.scholarshipTitle,
                          "Rejected"
                        )
                      }
                      className="btn btn-xs btn-error text-white"
                      disabled={statusUpdateMutation.isLoading}
                    >
                      Reject
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

export default ReviewApplications;
