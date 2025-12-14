import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { FaEdit } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const UpdateScholarship = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    data: scholarshipData,
    isLoading: isFetching,
    isError: isFetchError,
  } = useQuery({
    queryKey: ["scholarshipToEdit", id],
    queryFn: async () => {
      if (!id) return null;
      // Get API কল
      const res = await axiosSecure.get(`/scholarships/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  // Scholarship update Mutation
  const updateMutation = useMutation({
    mutationFn: async (dataToUpdate) => {
      // Patch API call
      const res = await axiosSecure.patch(`/scholarships/${id}`, dataToUpdate);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Scholarship updated successfully!");
      queryClient.invalidateQueries(["scholarshipToEdit", id]);
      queryClient.invalidateQueries(["allScholarshipsModerator"]);
      navigate("/dashboard/allScholarships");
    },
    onError: (error) => {
      console.error("Update Error:", error);
      toast.error(
        error.response?.data?.message || "Failed to update scholarship."
      );
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    // All data collected for update
    const updatedData = {
      scholarshipName: form.scholarshipName.value,
      universityName: form.universityName.value,
      scholarshipImage: form.scholarshipImage.value,
      country: form.country.value,
      city: form.city.value,
      worldRank: form.worldRank.value,
      subjectCategory: form.subjectCategory.value,
      degree: form.degree.value,
      tuitionFee: form.tuitionFee.value,
      serviceFee: form.serviceFee.value,
      applicationDeadline: form.applicationDeadline.value,
      scholarshipDescription: form.scholarshipDescription.value,
    };

    updateMutation.mutate(updatedData);
  };

  if (isFetching) {
    return (
      <div className="text-center p-10">Loading scholarship details...</div>
    );
  }

  if (isFetchError || !scholarshipData) {
    return (
      <div className="text-center p-10 text-red-600">
        Error or Scholarship Not Found.
      </div>
    );
  }

  // Deadline date (YYYY-MM-DD)
  const deadlineDate = scholarshipData.applicationDeadline
    ? new Date(scholarshipData.applicationDeadline).toISOString().split("T")[0]
    : "";

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-green-700 mb-8 border-b-4 border-green-500 pb-3 flex items-center">
        <FaEdit className="mr-3" />
        Update Scholarship: {scholarshipData.scholarshipName}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-2xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Scholarship Name */}
          <div>
            <label className="label">
              <span className="label-text font-semibold">Scholarship Name</span>
            </label>
            <input
              type="text"
              name="scholarshipName"
              className="input input-bordered w-full"
              defaultValue={scholarshipData.scholarshipName}
              required
            />
          </div>

          {/* University Name */}
          <div>
            <label className="label">
              <span className="label-text font-semibold">University Name</span>
            </label>
            <input
              type="text"
              name="universityName"
              className="input input-bordered w-full"
              defaultValue={scholarshipData.universityName}
              required
            />
          </div>

          {/* Scholarship Image URL */}
          <div>
            <label className="label">
              <span className="label-text font-semibold">Image URL</span>
            </label>
            <input
              type="url"
              name="scholarshipImage"
              className="input input-bordered w-full"
              defaultValue={scholarshipData.scholarshipImage}
              required
            />
          </div>

          {/* Application Deadline */}
          <div>
            <label className="label">
              <span className="label-text font-semibold">
                Application Deadline
              </span>
            </label>
            <input
              type="date"
              name="applicationDeadline"
              className="input input-bordered w-full"
              defaultValue={deadlineDate}
              required
            />
          </div>

          {/* Country */}
          <div>
            <label className="label">
              <span className="label-text font-semibold">Country</span>
            </label>
            <input
              type="text"
              name="country"
              className="input input-bordered w-full"
              defaultValue={scholarshipData.country}
              required
            />
          </div>

          {/* City */}
          <div>
            <label className="label">
              <span className="label-text font-semibold">City</span>
            </label>
            <input
              type="text"
              name="city"
              className="input input-bordered w-full"
              defaultValue={scholarshipData.city}
              required
            />
          </div>

          {/* World Rank */}
          <div>
            <label className="label">
              <span className="label-text font-semibold">
                University World Rank (Number)
              </span>
            </label>
            <input
              type="number"
              name="worldRank"
              className="input input-bordered w-full"
              defaultValue={scholarshipData.worldRank}
              required
            />
          </div>

          {/* Subject Category */}
          <div>
            <label className="label">
              <span className="label-text font-semibold">Subject Category</span>
            </label>
            <select
              name="subjectCategory"
              className="select select-bordered w-full"
              defaultValue={scholarshipData.subjectCategory}
              required
            >
              <option value="Science and Engineering">
                Science and Engineering
              </option>
              <option value="Medical">Medical</option>
              <option value="Agriculture">Agriculture</option>
              <option value="Arts and Humanities">Arts and Humanities</option>
            </select>
          </div>

          {/* Degree */}
          <div>
            <label className="label">
              <span className="label-text font-semibold">Degree</span>
            </label>
            <select
              name="degree"
              className="select select-bordered w-full"
              defaultValue={scholarshipData.degree}
              required
            >
              <option value="Diploma">Diploma</option>
              <option value="Bachelor">Bachelor</option>
              <option value="Master">Master</option>
              <option value="PhD">PhD</option>
            </select>
          </div>

          {/* Tuition Fee */}
          <div>
            <label className="label">
              <span className="label-text font-semibold">Tuition Fee ($)</span>
            </label>
            <input
              type="number"
              step="0.01"
              name="tuitionFee"
              className="input input-bordered w-full"
              defaultValue={scholarshipData.tuitionFee}
              required
            />
          </div>

          {/* Service Fee */}
          <div>
            <label className="label">
              <span className="label-text font-semibold">Service Fee ($)</span>
            </label>
            <input
              type="number"
              step="0.01"
              name="serviceFee"
              className="input input-bordered w-full"
              defaultValue={scholarshipData.serviceFee}
              required
            />
          </div>
        </div>

        {/* Scholarship Description */}
        <div className="mt-6">
          <label className="label">
            <span className="label-text font-semibold">
              Scholarship Description
            </span>
          </label>
          <textarea
            name="scholarshipDescription"
            rows="5"
            placeholder="Provide a detailed description of the scholarship, benefits, and eligibility criteria."
            className="textarea textarea-bordered w-full"
            defaultValue={scholarshipData.scholarshipDescription}
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="mt-8">
          <button
            type="submit"
            className="btn w-full bg-green-600 border-none hover:bg-green-700 text-white text-lg"
            disabled={updateMutation.isLoading}
          >
            {updateMutation.isLoading
              ? "Updating Scholarship..."
              : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateScholarship;
