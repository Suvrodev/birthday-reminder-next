import React from "react";

const MyProfileLoading = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4 md:p-8 animate-pulse">
      <div className="w-full max-w-4xl bg-white shadow-2xl rounded-3xl overflow-hidden">
        {/* Header Skeleton */}
        <div className="relative bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 text-white p-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex-1 space-y-2">
            <div className="h-8 bg-white bg-opacity-30 rounded w-1/3"></div>
            <div className="h-4 bg-white bg-opacity-20 rounded w-2/3"></div>
          </div>
          <div className="h-10 w-32 bg-white bg-opacity-30 rounded-full"></div>
        </div>

        {/* Form Skeleton */}
        <div className="p-8 space-y-8">
          {/* Profile Image */}
          <div className="flex flex-col items-center">
            <div className="w-40 h-40 rounded-full bg-gray-200 mb-4"></div>
            <div className="h-4 w-64 bg-gray-200 rounded"></div>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center">
              <div className="px-3 bg-white h-4 w-40 rounded"></div>
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-32"></div>
            <div className="h-12 bg-gray-200 rounded-xl"></div>
          </div>

          {/* First & Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-24"></div>
              <div className="h-12 bg-gray-200 rounded-xl"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-24"></div>
              <div className="h-12 bg-gray-200 rounded-xl"></div>
            </div>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center">
              <div className="px-3 bg-white h-4 w-44 rounded"></div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-24"></div>
              <div className="h-12 bg-gray-200 rounded-xl"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-28"></div>
              <div className="h-12 bg-gray-200 rounded-xl"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-28"></div>
              <div className="h-12 bg-gray-200 rounded-xl"></div>
            </div>
          </div>

          {/* Save Button */}
          <div className="pt-6">
            <div className="h-12 w-full bg-gray-200 rounded-xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfileLoading;
