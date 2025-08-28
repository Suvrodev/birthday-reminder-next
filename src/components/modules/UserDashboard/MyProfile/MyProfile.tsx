"use client";

import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { useAppSelector } from "@/components/redux/hooks";
import {
  useGetMeQuery,
  useUpdateUserMutation,
} from "@/components/redux/api/authApi";
import { compressAndConvertToBase64 } from "@/components/utils/Function/convertToBase64/compressAndConvertToBase64";
import MyProfileLoading from "./MyProfileLoading";
import { TLoggedUser } from "@/components/utils/globalTypes/globalTypes";
import { verifyToken } from "@/components/utils/Function/verifyToken";
import { useDispatch } from "react-redux";
import { setUser } from "@/components/redux/features/auth/authSlice";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  whatsapp?: string;
  facebook?: string;
  profileImage?: string; // base64 string
};

const MyProfile = () => {
  const dispatch = useDispatch();
  const [updateMe] = useUpdateUserMutation();
  const { user } = useAppSelector((state) => state.auth);
  const { data, isLoading } = useGetMeQuery(user?.email ?? "", {
    skip: !user?.email,
  });

  const me: TLoggedUser = data?.data;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormValues>({
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

  // Update form values when user data loads
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

  // Submit handler
  const onSubmit = async (data: FormValues) => {
    setIsSaving(true);
    console.log("Profile Updated:", data);
    const res = await updateMe({
      email: user?.email,
      updateData: data,
    }).unwrap();
    console.log("Res: ", res);
    const token = res?.data;
    console.log("Token: ", token);
    const updatedUser = verifyToken(token);
    console.log("Updated User: ", updatedUser);
    dispatch(setUser({ token: token, user: updatedUser }));

    setIsEditing(false);
    setIsSaving(false);
    // TODO: call API to update profile
  };

  // Handle image preview + convert to base64
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      try {
        const base64 = await compressAndConvertToBase64(e.target.files[0]);
        setPreview(base64); // Preview update
        setValue("profileImage", base64); // Form update
      } catch (error) {
        console.error("Image conversion error:", error);
      }
    }
  };

  const triggerFileSelect = () => {
    if (isEditing) fileInputRef.current?.click();
  };

  if (isLoading) {
    return <MyProfileLoading />;
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-4xl bg-white shadow-2xl rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-xl">
        {/* Header with gradient */}
        <div className="relative bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 text-white p-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex-1 mb-4 md:mb-0">
            <h2 className="text-3xl font-bold mb-2">My Profile</h2>
            <p className="text-blue-100 text-opacity-80">
              {isEditing
                ? "Edit your profile information below"
                : "View and manage your profile information"}
            </p>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-white text-blue-700 font-medium py-3 px-6 rounded-xl shadow-lg hover:bg-blue-50 hover:scale-105 transition-all duration-200 flex items-center space-x-2"
          >
            <span>{isEditing ? "Discard Changes" : "Edit Profile"}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              {isEditing ? (
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              ) : (
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              )}
            </svg>
          </button>

          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-4 right-4 w-24 h-24 bg-white opacity-10 rounded-full"></div>
            <div className="absolute bottom-2 left-6 w-16 h-16 bg-white opacity-10 rounded-full"></div>
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-8">
          {/* Profile Image Section */}
          <div className="flex flex-col items-center">
            <div className="relative group">
              <div
                onClick={triggerFileSelect}
                className={`relative w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-2xl cursor-pointer transition-all duration-300 ${
                  isEditing
                    ? "hover:border-blue-400 hover:scale-105 group-hover:shadow-lg"
                    : "cursor-default"
                }`}
              >
                {typeof preview == "string" && (
                  <Image
                    src={preview}
                    alt="Profile"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                )}

                {isEditing && (
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full">
                    <div className="text-white text-center p-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 mx-auto mb-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span className="text-sm font-medium">Change Photo</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Camera icon badge when editing */}
              {isEditing && (
                <div className="absolute bottom-2 right-2 bg-blue-600 rounded-full p-2 border-4 border-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </div>

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
              disabled={!isEditing}
            />

            <p className="mt-4 text-gray-500 text-sm text-center">
              Click on the image to change your profile photo
            </p>
          </div>

          {/* Divider */}
          <div className="relative">
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-3 bg-white text-sm text-gray-500">
                Personal Information
              </span>
            </div>
          </div>

          {/* Email (non-editable) */}
          <div className="space-y-2">
            <label className="block text-gray-700 font-medium mb-2">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                {...register("email")}
                className="w-full border border-gray-200 rounded-xl px-5 py-4 bg-gray-50 cursor-not-allowed focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                disabled
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
            </div>
            <p className="text-gray-400 text-sm">Email cannot be changed</p>
          </div>

          {/* First & Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-gray-700 font-medium mb-2">
                First Name
              </label>
              <input
                type="text"
                {...register("firstName", {
                  required: "First name is required",
                })}
                className={`w-full border rounded-xl px-5 py-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 ${
                  errors.firstName
                    ? "border-red-500 ring-2 ring-red-200"
                    : "border-gray-200"
                } ${
                  !isEditing ? "bg-gray-100 cursor-not-allowed" : "bg-white"
                }`}
                disabled={!isEditing}
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-gray-700 font-medium mb-2">
                Last Name
              </label>
              <input
                type="text"
                {...register("lastName", { required: "Last name is required" })}
                className={`w-full border rounded-xl px-5 py-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 ${
                  errors.lastName
                    ? "border-red-500 ring-2 ring-red-200"
                    : "border-gray-200"
                } ${
                  !isEditing ? "bg-gray-100 cursor-not-allowed" : "bg-white"
                }`}
                disabled={!isEditing}
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          {/* Divider */}
          <div className="relative">
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-3 bg-white text-sm text-gray-500">
                Contact Information
              </span>
            </div>
          </div>

          {/* Phone, Whatsapp, Facebook */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="block text-gray-700 font-medium mb-2 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 text-blue-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                Phone
              </label>
              <input
                type="text"
                {...register("phone")}
                className={`w-full border border-gray-200 rounded-xl px-5 py-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 ${
                  !isEditing ? "bg-gray-100 cursor-not-allowed" : "bg-white"
                }`}
                disabled={!isEditing}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-gray-700 font-medium mb-2 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 text-green-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5zm4.707 5.707a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L8.414 10l1.293-1.293zm4 0a1 1 0 010 1.414L11.586 10l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Whatsapp
              </label>
              <input
                type="text"
                {...register("whatsapp")}
                className={`w-full border border-gray-200 rounded-xl px-5 py-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 ${
                  !isEditing ? "bg-gray-100 cursor-not-allowed" : "bg-white"
                }`}
                disabled={!isEditing}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-gray-700 font-medium mb-2 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 text-blue-700"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M14.243 5.757a6 6 0 10-.986 9.284 1 1 0 111.087 1.678A8 8 0 1118 10a3 3 0 01-4.8 2.401A4 4 0 1114 10a1 1 0 102 0c0-1.537-.586-3.07-1.757-4.243zM12 10a2 2 0 10-4 0 2 2 0 004 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Facebook
              </label>
              <input
                type="text"
                {...register("facebook")}
                className={`w-full border border-gray-200 rounded-xl px-5 py-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 ${
                  !isEditing ? "bg-gray-100 cursor-not-allowed" : "bg-white"
                }`}
                disabled={!isEditing}
              />
            </div>
          </div>

          {/* Save Button */}
          {isEditing && (
            <div className="pt-6">
              <button
                type="submit"
                disabled={isSaving}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold py-4 rounded-xl shadow-lg hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 flex items-center justify-center hover:shadow-xl disabled:opacity-80 disabled:cursor-not-allowed"
              >
                {isSaving ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Saving Changes...
                  </>
                ) : (
                  <>
                    Save Profile
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 ml-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
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
