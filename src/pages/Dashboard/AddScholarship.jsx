import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { FaPlusCircle } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";



const AddScholarship = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Scholarship Mutation
  const addScholarshipMutation = useMutation({
    mutationFn: async (scholarshipData) => {
      const res = await axiosSecure.post("/add-scholarships", scholarshipData);
      return res.data;
    },
    onSuccess: () => {
      toast.success(
        "Scholarship added successfully! It is now available to users."
      );
      queryClient.invalidateQueries(["allScholarships"]);

      document.getElementById("add-scholarship-form").reset();
    },
    onError: (error) => {
      console.error("Add Scholarship Error:", error);
      const errorMessage =
        error.response?.data?.message ||
        "Failed to add scholarship. Please check the inputs.";
      toast.error(errorMessage);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    // Data collected
    const scholarshipName = form.scholarshipName.value;
    const universityName = form.universityName.value;
    const scholarshipImage = form.scholarshipImage.value;
    const country = form.country.value;
    const city = form.city.value;
    const worldRank = parseInt(form.worldRank.value);
    const subjectCategory = form.subjectCategory.value;
    const degree = form.degree.value;
    const tuitionFee = parseFloat(form.tuitionFee.value);
    const serviceFee = parseFloat(form.serviceFee.value);
    const applicationDeadline = form.applicationDeadline.value;
    const postDate = new Date().toISOString().split("T")[0];
    const scholarshipDescription = form.scholarshipDescription.value;

    const scholarshipData = {
      scholarshipName,
      universityName,
      scholarshipImage,
      country,
      city,
      worldRank,
      subjectCategory,
      degree,
      tuitionFee,
      serviceFee,
      applicationDeadline,
      postDate,
      scholarshipDescription,
      postedBy: {
        email: user.email,
        name: user.displayName || "Moderator",
      },

      applicationCount: 0,
    };

    // Mutation call
    addScholarshipMutation.mutate(scholarshipData);
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-blue-700 mb-8 border-b-4 border-blue-500 pb-3 flex items-center">
        <FaPlusCircle className="mr-3" />
        Add New Scholarship
      </h2>

      <form
        onSubmit={handleSubmit}
        id="add-scholarship-form"
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
              placeholder="e.g., Global Excellence Grant"
              className="input input-bordered w-full"
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
              placeholder="e.g., City University"
              className="input input-bordered w-full"
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
              placeholder="https://example.com/image.jpg"
              className="input input-bordered w-full"
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
              placeholder="e.g., USA"
              className="input input-bordered w-full"
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
              placeholder="e.g., New York"
              className="input input-bordered w-full"
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
              placeholder="e.g., 50"
              className="input input-bordered w-full"
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
              required
            >
              <option value="">Select Category</option>
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
              required
            >
              <option value="">Select Degree</option>
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
              placeholder="e.g., 15000"
              className="input input-bordered w-full"
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
              placeholder="e.g., 50"
              className="input input-bordered w-full"
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
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="mt-8">
          <button
            type="submit"
            className="btn btn-primary w-full bg-blue-600 border-none hover:bg-blue-700 text-white text-lg"
            disabled={addScholarshipMutation.isLoading}
          >
            {addScholarshipMutation.isLoading
              ? "Adding Scholarship..."
              : "Add Scholarship"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddScholarship;
