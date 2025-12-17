import { useQuery } from "@tanstack/react-query";
import { FaEye, FaCommentDots } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";


const MyApplications = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch User's Applications
  const { data: userApplications = [], isLoading } = useQuery({
    queryKey: ["userApplications", user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      // API call for user
      const res = await axiosSecure.get(
        `/dashboard/my-applications?email=${user.email}`
      );
      return res.data;
    },
    enabled: !!user?.email && !loading,
  });

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

  const handleReview = (application) => {
    if (application.status === "Approved") {
      alert(`Ready to review ${application.scholarshipTitle}!`);
      // To be implemented: Open Review Form (ReviewForm.jsx)
    } else {
      alert(`You can only review approved scholarships.`);
    }
  };

  if (isLoading) {
    return <div className="text-center p-10">Loading My Applications...</div>;
  }

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-3xl font-bold text-orange-600 mb-6 border-b pb-2">
        📋 My Submitted Applications ({userApplications.length})
      </h2>

      {userApplications.length === 0 ? (
        <div className="text-center p-10 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-lg font-semibold text-orange-600">
            You have not applied for any scholarship yet.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Browse our scholarship listings to find your match!
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow-xl">
          <table className="table w-full">
            <thead>
              <tr className="bg-orange-500 text-white">
                <th>SL</th>
                <th>Scholarship (University)</th>
                <th>Applied Date</th>
                <th>Status</th>
                <th>Application Deadline</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {userApplications.map((app, index) => (
                <tr key={app._id} className="hover:bg-orange-50/50">
                  <th>{index + 1}</th>
                  <td>
                    <div className="font-bold">
                      {app.scholarshipTitle || "N/A"}
                    </div>
                    <div className="text-sm opacity-50">
                      {app.universityName}
                    </div>
                  </td>
                  <td>{new Date(app.appliedDate).toLocaleDateString()}</td>
                  <td>
                    <span
                      className={`badge ${getStatusColor(
                        app.status
                      )} font-semibold`}
                    >
                      {app.status}
                    </span>
                  </td>
                  <td>{new Date(app.deadline).toLocaleDateString()}</td>
                  <td className="text-center space-x-2">
                    {/* View Details Button */}
                    <button className="btn btn-xs btn-info text-white">
                      <FaEye /> View Details
                    </button>

                    {/* Review Button */}
                    <button
                      onClick={() => handleReview(app)}
                      className={`btn btn-xs ${
                        app.status === "Approved"
                          ? "btn-warning"
                          : "btn-disabled"
                      } text-white`}
                      disabled={app.status !== "Approved"}
                    >
                      <FaCommentDots /> Review
                    </button>

                    {/* Rejected */}
                    {app.status === "Rejected" && app.feedback && (
                      <button
                        onClick={() =>
                          alert(`Rejection Feedback: ${app.feedback}`)
                        }
                        className="btn btn-xs btn-outline btn-error mt-1"
                      >
                        View Feedback
                      </button>
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
