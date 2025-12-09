import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { ThreeDot } from "react-loading-indicators";

const AdminScholar = () => {
  const { user } = useAuth();

  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: addScholars = [], isLoading, refetch } = useQuery({
    queryKey: ["admin-addScholar", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/addScholars?email=${user.email}`);
      return res.data;
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/addScholars/${id}`)
        .then(res => {
            console.log(res.data);

            if (res.data.deleteCount) {
                refetch();
               Swal.fire({
               title: "Deleted!",
               text: "Your add-scholar has been deleted.",
               icon: "success",
        });
            }
        })
      }
    });
  };

  const handleUpdate = (id) => {
      navigate(`/dashboard/update-scholarship/${id}`);
  };

  if (isLoading) {
    return <div className="p-12 text-center">
        <ThreeDot color="#32cd32" size="medium" text="" textColor="" />
    </div>;
  }

  return (
    <div className="p-4 md:p-12">
      <h2 className="text-3xl font-bold mb-6 text-[#0c5f5a]">
        Total Added Scholarships:{" "}
        <span className="text-[#0c5f5a]">{addScholars.length}</span>
      </h2>

      {addScholars.length === 0 ? (
        // Message when no data is found
        <div
          className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4"
          role="alert"
        >
          <p className="font-bold">No Data Found!</p>
          <p>No scholarship information added by your email ID was found.</p>
        </div>
      ) : (
        <div className="overflow-x-auto shadow-2xl rounded-lg border border-gray-200">
          <table className="table w-full min-w-full table-zebra table-pin-rows">
            <thead>
              <tr className="bg-[#0c5f5a] text-white text-base">
                <th className="w-12">SL</th>
                <th className="min-w-[150px]">Scholarship Name</th>
                <th className="min-w-[150px]">University Name</th>
                <th className="w-24 text-center">Type</th>
                <th className="min-w-[120px]">Application Fee</th>
                <th className="min-w-[100px]">Post Date</th>
                <th className="w-[120px] text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {addScholars.map((scholarship, index) => (
                <tr key={scholarship._id} className="hover:bg-gray-50">
                  <td className="font-medium">{index + 1}</td>
                  <td className="font-semibold whitespace-nowrap">
                    {scholarship.scholarshipName}
                  </td>
                  <td className="whitespace-nowrap">
                    {scholarship.universityName}
                  </td>
                  <td>
                    <div
                      className={`p-1 text-center rounded text-white font-medium text-xs ${
                        scholarship.scholarshipCategory === "Diploma"
                          ? "bg-green-600"
                          : scholarship.scholarshipCategory === "Degree"
                          ? "bg-green-600"
                          : "bg-teal-600"
                      }`}
                    >
                      {scholarship.scholarshipCategory}
                    </div>
                  </td>
                  <td className="whitespace-nowrap">
                    ${scholarship.applicationFees}
                  </td>
                  <td className="whitespace-nowrap">
                    {scholarship.postDate &&
                    !isNaN(new Date(scholarship.postDate))
                      ? new Date(scholarship.postDate).toLocaleDateString()
                      : ""}
                  </td>
                  <td className="flex flex-col space-y-1 lg:flex-row lg:space-x-1 lg:space-y-0 p-1 mt-2">
                    <button
                      onClick={() => handleUpdate(scholarship._id)}
                      className="btn btn-sm bg-green-500 text-white"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(scholarship._id)}
                      className="btn btn-sm btn-error text-white"
                    >
                      Delete
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

export default AdminScholar;
