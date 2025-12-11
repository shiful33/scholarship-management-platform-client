import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router";
import {
  FaMapMarkerAlt,
  FaGlobe,
  FaCalendarAlt,
  FaMoneyBill,
  FaGraduationCap,
  FaLink,
} from "react-icons/fa";
import { ThreeDot } from "react-loading-indicators";
import { toast } from "react-toastify";
import { BiSolidCategory } from "react-icons/bi";
import { useForm } from "react-hook-form";
import axios from "axios";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { HiOutlineShare } from "react-icons/hi";
import { IoLogoLinkedin } from "react-icons/io";
import { BsTwitterX } from "react-icons/bs";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";

const image_API_URL = `https://api.imgbb.com/1/upload?key=${
  import.meta.env.VITE_image_host_key
}`;

const ScholarshipDetails = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Fetch Scholarship Details
  const {
    data: scholarship = {},
    isLoading: isScholarshipLoading,
    isError: isScholarshipError,
  } = useQuery({
    queryKey: ["scholarship-details", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/scholarships/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  /* Review Handle */
  const handleReviewSubmit = async (data) => {
    if (!user || !user.email) {
      toast.error("Please log in to submit a review.");
      return;
    }

    let reviewerImageUrl = user.photoURL || "default-user-image-url";

    const imageFile = data.reviewerImage[0];

    if (imageFile) {
      const formData = new FormData();
      formData.append("image", imageFile);

      try {
        const imgRes = await axios.post(image_API_URL, formData);
        if (imgRes.data.success) {
          reviewerImageUrl = imgRes.data.data.url;
        } else {
          toast.error(
            "Failed to upload image. Submitting review without new image."
          );
        }
      } catch (error) {
        console.error("Image Upload Error:", error);
        toast.error(
          "Image upload failed. Submitting review without new image."
        );
      }
    }

    const reviewData = {
      scholarshipId: scholarship._id,
      reviewerEmail: user.email,
      reviewerName: user.displayName || "Anonymous",
      reviewerImage: reviewerImageUrl,
      comment: data.comment,
      rating: Number(data.rating),
      reviewDate: new Date(),
    };

    try {
      const res = await axiosSecure.post("/reviews", reviewData);

      if (res.data.insertedId) {
        toast.success("Review submitted successfully!");
        reset();
      } else {
        toast.error("Failed to add review.");
      }
    } catch (error) {
      console.error("Review submission error:", error);
      toast.error("An error occurred during review submission.");
    }
  };

  // Handle Loading State
  if (isScholarshipLoading) {
    return (
      <div className="p-12 text-center flex justify-center items-center h-[70vh]">
        <ThreeDot
          color="#0c5f5a"
          size="medium"
          text="Loading Details..."
          textColor="#0c5f5a"
        />
      </div>
    );
  }

  // Handle Error State
  if (isScholarshipError || !scholarship._id) {
    return (
      <div className="p-12 text-center text-lg font-semibold text-red-600 h-[70vh]">
        Error loading scholarship details. The scholarship might not exist.
      </div>
    );
  }

  // Format Data
  const deadline = scholarship.applicationDeadline
    ? new Date(scholarship.applicationDeadline).toLocaleDateString()
    : "N/A";

  const fees = scholarship.applicationFees
    ? `$${scholarship.applicationFees}`
    : "Free";

  // Function to handle Application Click
  const handleApply = () => {
    if (!user) {
      toast.error("You must be logged in to apply for a scholarship.");
      navigate("/login");
      return;
    }

    navigate(`/checkout/${id}`);
  };

  return (
    <div className="p-4 md:p-10 lg:p-0 my-20">
      <div className="lg:flex gap-6">

        <div className="flex-1">
          <h1 className="text-2xl font-bold text-[#0c5f5a] mb-2">
            University:{" "}
            <span className="text-xl font-semibold">
              {scholarship.universityName}
            </span>
          </h1>
          <h2 className="text-2xl font-bold text-[#0c5f5a] mb-6">
            Scholarship:{" "}
            <span className="text-xl font-semibold">
              {scholarship.scholarshipName}
            </span>
            <div className="flex gap-4 items-center  mt-6">
              <h4 className="text-[17px] text-gray-400 font-medium">Share: </h4>
              <div className="flex text-[20px] gap-4">
                <MdOutlineMarkEmailRead className="cursor-pointer hover:text-gray-400 transition-all duration-300"/>
                <HiOutlineShare className="cursor-pointer hover:text-gray-400 transition-all duration-300"/>
                <FaLink className="cursor-pointer hover:text-gray-400 transition-all duration-300"/>
                <IoLogoLinkedin className="cursor-pointer hover:text-gray-400 transition-all duration-300"/>
                <BsTwitterX className="cursor-pointer hover:text-gray-400 transition-all duration-300"/>
              </div>
            </div>
            <div className=" border-b-1 border-orange-200 mt-4"></div>
          </h2>

          {/* Scholarship Description* */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <h3 className="text-2xl font-bold mb-4 text-[#0c5f5a]">
            Scholarship Description:
          </h3>
          <p className="text-gray-600 whitespace-pre-line mb-8">
            {scholarship.description}
          </p>

          <h3 className="text-xl font-bold mb-3 text-[#0c5f5a]">
            Stipend & Coverage Details
          </h3>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li className="flex items-center">
              <BiSolidCategory className="mr-2 text-orange-400" />
              <span className="font-bold mr-2">Category: </span>{" "}
              {scholarship.scholarshipCategory}
            </li>
            <li className="flex items-center">
              <FaGraduationCap className="mr-2 text-gray-800" />
              <span className="font-bold mr-2">Degree Level:</span>{" "}
              {scholarship.degreeLevel}
            </li>
            <li className="flex items-center">
              <FaMoneyBill className="mr-2 text-gray-400" />
              <span className="font-bold mr-2">Tuition Covered:</span>{" "}
              {scholarship.tuitionFeesCovered
                ? "Yes, fully covered"
                : `No (Est. Annual Fee: $${scholarship.tuitionFees || "N/A"})`}
            </li>
            <li className="flex items-center">
              <FaMoneyBill className="mr-2 text-green-600" />
              <span className="font-bold mr-2">Service Charge:</span> $
              {scholarship.serviceCharge}
            </li>
          </ul>
        </div>
        </div>

        {/* --- University Image --- */}
        <div className="h-96 flex-1 mb-25">
          <img
            src={scholarship.universityImage}
            alt={scholarship.universityName}
            className="w-full object-cover rounded-xl shadow-lg"
          />
        </div>
      </div>

      {/* Key Info Grid and Apply Button */}
      <div className=" gap-8 mt-8 items-center">
        {/* Left Column */}
          <div className="gap-4 mb-8 p-4 border-1 border-orange-400 rounded-lg bg-gray-50">
            <p className="flex items-center text-gray-600 font-medium">
              <FaGlobe className="mr-2 text-orange-400" />
              World Rank: {scholarship.worldRank}
            </p>
            <p className="flex items-center text-gray-600 font-medium">
              <FaMapMarkerAlt className="mr-2 text-teal-600" />
              Location: {scholarship.country}, {scholarship.city}.
            </p>
            <p className="flex items-center text-gray-600 font-medium">
              <FaCalendarAlt className="mr-2 text-orange-500" />
              Deadline: {deadline}
            </p>
            <p className="flex items-center text-gray-600 font-medium">
              <FaMoneyBill className="mr-2 text-green-600" />
              Fees: {fees}
            </p>
          </div>

        {/* Right Column: Apply Button */}
        <div className="lg:col-span-1 p-6 bg-teal-50 rounded-xl shadow-md flex flex-col justify-center">
          <h3 className="text-xl font-bold mb-2 text-[#0c5f5a] text-left">
            Are you ready to Apply?
          </h3>
          <p className="text-sm text-gray-500  text-left mb-4">
            <span className="font-semibold text-[16px]">Application fees:</span>{" "}
            <span className="text-[18px] font-semibold text-primary">{fees}</span>
          </p>
          <button
            onClick={handleApply}
            className="w-full py-3 px-4 bg-gradient-to-r from-teal-400 to-orange-200 text-white font-semibold rounded-lg 
           hover:from-orange-300 hover:to-teal-400   transform hover:scale-96 transition-all duration-300 
            shadow-md cursor-pointer"
          >
            Apply for Scholarship
          </button>
        </div>
      </div>

      {/* Review Section */}
      <div className="p-4 md:p-10 max-w-6xl mx-auto">
        <div className="mt-8 p-6 bg-white rounded-xl shadow-2xl border border-orange-100">
          <h3 className="text-2xl font-extrabold mb-6 text-primary border-b border-orange-300 pb-2">
            Submit Your Review
          </h3>
          <form
            onSubmit={handleSubmit(handleReviewSubmit)}
            className="space-y-4"
          >
            {/* Reviewer Image Upload Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Upload Your Photo (Optional)
              </label>
              <input
                type="file"
                {...register("reviewerImage")}
                className="file-input file-input-bordered w-full mt-1"
                accept="image/*"
              />
              <p className="text-xs text-gray-500 mt-1">
                If not uploaded, your default profile picture will be used.
              </p>
            </div>

            {/* Rating Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Your Rating (1-5)
              </label>
              <select
                {...register("rating", {
                  required: "Rating is required",
                  min: { value: 1, message: "Min rating is 1" },
                  max: { value: 5, message: "Max rating is 5" },
                })}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Rating</option>
                <option value="5">5 Stars - Excellent</option>
                <option value="4">4 Stars - Very Good</option>
                <option value="3">3 Stars - Good</option>
                <option value="2">2 Stars - Fair</option>
                <option value="1">1 Star - Poor</option>
              </select>
              {errors.rating && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.rating.message}
                </p>
              )}
            </div>

            {/* Comment Textarea */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Your Comment
              </label>
              <textarea
                {...register("comment", {
                  required: "Comment is required",
                  minLength: {
                    value: 10,
                    message: "Comment must be at least 10 characters.",
                  },
                })}
                rows="4"
                placeholder="Share your experience and thoughts about this scholarship/university..."
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
              {errors.comment && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.comment.message}
                </p>
              )}
            </div>

            <button
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-r from-teal-400 to-orange-200 text-white font-semibold rounded-lg 
           hover:from-orange-300 hover:to-teal-400   transform hover:scale-96 transition-all duration-300 
            shadow-md cursor-pointer"
            >
              Submit Review
            </button>
          </form>
        </div>

        <div className="mt-12 p-6 bg-white rounded-xl shadow-2xl border border-gray-100"></div>
      </div>
    </div>
  );
};

export default ScholarshipDetails;
