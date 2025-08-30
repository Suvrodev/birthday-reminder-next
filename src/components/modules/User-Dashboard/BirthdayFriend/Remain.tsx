"use client";
import React, { useState } from "react";
import { useAppSelector } from "@/components/redux/hooks";
import { useGetAllFriendsQuery } from "@/components/redux/features/friend/friendsApi";
import { getDaysUntilBirthday } from "@/components/utils/Function/UntilBirthday";
import { FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";
import { TFriend } from "@/components/utils/globalTypes/globalTypes";

const BirthdayFriendCompactToggle = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 20;

  const { data, isLoading, isError } = useGetAllFriendsQuery(
    {
      ref: user?.email || "",
      search,
      sort: "asc",
      sortBy: "date",
      page,
      limit,
    },
    { skip: !user?.email }
  );

  const friends = data?.data?.data || [];
  const totalPages = data?.data?.totalPages || 1;

  const sortedFriends = [...friends].sort(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (a: any, b: any) =>
      getDaysUntilBirthday(a.date) - getDaysUntilBirthday(b.date)
  );

  return (
    <div className="  bg-green-600">
      <div className="mt-[100px] md:mt-0">
        {/* Toggle Button */}
        <button
          onClick={() => setIsOpen(true)}
          className={`fixed right-4 top-1/2 transform -translate-y-1/2 bg-indigo-600 text-white p-3 rounded-l-full
           shadow-lg hover:bg-indigo-700 transition-colors z-50 ${
             isOpen ? "hidden" : ""
           }`}
        >
          🎂
        </button>

        {/* Sidebar */}
        <div
          className={`fixed top-[50px] md:top-0 right-0 h-screen w-80 bg-white shadow-lg border-l border-gray-200 flex flex-col transform transition-transform duration-300 z-40 ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Header with cross */}
          <div className="p-4 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800">🎂 Birthdays</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-800 transition-colors"
            >
              <FiX size={24} />
            </button>
          </div>

          {/* Search */}
          <div className="p-4 border-b border-gray-100">
            <input
              type="text"
              placeholder="Search by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            />
          </div>

          {/* Scrollable List */}
          <div className="flex-1 overflow-y-auto">
            {isLoading ? (
              <div className="flex justify-center items-center h-full">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-500"></div>
              </div>
            ) : isError ? (
              <div className="p-4 text-center text-red-600">
                Failed to load friends.
              </div>
            ) : sortedFriends.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                No friends found
              </div>
            ) : (
              <ul>
                {sortedFriends.map((friend: TFriend) => {
                  const remainingDays = getDaysUntilBirthday(friend.date);
                  return (
                    <li
                      key={friend._id}
                      className="flex justify-between items-center px-4 py-3 border-b border-gray-100 hover:bg-indigo-50 cursor-pointer transition-colors"
                    >
                      <span className="font-medium text-gray-800">
                        {friend.name}
                      </span>
                      <span
                        className={`text-sm font-semibold px-2 py-1 rounded-full ${
                          remainingDays === 0
                            ? "bg-sky-100 text-sky-700"
                            : "bg-indigo-100 text-indigo-700"
                        }`}
                      >
                        {remainingDays === 0 ? "TODAY" : `${remainingDays}d`}
                      </span>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {/* Pagination */}
          {sortedFriends.length > 0 && (
            <div className="p-4 border-t border-gray-100 flex items-center justify-between">
              <button
                disabled={page === 1}
                onClick={() => setPage((prev) => prev - 1)}
                className="p-1 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-50 transition-colors"
              >
                <FiChevronLeft size={20} />
              </button>
              <span className="text-sm text-gray-600">
                Page {page} / {totalPages}
              </span>
              <button
                disabled={page === totalPages}
                onClick={() => setPage((prev) => prev + 1)}
                className="p-1 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-50 transition-colors"
              >
                <FiChevronRight size={20} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BirthdayFriendCompactToggle;
