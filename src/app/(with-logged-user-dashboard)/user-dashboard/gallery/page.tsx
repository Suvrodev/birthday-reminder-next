/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useAppSelector } from "@/components/redux/hooks";
import { useGetAllFriendsQuery } from "@/components/redux/features/friend/friendsApi";
import Image from "next/image";
import { FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";

const FriendGallery = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [page, setPage] = useState(1);
  const [selectedPhoto, setSelectedPhoto] = useState<any>(null);
  const limit = 12; // photos per page

  const { data, isLoading, isError } = useGetAllFriendsQuery(
    { ref: user?.email || "", page, limit },
    { skip: !user?.email }
  );

  const photos = data?.data?.data || [];
  const totalPages = data?.data?.totalPages || 1;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
        <p className="text-red-600 font-medium">
          Failed to load photos. Please try again later.
        </p>
      </div>
    );
  }

  if (photos.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md p-10 text-center">
        <div className="text-6xl mb-4">📸</div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          No photos found
        </h3>
        <p className="text-gray-500">Add friends to see their photos here!</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-indigo-800 mb-3">
            📸 Friend Gallery
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse all your friend`s photos in a beautiful gallery
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {photos.map((item: any, index: number) => (
            <div
              key={index}
              className="relative w-full h-40 md:h-48 rounded-xl overflow-hidden shadow-lg hover:scale-105 hover:shadow-2xl transition-transform cursor-pointer"
              onClick={() => setSelectedPhoto(item)}
            >
              <Image
                src={item.photo}
                alt={`Friend ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity rounded-xl"></div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 bg-white rounded-xl shadow-md p-6">
          <div className="text-sm text-gray-600">
            Showing {photos.length} of {data?.data?.total || 0} photos
          </div>

          <div className="flex items-center gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
              className="flex items-center justify-center w-10 h-10 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-50 transition-colors"
            >
              <FiChevronLeft className="h-5 w-5" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  className={`flex items-center justify-center w-10 h-10 rounded-lg border ${
                    page === pageNum
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "border-gray-300 hover:bg-indigo-50"
                  } transition-colors`}
                >
                  {pageNum}
                </button>
              )
            )}

            <button
              disabled={page === totalPages}
              onClick={() => setPage((prev) => prev + 1)}
              className="flex items-center justify-center w-10 h-10 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-50 transition-colors"
            >
              <FiChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Modal Preview */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setSelectedPhoto(null)} // background click closes modal
        >
          <div
            className="relative w-full max-w-3xl rounded-xl overflow-hidden shadow-2xl bg-white"
            onClick={(e) => e.stopPropagation()} // modal click should NOT close
          >
            <button
              className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition z-50"
              onClick={() => setSelectedPhoto(null)} // close modal
            >
              <FiX className="w-6 h-6" />
            </button>
            <div className="relative w-full h-96 md:h-[600px]">
              <Image
                src={selectedPhoto.photo}
                alt="Selected Photo"
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FriendGallery;
