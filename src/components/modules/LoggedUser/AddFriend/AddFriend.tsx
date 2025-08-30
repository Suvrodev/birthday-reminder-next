"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Image from "next/image";
import { useAppSelector } from "@/components/redux/hooks";
import { useAddFriendMutation } from "@/components/redux/features/friend/friendsApi";
import { toast } from "sonner";
import { sonarId } from "@/components/utils/Function/sonarId";
import { uploadToCloudinary } from "@/components/utils/UploadToCloudinary/UploadToCloudinary";

// Icons
import {
  FiUser,
  FiCalendar,
  FiImage,
  FiPhone,
  FiMapPin,
  FiStar,
  FiPlus,
} from "react-icons/fi";

interface FriendFormData {
  name: string;
  date: string;
  photo: string; // Cloudinary URL
  ratting: number;
  phone: string;
  location: string;
}

const AddFriend = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [addFriend] = useAddFriendMutation();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<FriendFormData>();

  const ratingValue = watch("ratting", 3);

  // Handle image change with Cloudinary upload
  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        setSelectedFile(file);
        const previewURL = URL.createObjectURL(file);
        setImagePreview(previewURL);
      } catch (err) {
        console.error("Error processing image:", err);
        toast.error("Failed to process image", { id: sonarId });
      }
    }
  };

  const onSubmit = async (data: FriendFormData) => {
    setIsSubmitting(true);

    let cloudinaryUrl = "";

    // Upload image to Cloudinary if a new file is selected
    if (selectedFile) {
      try {
        cloudinaryUrl = await uploadToCloudinary(selectedFile);
        console.log("Image url:", cloudinaryUrl);
        setValue("photo", cloudinaryUrl);
      } catch (error) {
        console.error("Cloudinary upload failed:", error);
        toast.error("Failed to upload image", { id: sonarId });
        setIsSubmitting(false);
        return;
      }
    }

    const finalData = {
      ...data,
      photo: cloudinaryUrl || data.photo,
      ref: user?.email,
    };

    console.log("Form Data:", finalData);

    try {
      const res = await addFriend(finalData).unwrap();
      console.log("Res: ", res);
      if (res.success) {
        toast.success("Friend Added Successfully", { id: sonarId });
        reset();
        setImagePreview(null);
        setSelectedFile(null);
      }
    } catch (error) {
      console.error("Failed to add friend:", error);
      toast.error("Failed to add friend", { id: sonarId });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-0 md:p-8 flex items-center justify-center">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-indigo-800 mb-3">
            Add a Friend
          </h1>
          <p className="text-gray-600 max-w-lg mx-auto">
            Keep track of your friend`s birthdays and special moments with this
            easy-to-use form
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Image Preview Section */}
          <div className="relative bg-gradient-to-r from-indigo-500 to-purple-600 p-8 flex flex-col items-center justify-center">
            {imagePreview ? (
              <div className="relative">
                <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white shadow-2xl">
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    fill
                    className="object-cover rounded-4xl"
                    unoptimized
                  />
                </div>
                <button
                  onClick={() => {
                    setImagePreview(null);
                    setSelectedFile(null);
                    setValue("photo", "");
                  }}
                  className="absolute -top-2 -right-2 bg-red-500 text-white p-1.5 rounded-full shadow-md hover:bg-red-600 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ) : (
              <div className="w-40 h-40 md:w-48 md:h-48 rounded-full bg-white/20 flex items-center justify-center border-2 border-dashed border-white/40">
                <FiImage className="h-12 w-12 text-white/70" />
              </div>
            )}

            <div className="mt-6">
              <label className="bg-white text-indigo-600 font-medium py-2.5 px-5 rounded-lg shadow-md hover:bg-indigo-50 transition-all duration-200 flex items-center space-x-2 cursor-pointer">
                <FiPlus size={18} />
                <span>{imagePreview ? "Change Photo" : "Upload Photo"}</span>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  {...register("photo", {
                    validate: (value) =>
                      value || selectedFile ? true : "Photo is required",
                  })}
                  onChange={handleImageChange}
                />
              </label>
              {errors.photo && (
                <p className="text-red-200 text-sm mt-2 bg-red-500/20 px-3 py-1 rounded-md">
                  {errors.photo.message}
                </p>
              )}
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="space-y-2">
                <label className=" text-sm font-medium text-gray-700 flex items-center">
                  <FiUser className="mr-2 text-indigo-600" />
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter full name"
                  className="w-full px-4 py-3.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors pl-10"
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Date of Birth */}
              <div className="space-y-2">
                <label className=" text-sm font-medium text-gray-700 flex items-center">
                  <FiCalendar className="mr-2 text-indigo-600" />
                  Date of Birth
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-3.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors pl-10"
                  {...register("date", {
                    required: "Date of Birth is required",
                  })}
                />
                {errors.date && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.date.message}
                  </p>
                )}
              </div>

              {/* Rating */}
              <div className="space-y-4 md:col-span-2">
                <label className=" text-sm font-medium text-gray-700 flex items-center">
                  <FiStar className="mr-2 text-indigo-600" />
                  Rating
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="range"
                    min="1"
                    max="5"
                    defaultValue="3"
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-indigo-600 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-lg"
                    {...register("ratting", { required: "Rating is required" })}
                  />
                  <div className="flex items-center justify-center bg-indigo-100 text-indigo-700 font-bold w-10 h-10 rounded-full shadow-inner">
                    {ratingValue}
                  </div>
                </div>
                {errors.ratting && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.ratting.message}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className=" text-sm font-medium text-gray-700 flex items-center">
                  <FiPhone className="mr-2 text-indigo-600" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="Enter phone number"
                  className="w-full px-4 py-3.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors pl-10"
                  {...register("phone", {
                    required: "Phone number is required",
                  })}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* Location */}
              <div className="space-y-2">
                <label className=" text-sm font-medium text-gray-700 flex items-center">
                  <FiMapPin className="mr-2 text-indigo-600" />
                  Location
                </label>
                <input
                  type="text"
                  placeholder="Enter location"
                  className="w-full px-4 py-3.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors pl-10"
                  {...register("location", {
                    required: "Location is required",
                  })}
                />
                {errors.location && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.location.message}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-10">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 px-6 rounded-xl text-white font-medium shadow-lg transition-all flex items-center justify-center space-x-2 ${
                  isSubmitting
                    ? "bg-indigo-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 hover:shadow-xl"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-t-2 border-r-2 border-white rounded-full animate-spin"></div>
                    <span>Adding Friend...</span>
                  </>
                ) : (
                  <>
                    <FiPlus size={20} />
                    <span>Add Friend</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddFriend;
