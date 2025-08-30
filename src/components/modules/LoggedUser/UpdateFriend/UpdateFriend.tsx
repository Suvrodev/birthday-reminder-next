"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useAppSelector } from "@/components/redux/hooks";
import { useUpdateFriendMutation } from "@/components/redux/features/friend/friendsApi";
import { toast } from "sonner";
import { sonarId } from "@/components/utils/Function/sonarId";
import { uploadToCloudinary } from "@/components/utils/UploadToCloudinary/UploadToCloudinary";
import { TFriend } from "@/components/utils/globalTypes/globalTypes";

// Icons
import {
  FiUser,
  FiCalendar,
  FiPhone,
  FiMapPin,
  FiStar,
  FiPlus,
} from "react-icons/fi";

interface IProps {
  friend: TFriend;
}

type FriendFormData = {
  name: string;
  date: string;
  photo: string;
  ratting: number;
  phone: string;
  location: string;
};

const UpdateFriend = ({ friend }: IProps) => {
  const { user } = useAppSelector((state) => state.auth);
  const [updateFriend] = useUpdateFriendMutation();

  const { register, handleSubmit, watch, setValue } = useForm<FriendFormData>({
    defaultValues: {
      name: friend.name,
      date: friend.date,
      photo: friend.photo,
      ratting: friend.ratting,
      phone: friend.phone,
      location: friend.location,
    },
  });

  const ratingValue = watch("ratting", friend.ratting);
  const [imagePreview, setImagePreview] = useState<string>(friend.photo || "");
  const [, setSelectedFile] = useState<File | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));

      // Upload immediately
      try {
        toast.loading("Uploading image...", { id: sonarId });
        const uploadedUrl = await uploadToCloudinary(file);
        console.log("Upload iamge url: ", uploadedUrl);
        const imageUpdateRes = await updateFriend({
          id: friend._id,
          updateData: { photo: uploadedUrl },
        }).unwrap();
        console.log("imageUpdateRes: ", imageUpdateRes);
        setValue("photo", uploadedUrl);
        toast.success("Image updated successfully", { id: sonarId });
      } catch (err) {
        console.error(err);
        toast.error("Failed to upload image", { id: sonarId });
      }
    }
  };

  const onSubmit = async (data: FriendFormData) => {
    setIsUpdating(true);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { photo, ...updateData } = data;
    const finalUpdateData = { ...updateData, ref: user?.email };
    console.log("Data for Update: ", finalUpdateData);
    try {
      const updateRes = await updateFriend({
        id: friend._id,
        updateData: finalUpdateData,
      }).unwrap();
      console.log("Update Res: ", updateRes);
      toast.success("Friend updated successfully", { id: sonarId });
    } catch (err) {
      console.error(err);
      toast.error("Failed to update friend", { id: sonarId });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    // <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden p-6 md:p-8">
    //   <h2 className="text-2xl font-bold mb-6">Update Friend</h2>

    //   {/* Image Section */}
    //   <div className="flex flex-col items-center mb-6">
    //     <div
    //       className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-indigo-500 shadow-lg cursor-pointer"
    //       onClick={triggerFileSelect}
    //     >
    //       {preview ? (
    //         <Image
    //           src={preview}
    //           alt="Friend"
    //           fill
    //           className="object-cover"
    //           unoptimized
    //         />
    //       ) : (
    //         <div className="w-full h-full bg-gray-200 flex items-center justify-center">
    //           <FiUser size={48} className="text-gray-400" />
    //         </div>
    //       )}
    //     </div>
    //     <input
    //       type="file"
    //       accept="image/*"
    //       ref={fileInputRef}
    //       className="hidden"
    //       onChange={handleImageChange}
    //     />
    //     <button
    //       type="button"
    //       className="mt-2 text-indigo-600 font-medium flex items-center space-x-1"
    //       onClick={triggerFileSelect}
    //     >
    //       <FiPlus /> <span>Change Photo</span>
    //     </button>
    //   </div>

    //   <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
    //     {/* Name */}
    //     <div>
    //       <label className="text-sm font-medium text-gray-700 flex items-center mb-1">
    //         <FiUser className="mr-2 text-indigo-600" />
    //         Full Name
    //       </label>
    //       <input
    //         type="text"
    //         {...register("name", { required: "Name is required" })}
    //         className="w-full border rounded-lg px-4 py-2 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
    //       />
    //     </div>

    //     {/* Date */}
    //     <div>
    //       <label className="text-sm font-medium text-gray-700 flex items-center mb-1">
    //         <FiCalendar className="mr-2 text-indigo-600" />
    //         Date of Birth
    //       </label>
    //       <input
    //         type="date"
    //         {...register("date", { required: "Date is required" })}
    //         className="w-full border rounded-lg px-4 py-2 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
    //       />
    //     </div>

    //     {/* Rating */}
    //     <div>
    //       <label className="text-sm font-medium text-gray-700 flex items-center mb-1">
    //         <FiStar className="mr-2 text-indigo-600" />
    //         Rating
    //       </label>
    //       <input
    //         type="range"
    //         min={1}
    //         max={5}
    //         {...register("ratting")}
    //         className="w-full"
    //       />
    //       <div className="text-indigo-600 font-bold mt-1">{ratingValue}</div>
    //     </div>

    //     {/* Phone */}
    //     <div>
    //       <label className="text-sm font-medium text-gray-700 flex items-center mb-1">
    //         <FiPhone className="mr-2 text-indigo-600" />
    //         Phone
    //       </label>
    //       <input
    //         type="tel"
    //         {...register("phone", { required: "Phone is required" })}
    //         className="w-full border rounded-lg px-4 py-2 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
    //       />
    //     </div>

    //     {/* Location */}
    //     <div>
    //       <label className="text-sm font-medium text-gray-700 flex items-center mb-1">
    //         <FiMapPin className="mr-2 text-indigo-600" />
    //         Location
    //       </label>
    //       <input
    //         type="text"
    //         {...register("location", { required: "Location is required" })}
    //         className="w-full border rounded-lg px-4 py-2 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
    //       />
    //     </div>

    //     <button
    //       type="submit"
    //       disabled={isUpdating}
    //       className="w-full py-3 mt-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg shadow-md hover:from-indigo-700 hover:to-purple-700 flex justify-center items-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
    //     >
    //       {isUpdating ? <span>Updating...</span> : <span>Update Friend</span>}
    //     </button>
    //   </form>
    // </div>

    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-0 md:p-8 flex items-center justify-center">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-indigo-800 mb-3">
            Update Friend
          </h1>
          <p className="text-gray-600 max-w-lg mx-auto">
            Update your friend&apos;s info and photo below
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Image Preview */}
          <div className="relative bg-gradient-to-r from-indigo-500 to-purple-600 p-8 flex flex-col items-center justify-center">
            {imagePreview ? (
              <div className="relative">
                <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white shadow-2xl">
                  <Image
                    src={imagePreview}
                    alt="Friend"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              </div>
            ) : (
              <div className="w-40 h-40 md:w-48 md:h-48 rounded-full bg-white/20 flex items-center justify-center border-2 border-dashed border-white/40">
                <FiUser className="h-12 w-12 text-white/70" />
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
                  onChange={handleImageChange}
                />
              </label>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-6 md:p-8 space-y-6"
          >
            {/* Name */}
            <div>
              <label className="flex items-center mb-2 text-sm font-medium text-gray-700">
                <FiUser className="mr-2 text-indigo-600" />
                Full Name
              </label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                className="w-full px-4 py-3.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Date */}
            <div>
              <label className="flex items-center mb-2 text-sm font-medium text-gray-700">
                <FiCalendar className="mr-2 text-indigo-600" />
                Date of Birth
              </label>
              <input
                type="date"
                {...register("date", { required: "Date is required" })}
                className="w-full px-4 py-3.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Rating */}
            <div>
              <label className="flex items-center mb-2 text-sm font-medium text-gray-700">
                <FiStar className="mr-2 text-indigo-600" />
                Rating
              </label>
              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  onClick={() =>
                    setValue("ratting", Math.max(1, ratingValue - 1))
                  }
                  className="w-10 h-10 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition-colors"
                >
                  -
                </button>
                <input
                  type="range"
                  min={1}
                  max={5}
                  {...register("ratting")}
                  className="w-full"
                />
                <div className="w-10 h-10 flex items-center justify-center bg-indigo-100 text-indigo-700 font-bold rounded-full shadow-inner">
                  {ratingValue}
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setValue("ratting", Math.min(5, ratingValue + 1))
                  }
                  className="w-10 h-10 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="flex items-center mb-2 text-sm font-medium text-gray-700">
                <FiPhone className="mr-2 text-indigo-600" />
                Phone
              </label>
              <input
                type="tel"
                {...register("phone", { required: "Phone is required" })}
                className="w-full px-4 py-3.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Location */}
            <div>
              <label className="flex items-center mb-2 text-sm font-medium text-gray-700">
                <FiMapPin className="mr-2 text-indigo-600" />
                Location
              </label>
              <input
                type="text"
                {...register("location", { required: "Location is required" })}
                className="w-full px-4 py-3.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <button
              type="submit"
              disabled={isUpdating}
              className={`w-full py-4 mt-4 rounded-xl text-white font-medium shadow-lg flex items-center justify-center space-x-2 ${
                isUpdating
                  ? "bg-indigo-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
              }`}
            >
              {isUpdating ? "Updating..." : "Update Friend"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateFriend;
