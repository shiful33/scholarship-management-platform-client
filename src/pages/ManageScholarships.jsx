import React from "react";
import { useQuery } from "@tanstack/react-query";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";

const ManageScholarships = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: scholarships = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["manage-scholarships"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-scholarships");
      return res.data;
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This scholarship will be removed from the platform!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          console.log("Attempting to delete ID:", id);

          const res = await axiosSecure.delete(`/all-scholarship/${id}`);

          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire("Deleted!", "Scholarship has been removed.", "success");
          } else {
            Swal.fire("Error", "No scholarship found with this ID.", "error");
          }
        } catch (error) {
          console.error("Delete Error details:", error.response || error);
          Swal.fire("Error", `Could not delete: ${error.message}`, "error");
        }
      }
    });
  };

  if (isLoading)
    return (
      <div className="flex justify-center my-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  return (
    <div className="bg-white p-4 md:p-8 rounded-xl shadow-lg border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#0c5f5a]">
          Manage Scholarships ({scholarships.length})
        </h2>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="table w-full">
          {/* Table Head */}
          <thead className="bg-[#0c5f5a] text-white text-sm">
            <tr>
              <th>#</th>
              <th>Scholarship Name</th>
              <th>University Name</th>
              <th>Subject Category</th>
              <th>Degree</th>
              <th>Application Fee</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="text-gray-700">
            {scholarships.map((item, index) => (
              <tr key={item._id} className="hover:bg-gray-50 transition-colors">
                <td>{index + 1}</td>
                <td className="font-medium text-teal-900">
                  {item.scholarshipName}
                </td>
                <td>{item.universityName}</td>
                <td>{item.subjectCategory}</td>
                <td>
                  <span className="badge badge-outline">{item.degree}</span>
                </td>
                <td className="font-bold">${item.applicationFee}</td>

                <td className="flex justify-center items-center gap-2">
                  <Link to={`/dashboard/updateScholarship/${item._id}`}>
                    <button
                      className="btn btn-sm bg-orange-400 hover:bg-orange-500 text-white border-none"
                      title="Update Scholarship"
                    >
                      <FaEdit /> Update
                    </button>
                  </Link>

                  <button
                    onClick={() => handleDelete(item._id)}
                    className="btn btn-sm bg-red-500 hover:bg-red-600 text-white border-none"
                    title="Delete Scholarship"
                  >
                    <FaTrashAlt /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {scholarships.length === 0 && (
        <div className="text-center py-10 text-gray-500">
          No scholarships found on the platform.
        </div>
      )}
    </div>
  );
};

export default ManageScholarships;
