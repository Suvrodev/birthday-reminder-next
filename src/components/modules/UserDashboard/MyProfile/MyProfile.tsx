"use client";

import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { useAppSelector } from "@/components/redux/hooks";
import {
  useGetMeQuery,
  useUpdateUserMutation,
} from "@/components/redux/api/authApi";
import MyProfileLoading from "./MyProfileLoading";
import { TLoggedUser } from "@/components/utils/globalTypes/globalTypes";
import { verifyToken } from "@/components/utils/Function/verifyToken";
import { useDispatch } from "react-redux";
import { setUser } from "@/components/redux/features/auth/authSlice";
import { uploadToCloudinary } from "@/components/utils/UploadToCloudinary/UploadToCloudinary";
import { toast } from "sonner";
import { sonarId } from "@/components/utils/Function/sonarId";

// Icons
import {
  FiEdit,
  FiSave,
  FiX,
  FiUser,
  FiMail,
  FiPhone,
  FiMessageSquare,
  FiFacebook,
} from "react-icons/fi";
import { HiOutlinePhotograph } from "react-icons/hi";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  whatsapp?: string;
  facebook?: string;
  profileImage?: string;
};

const MyProfile = () => {
  const dispatch = useDispatch();
  const [updateMe] = useUpdateUserMutation();
  const { user } = useAppSelector((state) => state.auth);

  const { data, isLoading } = useGetMeQuery(user?.email ?? "", {
    skip: !user?.email,
  });

  const me: TLoggedUser = data?.data;

  const { register, handleSubmit, reset, setValue } = useForm<FormValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      whatsapp: "",
      facebook: "",
      profileImage: "",
    },
  });

  const [preview, setPreview] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Load user data into form
  useEffect(() => {
    if (me) {
      reset({
        firstName: me.firstName,
        lastName: me.lastName,
        email: me.email,
        phone: me.phone || "",
        whatsapp: me.whatsapp || "",
        facebook: me.facebook || "",
        profileImage: me.profileImage || "",
      });
      setPreview(me.profileImage || null);
    }
  }, [me, reset]);

  // Handle image selection & immediate upload
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const previewURL = URL.createObjectURL(file);
      setPreview(previewURL);

      if (isEditing) {
        try {
          toast.loading("Uploading image...", { id: sonarId });
          const uploadedUrl = await uploadToCloudinary(file);
          console.log("Uplaoded Image url: ", uploadedUrl);

          setValue("profileImage", uploadedUrl);

          try {
            const res = await updateMe({
              email: user?.email,
              updateData: { profileImage: uploadedUrl },
            }).unwrap();

            if (res?.success) {
              const token = res?.data;
              const updatedUser = verifyToken(token);

              await fetch("/api/set-token", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token }),
                credentials: "include",
              });

              dispatch(setUser({ token, user: updatedUser }));

              setIsEditing(false);
              setIsSaving(false);
              toast.success("Profile Image updated successfully", {
                id: sonarId,
              });
            }
          } catch (error) {
            console.error("Update failed:", error);
            setIsSaving(false);
            toast.error("Failed to update profile", { id: sonarId });
          }
        } catch (error) {
          console.error("Cloudinary upload failed:", error);
          toast.error("Failed to upload image", { id: "image-upload" });
        }
      }
    }
  };

  const triggerFileSelect = () => {
    if (isEditing) fileInputRef.current?.click();
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (me) {
      reset({
        firstName: me.firstName,
        lastName: me.lastName,
        email: me.email,
        phone: me.phone || "",
        whatsapp: me.whatsapp || "",
        facebook: me.facebook || "",
        profileImage: me.profileImage || "",
      });
      setPreview(me.profileImage || null);
    }
  };

  const onSubmit = async (data: FormValues) => {
    setIsSaving(true);

    // Exclude profile image from other info update
    const { profileImage, ...otherData } = data; // eslint-disable-line @typescript-eslint/no-unused-vars

    try {
      const res = await updateMe({
        email: user?.email,
        updateData: otherData,
      }).unwrap();

      if (res?.success) {
        const token = res?.data;
        const updatedUser = verifyToken(token);

        await fetch("/api/set-token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
          credentials: "include",
        });

        dispatch(setUser({ token, user: updatedUser }));

        setIsEditing(false);
        setIsSaving(false);
        toast.success("Profile updated successfully", { id: sonarId });
      }
    } catch (error) {
      console.error("Update failed:", error);
      setIsSaving(false);
      toast.error("Failed to update profile", { id: sonarId });
    }
  };

  if (isLoading) return <MyProfileLoading />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-0 md:p-8">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 md:p-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex-1 mb-4 md:mb-0">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">My Profile</h2>
            <p className="text-blue-100 text-opacity-90">
              {isEditing
                ? "Edit your profile information below"
                : "View and manage your profile information"}
            </p>
          </div>
          <button
            onClick={() => (isEditing ? handleCancel() : setIsEditing(true))}
            className="bg-white text-blue-700 font-medium py-2.5 px-5 rounded-lg shadow-md hover:bg-blue-50 hover:shadow-lg transition-all duration-200 flex items-center space-x-2"
          >
            {isEditing ? (
              <>
                <FiX size={18} />
                <span>Cancel</span>
              </>
            ) : (
              <>
                <FiEdit size={18} />
                <span>Edit Profile</span>
              </>
            )}
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-6 md:p-8 space-y-8"
        >
          {/* Profile Image */}
          <div className="flex flex-col items-center">
            <div className="relative group">
              <div
                onClick={triggerFileSelect}
                className={`relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white shadow-lg cursor-pointer transition-all duration-300 ${
                  isEditing
                    ? "hover:border-blue-400 hover:scale-105 group-hover:shadow-xl"
                    : "cursor-default"
                }`}
              >
                {preview ? (
                  <Image
                    src={preview}
                    alt="Profile"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <FiUser size={48} className="text-gray-400" />
                  </div>
                )}

                {isEditing && (
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <HiOutlinePhotograph size={32} className="text-white" />
                    <span className="sr-only">Change profile photo</span>
                  </div>
                )}
              </div>
            </div>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
              disabled={!isEditing}
            />
            {isEditing && (
              <p className="text-sm text-gray-500 mt-2 text-center">
                Click on image to change profile photo
              </p>
            )}
          </div>

          {/* Email */}
          <div className="relative">
            <div className="flex items-center mb-2">
              <FiMail className="mr-2 text-blue-600" />
              <span className="text-gray-700 font-medium">Email Address</span>
            </div>
            <input
              type="email"
              {...register("email")}
              className="w-full border border-gray-300 rounded-lg px-5 py-3.5 bg-gray-50 cursor-not-allowed pl-10"
              disabled
            />
            <FiMail className="absolute left-3 top-11 text-gray-400" />
          </div>

          {/* First & Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <div className="flex items-center mb-2">
                <FiUser className="mr-2 text-blue-600" />
                <span className="text-gray-700 font-medium">First Name</span>
              </div>
              <input
                type="text"
                {...register("firstName", {
                  required: "First name is required",
                })}
                className={`w-full border rounded-lg px-5 py-3.5 pl-10 ${
                  !isEditing
                    ? "bg-gray-100 cursor-not-allowed"
                    : "bg-white border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                }`}
                disabled={!isEditing}
              />
              <FiUser className="absolute left-3 top-11 text-gray-400" />
            </div>

            <div className="relative">
              <label className="text-gray-700 font-medium mb-2 block">
                Last Name
              </label>
              <input
                type="text"
                {...register("lastName", { required: "Last name is required" })}
                className={`w-full border rounded-lg px-5 py-3.5 ${
                  !isEditing
                    ? "bg-gray-100 cursor-not-allowed"
                    : "bg-white border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                }`}
                disabled={!isEditing}
              />
            </div>
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative">
              <div className="flex items-center mb-2">
                <FiPhone className="mr-2 text-blue-600" />
                <span className="text-gray-700 font-medium">Phone</span>
              </div>
              <input
                type="text"
                placeholder="Your phone number"
                {...register("phone")}
                className={`w-full border rounded-lg px-5 py-3.5 pl-10 ${
                  !isEditing
                    ? "bg-gray-100 cursor-not-allowed"
                    : "bg-white border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                }`}
                disabled={!isEditing}
              />
              <FiPhone className="absolute left-3 top-11 text-gray-400" />
            </div>

            <div className="relative">
              <div className="flex items-center mb-2">
                <FiMessageSquare className="mr-2 text-blue-600" />
                <span className="text-gray-700 font-medium">WhatsApp</span>
              </div>
              <input
                type="text"
                placeholder="Your WhatsApp number"
                {...register("whatsapp")}
                className={`w-full border rounded-lg px-5 py-3.5 pl-10 ${
                  !isEditing
                    ? "bg-gray-100 cursor-not-allowed"
                    : "bg-white border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                }`}
                disabled={!isEditing}
              />
              <FiMessageSquare className="absolute left-3 top-11 text-gray-400" />
            </div>

            <div className="relative">
              <div className="flex items-center mb-2">
                <FiFacebook className="mr-2 text-blue-600" />
                <span className="text-gray-700 font-medium">Facebook</span>
              </div>
              <input
                type="text"
                placeholder="Your Facebook profile"
                {...register("facebook")}
                className={`w-full border rounded-lg px-5 py-3.5 pl-10 ${
                  !isEditing
                    ? "bg-gray-100 cursor-not-allowed"
                    : "bg-white border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                }`}
                disabled={!isEditing}
              />
              <FiFacebook className="absolute left-3 top-11 text-gray-400" />
            </div>
          </div>

          {/* Save Button */}
          {isEditing && (
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSaving}
                className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-medium py-3 px-6 rounded-lg shadow-md hover:from-blue-700 hover:to-indigo-800 hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSaving ? (
                  <>
                    <div className="w-5 h-5 border-t-2 border-r-2 border-white rounded-full animate-spin"></div>
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <FiSave size={18} />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default MyProfile;
