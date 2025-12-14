import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { FaUserEdit, FaSave } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const MyProfile = () => {
  const { user, loading: authLoading, updateUserProfile } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: dbProfileData = {}, isLoading: dbLoading } = useQuery({
    queryKey: ["userProfileExtra", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/profile?email=${user.email}`);
      return res.data;
    },

    enabled: !!user?.email && !authLoading,

    initialData: {},
  });

  const loading = authLoading || dbLoading;

  const updateProfileMutation = useMutation({
    mutationFn: async (updatedData) => {
      const res = await axiosSecure.patch("/users/profile", updatedData);
      return res.data;
    },
    onSuccess: (data, variables) => {
      if (
        variables.name !== user.displayName ||
        variables.photoURL !== user.photoURL
      ) {
        updateUserProfile(variables.name, variables.photoURL)
          .then(() => {
            toast.success(
              "Profile updated successfully (Auth & DB)! Refreshing..."
            );
            queryClient.invalidateQueries(["userProfileExtra"]);
          })
          .catch((err) => {
            console.error("Firebase update failed:", err);
            toast.warn(
              "Profile updated in DB, but failed to update Auth Context."
            );
          });
      } else {
        toast.success(data.message);
        queryClient.invalidateQueries(["userProfileExtra"]);
      }
    },
    onError: (error) => {
      console.error("Profile Update Error:", error);
      toast.error(error.response?.data?.message || "Failed to update profile.");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedData = {
      name: form.name.value,
      email: user.email,
      photoURL: form.photoURL.value,
      address: form.address.value,
      phoneNumber: form.phoneNumber.value,
    };

    updateProfileMutation.mutate(updatedData);
  };

  if (loading) {
    return <div className="text-center p-10">Loading User Profile...</div>;
  }

  if (!user) {
    return (
      <div className="text-center p-10 text-red-600">
        Please log in to view your profile.
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-orange-600 mb-8 border-b-4 border-orange-500 pb-3 flex items-center">
        <FaUserEdit className="mr-3" />
        Edit My Profile
      </h2>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Current Profile Info */}
        <div className="md:w-1/3 bg-white p-6 rounded-xl shadow-lg h-fit">
          <h3 className="text-xl font-bold mb-4 border-b pb-2">
            Current Profile
          </h3>
          <div className="flex flex-col items-center">
            <img
              src={user.photoURL || "default-user-icon.png"}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-orange-300"
            />
            <p className="text-2xl font-semibold text-gray-800">
              {user.displayName || "User Name"}
            </p>
            <p className="text-gray-500 mt-1">{user.email}</p>
          </div>
        </div>

        {/* Edit Form */}
        <div className="md:w-2/3 bg-white p-6 rounded-xl shadow-lg">
          <form onSubmit={handleSubmit}>
            {/* Name Input */}
            <div className="mb-4">
              <label className="label">
                <span className="label-text font-semibold">Full Name</span>
              </label>
              <input
                type="text"
                name="name"
                className="input input-bordered w-full"
                defaultValue={user.displayName || ""}
                required
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="label">
                <span className="label-text font-semibold">
                  Email (Cannot be changed)
                </span>
              </label>
              <input
                type="email"
                name="email"
                className="input input-bordered w-full bg-gray-100"
                defaultValue={user.email}
                readOnly
              />
            </div>

            {/* Photo URL */}
            <div className="mb-4">
              <label className="label">
                <span className="label-text font-semibold">Photo URL</span>
              </label>
              <input
                type="url"
                name="photoURL"
                className="input input-bordered w-full"
                defaultValue={user.photoURL || ""}
              />
            </div>

            {/* Address */}
            <div className="mb-4">
              <label className="label">
                <span className="label-text font-semibold">Address</span>
              </label>
              <input
                type="text"
                name="address"
                className="input input-bordered w-full"
                defaultValue={dbProfileData.address || ""}
                placeholder="e.g., House 10, Road 5, Dhaka"
              />
            </div>

            {/* Phone Number */}
            <div className="mb-6">
              <label className="label">
                <span className="label-text font-semibold">Phone Number</span>
              </label>
              <input
                type="text"
                name="phoneNumber"
                className="input input-bordered w-full"
                defaultValue={dbProfileData.phoneNumber || ""}
                placeholder="+8801XXXXXXXXX"
              />
            </div>
            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="btn w-full bg-orange-600 border-none hover:bg-orange-700 text-white text-lg"
                disabled={updateProfileMutation.isLoading}
              >
                <FaSave />
                {updateProfileMutation.isLoading
                  ? "Saving Changes..."
                  : "Save Profile"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
