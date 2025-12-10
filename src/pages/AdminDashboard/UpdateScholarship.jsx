import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { ThreeDot } from "react-loading-indicators";
import axios from "axios";

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

const UpdateScholarship = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();
  const isTuitionCovered = watch("tuitionFeesCovered");
  const MySwal = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  const {
    data: scholarshipData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["scholarship-details", id],
    enabled: !!id,
    queryFn: async () => {
      const res = await axiosSecure.get(`/scholarships/${id}`);
      return res.data;
    },
  });

  useEffect(() => {
    if (scholarshipData) {
      const applicationDeadlineDate = scholarshipData.applicationDeadline
        ? new Date(scholarshipData.applicationDeadline)
            .toISOString()
            .substring(0, 10)
        : "";
      const postDateDate = scholarshipData.postDate
        ? new Date(scholarshipData.postDate).toISOString().substring(0, 10)
        : new Date().toISOString().substring(0, 10);

      reset({
        ...scholarshipData,
        applicationDeadline: applicationDeadlineDate,
        postDate: postDateDate,

        worldRank: Number(scholarshipData.worldRank || 0),
        applicationFees: Number(scholarshipData.applicationFees || 0),
        serviceCharge: Number(scholarshipData.serviceCharge || 0),
        tuitionFees: scholarshipData.tuitionFees
          ? Number(scholarshipData.tuitionFees)
          : null,
      });
    }
  }, [scholarshipData, reset]);

  if (isLoading) {
    return (
      <div className="p-12 text-center text-lg font-semibold">
        Loading Scholarship Data...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-12 text-center text-lg font-semibold text-red-600">
        Error loading data. Check if the ID is valid.
      </div>
    );
  }

  const image_API_URL = `https://api.imgbb.com/1/upload?key=${
    import.meta.env.VITE_image_host_key
  }`;

  const handleUpdateScholarship = async (data) => {
    const result = await MySwal.fire({
      title: "Confirm Update",
      text: `Are you sure you want to update scholarship ID: ${id}?`,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Yes, Update it",
      cancelButtonText: "No, Cancel",
      reverseButtons: true,
    });

    if (!result.isConfirmed) {
      toast.info("Scholarship update cancelled.");
      return;
    }

    const updatedData = {
      ...data,
      worldRank: Number(data.worldRank),
      applicationFees: Number(data.applicationFees),
      serviceCharge: Number(data.serviceCharge),

      applicationDeadline: new Date(data.applicationDeadline).toISOString(),
      userEmail: scholarshipData.userEmail,
    };

    let universityImageUrl = scholarshipData?.universityImage || "";
    const uniImageFile = data.universityImage[0];

    if (uniImageFile) {
      const formData = new FormData();
      formData.append("image", uniImageFile);

      try {
        const imgRes = await axios.post(image_API_URL, formData);
        universityImageUrl = imgRes.data.data.url;
      } catch (error) {
        toast.error("Failed to upload new image.");
        console.error("Image Upload Error:", error);
        return;
      }
    }

    updatedData.universityImage = universityImageUrl;

    try {
      const res = await axiosSecure.put(`/addScholars/${id}`, updatedData);
    } catch (error) {}
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
      <h2 className="text-2xl md:text-3xl font-extrabold text-primary mb-10 text-center">
        Update Scholarship:{" "}
        <span className="text-[#606162] text-xl block md:inline-block font-semibold break-all">
          {scholarshipData?.scholarshipName || "..."}
        </span>
      </h2>

      <form
        onSubmit={handleSubmit(handleUpdateScholarship)}
        className="bg-white border-1 border-gray-200 p-8 shadow-2xl rounded-xl space-y-6"
      >
        {/* Basic Info */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Scholarship Name
            </label>
            <input
              type="text"
              {...register("scholarshipName", { required: "Name is required" })}
              className="mt-1 text-sm block w-full border-gray-300 rounded-md shadow-sm p-2"
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
                required: "University is required",
              })}
              className="mt-1 text-sm block w-full border-gray-300 rounded-md shadow-sm p-2"
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
              className="mt-1 text-sm block w-full border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              City
            </label>
            <input
              type="text"
              {...register("city", { required: true })}
              className="mt-1 text-sm block w-full border-gray-300 rounded-md shadow-sm p-2"
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
              className="mt-1 text-sm block w-full border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Scholarship Category
            </label>
            <select
              {...register("scholarshipCategory", { required: true })}
              className="mt-1 text-sm block w-full border-gray-300 rounded-md shadow-sm p-2"
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
              className="mt-1 text-sm block w-full border-gray-300 rounded-md shadow-sm p-2"
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
              className="mt-1 text-sm block w-full border-gray-300 rounded-md shadow-sm p-2 h-20"
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
        <h3 className="text-xl font-semibold pt-4 text-[#0c5f5a]">
          Financial Details
        </h3>
        <div className="grid md:grid-cols-4 gap-6 items-end">
          <div className="md:col-span-1">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                {...register("tuitionFeesCovered")}
                className="form-checkbox h-5 w-5 text-[#0c5f5a] text-sm rounded"
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
              className={`mt-1 text-sm block w-full border-gray-300 rounded-md shadow-sm p-2 ${
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
              className="mt-1 text-sm block w-full border-gray-300 rounded-md shadow-sm p-2"
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
              className="mt-1 text-sm block w-full border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
        </div>

        {/* Dates & Description */}
        <h3 className="text-xl font-semibold pt-4 text-[#0c5f5a]">
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
              className="mt-1 text-sm block w-full border-gray-300 rounded-md shadow-sm p-2"
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
              className="mt-1 text-sm block w-full border-gray-300 rounded-md shadow-sm p-2 bg-gray-100"
            />
          </div>
        </div>

        {/* Contact & Description */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              User Email (Admin)
            </label>
            <p className="mt-1 text-sm block w-full border border-gray-300 bg-gray-100 rounded-md shadow-sm p-2 text-gray-500">
              {scholarshipData?.userEmail}
            </p>
            <input type="hidden" {...register("userEmail")} />
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
              className="mt-1 text-sm block w-full border-gray-300 rounded-md shadow-sm p-2"
            />
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
          className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 transition duration-150 cursor-pointer"
        >
          Update Scholarship
        </button>
      </form>
    </div>
  );
};

export default UpdateScholarship;
