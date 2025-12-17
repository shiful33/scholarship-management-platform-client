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

  const { data: rawData, isLoading, isError, error } = useQuery({
    queryKey: ["allScholarships"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-scholarships");
       
      return res.data;
    },
  });


  const scholarships = Array.isArray(rawData) ? rawData : [];


  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.delete(`/scholarships/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["all-scholarships"]);
      toast.success("Scholarship deleted!");
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Delete failed");
    }
  });

  const handleDelete = (id, title) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Delete: ${title}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) deleteMutation.mutate(id);
    });
  };

 
  if (isLoading) return <div className="text-center p-20 text-2xl">Loading...</div>;
  
  if (isError) return <div className="text-center p-20 text-red-500">Error: {error.message}</div>;

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-3xl font-bold text-blue-700 mb-6 border-b pb-2">
         Manage Scholarships ({scholarships.length})
      </h2>

      <div className="overflow-x-auto bg-white rounded-lg shadow-xl">
        <table className="table w-full">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th>SL</th>
              <th>Scholarship Title</th>
              <th>University</th>
              <th>Deadline</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {scholarships.length > 0 ? (
              scholarships.map((item, index) => (
                <tr key={item._id || index} className="hover:bg-blue-50">
                  <th>{index + 1}</th>
                  <td>
                    <div className="font-bold">{item.scholarshipName || "N/A"}</div>
                    <div className="text-xs opacity-50">{item.degree}</div>
                  </td>
                  <td>{item.universityName}</td>
                  <td>{item.applicationDeadline ? new Date(item.applicationDeadline).toLocaleDateString() : "No Date"}</td>
                  <td className="text-center space-x-2">
                    <button 
                      onClick={() => navigate(`/dashboard/updateScholarship/${item._id}`)}
                      className="btn btn-xs btn-info text-white"
                    >
                      <FaEdit />
                    </button>
                    <button 
                      onClick={() => handleDelete(item._id, item.scholarshipName)}
                      className="btn btn-xs btn-error text-white"
                      disabled={deleteMutation.isLoading}
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-10 text-gray-500">
                  No scholarships found. Please check API response.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllScholarships;