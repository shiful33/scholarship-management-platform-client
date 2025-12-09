import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { FaTrash } from "react-icons/fa";
import { VscFilterFilled } from "react-icons/vsc";
import { ThreeDot } from "react-loading-indicators";
import { toast } from "react-toastify";
import useAxiosSecure from "../../hooks/useAxiosSecure";


const MySwal = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success mx-1",
    cancelButton: "btn btn-danger mx-1",
  },
  buttonsStyling: false,
});

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedRole, setSelectedRole] = useState(""); 

  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allUsers", selectedRole],
    queryFn: async () => {
      const endpoint = selectedRole
        ? `/users?role=${selectedRole}`
        : `/users`;

      const res = await axiosSecure.get(endpoint);
      return res.data;
    },
  });

  /* Delete Handle */
  const handleDeleteUser = (user) => {
    MySwal.fire({
      title: "Are you sure?",
      text: `You are about to delete ${
        user.name || user.email
      }. This cannot be undone!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/users/${user._id}`);
          if (res.data.deletedCount > 0) {
            refetch();
            toast.success(`${user.name || user.email} has been deleted.`);
          }
        } catch (error) {
          toast.error("Failed to delete user.");
        }
      }
    });
  };


  const handleRoleChange = (user, newRole) => {
    MySwal.fire({
      title: "Confirm Role Change?",
      text: `Change role of ${user.name || user.email} to ${newRole}?`,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Yes, change!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.patch(`/users/role/${user._id}`, {
            role: newRole,
          });

          if (res.data.modifiedCount > 0) {
            refetch();
            toast.success(`${user.name || user.email} is now a ${newRole}.`);
          } else {
            toast.warn("No changes made to the user role.");
          }
        } catch (error) {
          toast.error("Failed to change user role.");
        }
      }
    });
  };

  if (isLoading) {
    return (
      <div className="p-12 text-center flex justify-center items-center h-[50vh]">
        <ThreeDot
          color="#0c5f5a"
          size="medium"
          text="Loading Users..."
          textColor="#0c5f5a"
        />
      </div>
    );
  }


  return (
    <div className="p-4 md:p-8">
      <h2 className="text-3xl font-bold mb-6 text-[#0c5f5a] text-center">
        Manage All Users : {users.length}
      </h2>

      {/* Filter Dropdown */}
      <div className="flex justify-end mb-6">
        <div className="flex items-center space-x-2 bg-white p-3 rounded-lg shadow border">
          <VscFilterFilled className="text-primary" />
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="p-1 border rounded focus:outline-none text-sm font-semibold"
          >
            <option value="">All Roles</option>
            <option value="Admin">Admin</option>
            <option value="Moderator">Moderator</option>
            <option value="Student">Student</option>
          </select>
        </div>
      </div>

      {/* User Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-2xl border">
        <table className="table w-full">
          <thead className="bg-[#0c5f5a] text-white">
            <tr>
              <th>#</th>
              <th>Name/Email</th>
              <th>Current Role</th>
              <th className="text-center">Change Role</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} className="hover:bg-gray-50 border-b">
                <td>{index + 1}</td>
                <td>
                  <div className="font-bold">{user.name || "N/A"}</div>
                  <div className="text-sm opacity-50">{user.email}</div>
                </td>
                <td>
                  <span
                    className={`badge badge-lg font-bold text-white 
                     ${ user.role === "Admin" ? "bg-red-600" : user.role === "Moderator" ? "bg-orange-500" : "bg-green-500" }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="space-x-2 text-center">
                  {/* Admin Button */}
                  <button
                    onClick={() => handleRoleChange(user, "Admin")}
                    disabled={user.role === "Admin"}
                    className="btn btn-xs bg-red-500 hover:bg-red-600 text-white disabled:bg-gray-400"
                  >
                    Admin
                  </button>

                  {/* Moderator Button */}
                  <button
                    onClick={() => handleRoleChange(user, "Moderator")}
                    disabled={user.role === "Moderator"}
                    className="btn btn-xs bg-orange-500 hover:bg-orange-600 text-white disabled:bg-gray-400"
                  >
                    Moderator
                  </button>

                  {/* Student Button */}
                  <button
                    onClick={() => handleRoleChange(user, "Student")}
                    disabled={user.role === "Student"}
                    className="btn btn-xs bg-green-500 hover:bg-green-600 text-white disabled:bg-gray-400"
                  >
                    Student
                  </button>
                </td>
                <td className="text-center">
                  {/* Delete Button */}
                  <button
                    onClick={() => handleDeleteUser(user)}
                    className="btn btn-ghost btn-sm text-red-600 hover:bg-red-50"
                  >
                    <FaTrash className="text-lg" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {users.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            No users found for the selected filter.
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;
