/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { useAppSelector } from "@/components/redux/hooks";
import { useGetAllFriendsQuery } from "@/components/redux/features/friend/friendsApi";

// Icons
import { FiSearch, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import BirthdayFriendCard from "./BirthdayFriendCard";
import BirthdayFriendCompact from "./Remain";

const BirthdayFriend = () => {
  const { user } = useAppSelector((state) => state.auth);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"asc" | "desc">("asc");
  const [sortBy, setSortBy] = useState<"date" | "name" | "rating">("date");
  const [page, setPage] = useState(1);
  const limit = 6;

  const [isOpen, setIsOpen] = useState(false);

  const { data, isLoading, isError } = useGetAllFriendsQuery(
    {
      ref: user?.email || "",
      search,
      sort,
      sortBy,
      page,
      limit,
    },
    { skip: !user?.email }
  );

  const friends = data?.data?.data || [];
  const totalPages = data?.data?.totalPages || 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-indigo-800 mb-3">
            🎂 Birthday Friends
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Keep track of all your friends birthdays and never miss a special
            occasion
          </p>
        </div>

        {/* Search & Sort Controls */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by name..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1); // reset page on search
              }}
              className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full transition-colors"
            />
          </div>

          <div className="flex items-center gap-3">
            <span className="text-gray-700 font-medium">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value as "date" | "name" | "rating")
              }
              className="border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            >
              <option value="date">Date</option>
              <option value="name">Name</option>
              <option value="rating">Rating</option>
            </select>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as "asc" | "desc")}
              className="border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>

        {/* Loading / Error */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : isError ? (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <p className="text-red-600 font-medium">
              Failed to load friends. Please try again later.
            </p>
          </div>
        ) : friends.length > 0 ? (
          <div className={` ${isOpen ? "flex gap-20" : ""}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {friends.map((friend: any) => (
                <BirthdayFriendCard key={friend._id} friend={friend} />
              ))}
            </div>
            <div className="">
              <BirthdayFriendCompact />
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md p-10 text-center">
            <div className="text-6xl mb-4">🎂</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No friends found
            </h3>
            <p className="text-gray-500">
              Start adding friends to keep track of their birthdays!
            </p>
          </div>
        )}

        {/* Pagination */}
        {friends.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-xl shadow-md p-6">
            <div className="text-sm text-gray-600">
              Showing {friends.length} of {data?.data?.total || 0} friends
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
        )}
      </div>
    </div>
  );
};

export default BirthdayFriend;
