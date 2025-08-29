"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Image from "next/image";
import { compressAndConvertToBase64 } from "@/components/utils/Function/convertToBase64/compressAndConvertToBase64";
import { useAppSelector } from "@/components/redux/hooks";
import { useAddFriendMutation } from "@/components/redux/features/friend/friendsApi";
import { toast } from "sonner";
import { sonarId } from "@/components/utils/Function/sonarId";

interface FriendFormData {
  name: string;
  date: string;
  photo: string; // base64 string
  ratting: number;
  phone: string;
  location: string;
}

const AddFriend = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [addFriend] = useAddFriendMutation();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
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

  // Handle image change with compression + base64
  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const base64 = await compressAndConvertToBase64(file, 0.6, 800, 800);
        setImagePreview(base64); // Preview
        setValue("photo", base64); // form value
      } catch (err) {
        console.error("Error converting image:", err);
      }
    }
  };

  const onSubmit = async (data: FriendFormData) => {
    setIsSubmitting(true);

    const finalData = {
      ...data,
      ref: user?.email,
    };
    console.log("Form Data:", finalData);

    const res = await addFriend(finalData).unwrap();
    console.log("Res: ", res);
    if (res.success) {
      toast.success("Friend Added Successfully", { id: sonarId });
    }

    reset();
    setImagePreview(null);
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-indigo-800 mb-2">
            Add a Friend
          </h1>
          <p className="text-gray-600">
            Keep track of your friend`s birthdays and special details
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Image Preview */}
          {imagePreview && (
            <div className="relative h-64 bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center">
              <Image
                src={imagePreview}
                alt="Preview"
                width={192}
                height={192}
                className="object-cover border-4 border-white shadow-lg w-[192px] h-[192px] rounded-full"
                unoptimized
              />
              <button
                onClick={() => setImagePreview(null)}
                className="absolute top-4 right-4 bg-white text-red-500 p-2 rounded-full shadow-md hover:bg-red-50 transition-colors"
              >
                ✕
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter full name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
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
                <label className="block text-sm font-medium text-gray-700">
                  Date of Birth
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
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

              {/* Profile Photo */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Profile Photo
                </label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-gray-400 mb-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <p className="text-xs text-gray-500">
                        Click to upload a photo
                      </p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      {...register("photo", {
                        validate: (value) =>
                          value ? true : "Photo is required", // check if base64 string exists
                      })}
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
                {errors.photo && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.photo.message}
                  </p>
                )}
              </div>

              {/* Rating */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Rating
                </label>
                <div className="flex items-center">
                  <input
                    type="range"
                    min="1"
                    max="5"
                    defaultValue="3"
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-indigo-600"
                    {...register("ratting", { required: "Rating is required" })}
                  />
                  <span className="ml-4 text-indigo-600 font-medium min-w-[20px]">
                    {ratingValue}
                  </span>
                </div>
                {errors.ratting && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.ratting.message}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="Enter phone number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
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
                <label className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <input
                  type="text"
                  placeholder="Enter location"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
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

            <div className="mt-8">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-4 rounded-lg text-white font-medium shadow-md transition-all ${
                  isSubmitting
                    ? "bg-indigo-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                }`}
              >
                {isSubmitting ? "Adding Friend..." : "Add Friend"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddFriend;
