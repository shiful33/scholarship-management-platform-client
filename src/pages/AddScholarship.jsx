import React from "react";
import { useForm, Watch } from "react-hook-form";
import { toast } from "react-toastify";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../../src/hooks/useAuth";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";

const defaultValues = {
  scholarshipName: "",
  universityName: "",
  universityImageURL: "",
  country: "",
  city: "",
  worldRank: 0,
  subjectCategory: [],
  scholarshipCategory: "Merit-based",
  degreeLevel: "Bachelor's",
  tuitionFeesCovered: true,
  tuitionFees: null,
  applicationFees: 0,
  serviceCharge: 0,
  applicationDeadline: "",
  postDate: new Date().toISOString().substring(0, 10),
  userEmail: "user@example.com",
  phoneNumber: "phone number",
  description: "",
};

const scholarshipOptions = [
  "Merit-based",
  "Need-based",
  "Full-tuition",
  "Partial-fund",
];
const degreeOptions = ["Bachelor's", "Master's", "PhD", "Diploma"];
const subjectOptions = [
  "Engineering",
  "Humanities",
  "Science",
  "Arts",
  "Medical",
];

const AddScholarship = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isLoading },
    reset,
  } = useForm({
    defaultValues: defaultValues,
  });

  const { user } = useAuth();

  const axiosSecure = useAxiosSecure();

  const isTuitionCovered = watch("tuitionFeesCovered");

  const MySwal = withReactContent(Swal);

  const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;

  const handleAddScholarship = async (data) => {
    const result = await MySwal.fire({
      title: "Confirm Submission",
      text: "Are you sure you want to submit this scholarship information? It cannot be changed easily afterwards.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Submit it",
      cancelButtonText: "No, Cancel",
      reverseButtons: true,
    });

    if (!result.isConfirmed) {
      toast.info("Scholarship submission cancelled.");
      return;
    }

    let universityImageUrl = "";
    const uniImageFile = data.universityImage[0];
    const formData = new FormData();
    formData.append("image", uniImageFile);

    try {
      const imgRes = await axios.post(image_API_URL, formData);
      universityImageUrl = imgRes.data.data.url;
      toast.success("University image uploaded successfully.");
    } catch (error) {
      console.error("Image upload error:", error);
      toast.error("Failed to upload University Image. Submission cancelled.");
      return;
    }

    const finalSubmissionData = {
      ...data,

      universityImage: universityImageUrl,

      worldRank: Number(data.worldRank),
      applicationFees: Number(data.applicationFees),
      serviceCharge: Number(data.serviceCharge),

      applicationDeadline: new Date(data.applicationDeadline).toISOString(),

      userEmail: user?.email,
      postDate: new Date().toISOString(),

      subjectCategory: Array.isArray(data.subjectCategory)
        ? data.subjectCategory
        : [data.subjectCategory],
    };

    console.log("Submitting the final JSON data:", finalSubmissionData);

    try {
      const res = await axiosSecure.post("/addScholars", finalSubmissionData);

      if (res.data.insertedId) {
        toast.success(
          "Scholarship successfully added and saved to MongoDB! (ID: " +
            res.data.insertedId +
            ")"
        )

      } else {
        toast.error(
          "Scholarship added, but MongoDB did not return a valid ID."
        );
      }
    } catch (error) {
      console.error("Error submitting scholarship data:", error);
      let errorMessage = "Failed to add scholarship. Server or network error.";
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      toast.error(errorMessage);
    }
  };

  if (isLoading) {
    return (
      <div className="p-12 text-center">
        <ThreeDot color="#32cd32" size="medium" text="" textColor="" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-teal-600 mb-16 text-center">
        Add New Scholarship for Admin
      </h2>

      {/* handleSubmit */}
      <form
        onSubmit={handleSubmit(handleAddScholarship)}
        className="bg-white border-1 border-gray-200 p-8 shadow-xl rounded-xl space-y-6"
      >
        {/* Basic Info */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Scholarship Name
            </label>
            <input
              type="text"
              {...register("scholarshipName", {
                required: true,
              })}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
            />
            {errors.scholarshipName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.scholarshipName.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              University Name
            </label>
            <input
              type="text"
              {...register("universityName", {
                required: true,
              })}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
            />
            {errors.universityName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.universityName.message}
              </p>
            )}
          </div>
        </div>

        {/* Location & Image */}
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Country
            </label>
            <input
              type="text"
              {...register("country", { required: true })}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              City
            </label>
            <input
              type="text"
              {...register("city", { required: true })}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>

          {/* University Image Field */}
          <div>
            <label className="label">University Image</label>
            <input
              type="file"
              {...register("universityImage", { required: true })}
              className="file-input w-full"
            />
            {errors.universityImage && (
              <p className="text-red-500">University Image is required.</p>
            )}
          </div>

          {/* <div>
            <label className="block text-sm font-medium text-gray-700">
              Image URL
            </label>
            <input
              type="url"
              {...register("universityImageURL", { required: true })}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
            />
          </div> */}
        </div>

        {/* Categories & Rank */}
        <div className="grid md:grid-cols-4 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              World Rank
            </label>
            <input
              type="number"
              {...register("worldRank", {
                required: true,
                valueAsNumber: true,
              })}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Scholarship Category
            </label>
            <select
              {...register("scholarshipCategory", { required: true })}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
            >
              {scholarshipOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Degree Level
            </label>
            <select
              {...register("degreeLevel", { required: true })}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
            >
              {degreeOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Subject Category
            </label>

            <select
              multiple
              {...register("subjectCategory", { required: true })}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 h-20"
            >
              {subjectOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Fees */}
        <h3 className="text-xl font-semibold pt-4 shadow text-[#0c5f5a]">
          Financial Details
        </h3>
        <div className="grid md:grid-cols-4 gap-6 items-end">
          <div className="md:col-span-1">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                {...register("tuitionFeesCovered")} // Checkbox register
                className="form-checkbox h-5 w-5 text-[#0c5f5a] rounded"
              />
              <span className="ml-2 text-sm text-gray-700">
                Tuition Fully Covered?
              </span>
            </label>
          </div>

          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700">
              Tuition Fees (Annual)
            </label>
            <input
              type="number"
              {...register("tuitionFees", { valueAsNumber: true })}
              disabled={isTuitionCovered}
              placeholder="Optional"
              className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 ${
                isTuitionCovered ? "bg-gray-100" : ""
              }`}
            />
          </div>

          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700">
              Application Fees
            </label>
            <input
              type="number"
              {...register("applicationFees", {
                required: true,
                valueAsNumber: true,
                min: 0,
              })}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700">
              Service Charge
            </label>
            <input
              type="number"
              {...register("serviceCharge", {
                required: true,
                valueAsNumber: true,
                min: 0,
              })}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
        </div>

        {/* 5. Dates & Description */}
        <h3 className="text-xl font-semibold pt-4 shadow text-[#0c5f5a]">
          Timeline & Description
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Application Deadline
            </label>
            <input
              type="date"
              {...register("applicationDeadline", { required: true })}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Post Date
            </label>
            <input
              type="date"
              {...register("postDate")}
              readOnly
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 bg-gray-100"
            />
          </div>
        </div>

        {/* User Email */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              User Email
            </label>
            <input
              type="text"
              {...register("userEmail", {
                required: "User Email is required",
              })}
              defaultValue={user?.email}
              placeholder="user@example.com"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
            />
            {errors.scholarshipName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.scholarshipName.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="number"
              {...register("phoneNumber", {
                required: "Phone number is required",
              })}
              placeholder="Phone Number"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
            />
            {errors.universityName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.universityName.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Describe your details
          </label>
          <textarea
            {...register("description", { required: true })}
            rows="4"
            placeholder="Type your description"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-teal-600 hover:bg-teal-700 transition duration-150 disabled:opacity-50 cursor-pointer"
        >
          {isSubmitting ? "Processing..." : "Add Scholarship"}
        </button>
      </form>

      <div className="mt-8 p-4 bg-gray-50 rounded-lg text-sm">
        <h4 className="font-semibold"></h4>
        <pre className="whitespace-pre-wrap break-all text-red-600"></pre>
      </div>
    </div>
  );
};

export default AddScholarship;
