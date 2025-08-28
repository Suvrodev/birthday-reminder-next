"use client";

import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import pImage from "@/app/assets/logo/logo-3.jpeg"; // 👈 your default profile image

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  profileImage?: FileList;
};

const MyProfile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const [preview, setPreview] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Default Email (non-editable)
  const defaultEmail = "user@example.com";

  // Submit handler
  const onSubmit = (data: FormValues) => {
    console.log("Profile Updated:", data);
    setIsEditing(false);
  };

  // Handle image preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const triggerFileSelect = () => {
    if (isEditing) fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">My Profile</h2>
            <p className="text-blue-100 text-sm">
              {isEditing
                ? "Edit your profile information"
                : "View your profile information"}
            </p>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-white text-blue-600 font-medium py-2 px-4 rounded-lg shadow hover:bg-blue-50 transition"
          >
            {isEditing ? "Cancel" : "Edit Profile"}
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          {/* Profile Image */}
          <div className="flex flex-col items-center">
            <div
              onClick={triggerFileSelect}
              className={`relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow cursor-pointer ${
                isEditing ? "hover:border-blue-300" : "cursor-default"
              }`}
            >
              <Image
                src={preview || pImage}
                alt="Profile"
                fill
                className="object-cover"
              />
              {isEditing && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition">
                  <span className="text-white text-sm">Change</span>
                </div>
              )}
            </div>

            <input
              type="file"
              accept="image/*"
              {...register("profileImage")}
              ref={(e) => {
                fileInputRef.current = e;
                register("profileImage").ref(e);
              }}
              onChange={handleImageChange}
              className="hidden"
              disabled={!isEditing}
            />
          </div>

          {/* Email (non-editable) */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              value={defaultEmail}
              className="w-full border rounded-lg px-4 py-3 bg-gray-100 cursor-not-allowed"
              disabled
            />
          </div>

          {/* First & Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                First Name
              </label>
              <input
                type="text"
                {...register("firstName", {
                  required: "First name is required",
                })}
                className={`w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
                  errors.firstName ? "border-red-500" : "border-gray-300"
                } ${!isEditing ? "bg-gray-100 cursor-not-allowed" : ""}`}
                disabled={!isEditing}
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Last Name
              </label>
              <input
                type="text"
                {...register("lastName", { required: "Last name is required" })}
                className={`w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
                  errors.lastName ? "border-red-500" : "border-gray-300"
                } ${!isEditing ? "bg-gray-100 cursor-not-allowed" : ""}`}
                disabled={!isEditing}
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          {/* Save Button */}
          {isEditing && (
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold py-3 rounded-lg shadow-md hover:from-blue-700 hover:to-indigo-800 transition"
            >
              Save Profile
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default MyProfile;
