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

  const { data: applications = [], isLoading } = useQuery({
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

  const deleteMutation = useMutation({
    mutationFn: async (id) => await axiosSecure.delete(`/applications/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["my-applications"]);
      toast.success("Application deleted!");
    },
  });

  if (isLoading || loading)
    return (
      <div className="h-[60vh] flex justify-center items-center">
        <ThreeDot color="#0c5f5a" />
      </div>
    );

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-2xl font-bold mb-6 text-[#0c5f5a]">
        My Applications
      </h2>
      <div className="overflow-x-auto shadow-xl rounded-lg">
        <table className="table w-full">
          <thead className="bg-[#0c5f5a] text-white">
            <tr>
              <th>University Name</th>
              <th>University Address Address</th>
              <th>Subject Category</th>
              <th>Application Fees</th>
              <th>Application Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => {
              const s = app.scholarshipDetails || {};
              const status = app.status?.toLowerCase();
              const isPending = status === "pending";
              const isCompleted = status === "completed";

              return (
                <tr key={app._id} className="hover:bg-gray-50 border-b">
                  <td className="font-bold">{app.universityName}</td>
                  <td>{s.universityCountry || s.country || "N/A"}</td>
                  {/* <td className="text-red-500 italic">
                    {app.feedback || "No feedback"}
                  </td> */}
                  <td>{s.subjectCategory || "N/A"}</td>
                  <td className="font-bold text-green-700">
                    ${app.paidFees || 0}
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        isPending
                          ? "badge-warning"
                          : isCompleted
                          ? "badge-success"
                          : "badge-ghost"
                      }`}
                    >
                      {app.status}
                    </span>
                  </td>
                  <td>
                    <div className="flex flex-wrap gap-2">
                      <button className="btn btn-xs btn-info text-white">
                        Details
                      </button>

                      {isPending && (
                        <>
                          <button
                            onClick={() =>
                              navigate(`/dashboard/edit-application/${app._id}`)
                            }
                            className="btn btn-xs btn-warning"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() =>
                              navigate(`/dashboard/payment/${app._id}`)
                            }
                            className="btn btn-xs btn-success text-white"
                          >
                            Pay
                          </button>
                          <button
                            onClick={() => deleteMutation.mutate(app._id)}
                            className="btn btn-xs btn-error text-white"
                          >
                            Delete
                          </button>
                        </>
                      )}

                      {isCompleted && (
                        <button className="btn btn-xs btn-secondary text-white">
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
    </div>
  );
};

export default MyApplications;
