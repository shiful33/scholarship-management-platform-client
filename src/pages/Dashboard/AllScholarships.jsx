import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router";

const AllScholarships = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Fetch All Scholarships
  const { data: allScholarships = [], isLoading } = useQuery({
    queryKey: ["allScholarshipsModerator"],
    queryFn: async () => {
      // /moderator/all-scholarships API call
      const res = await axiosSecure.get("/moderator/all-scholarships");
      return res.data;
    },
  });

  // 2. Delete Scholarship Mutation (Moderator/Admin can delete)
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.delete(`/scholarships/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["allScholarshipsModerator"]);
      toast.success("Scholarship deleted successfully!");
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to delete scholarship."
      );
    },
  });

  const handleDelete = (id, title) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to delete the scholarship: "${title}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  const handleEdit = (id) => {
    toast.success(`Navigating to edit form for ID: ${id}`);
    navigate(`/dashboard/updateScholarship/${id}`);
  };

  if (isLoading) {
    return <div className="text-center p-10">Loading All Scholarships...</div>;
  }

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-3xl font-bold text-blue-700 mb-6 border-b pb-2">
        📚 Manage All Scholarships ({allScholarships.length})
      </h2>

      {allScholarships.length === 0 ? (
        <p>No scholarships found yet.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow-xl">
          <table className="table w-full">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th>SL</th>
                <th>Scholarship Title</th>
                <th>University / Country</th>
                <th>Fees ($)</th>
                <th>Deadline</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {allScholarships.map((scholarship, index) => (
                <tr key={scholarship._id} className="hover:bg-blue-50/50">
                  <th>{index + 1}</th>
                  <td>
                    <div className="font-bold">
                      {scholarship.scholarshipName}
                    </div>
                    <div className="text-sm opacity-50">
                      Degree: {scholarship.degree}
                    </div>
                  </td>
                  <td>
                    <div>{scholarship.universityName}</div>
                    <div className="text-sm opacity-50">
                      {scholarship.city}, {scholarship.country}
                    </div>
                  </td>
                  <td>
                    Tuition: ${scholarship.tuitionFee}
                    <br />
                    Service: ${scholarship.serviceFee}
                  </td>
                  <td>
                    {new Date(
                      scholarship.applicationDeadline
                    ).toLocaleDateString()}
                  </td>
                  <td className="text-center space-x-2">
                    {/* Edit Button */}
                    <button
                      onClick={() => handleEdit(scholarship._id)}
                      className="btn btn-xs btn-info text-white"
                    >
                      <FaEdit /> Edit
                    </button>

                    {/* Delete Button */}
                    <button
                      onClick={() =>
                        handleDelete(
                          scholarship._id,
                          scholarship.scholarshipName
                        )
                      }
                      className="btn btn-xs btn-error text-white"
                      disabled={deleteMutation.isLoading}
                    >
                      <FaTrashAlt /> Delete
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

export default AllScholarships;
