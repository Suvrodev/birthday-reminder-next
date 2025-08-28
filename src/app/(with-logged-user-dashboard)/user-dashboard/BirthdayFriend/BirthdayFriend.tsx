/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useGetAllFriendsQuery } from "@/components/redux/features/friend/friendsApi";

const BirthdayFriend = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);
  const limit = 5;

  // 🟢 Fetch friends filtered by ref=email
  const { data, isLoading, isError } = useGetAllFriendsQuery({
    search,
    sort,
    page,
    limit,
    ref: "fiona@example.com", // ✅ TypeScript error gone
  });

  const friends = data?.data?.data || [];
  const totalPages = data?.data?.totalPages || 1;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🎂 Birthday Page</h1>

      {/* 🔍 Search + Sort Controls */}
      <div className="flex items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-64"
        />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as "asc" | "desc")}
          className="border p-2 rounded"
        >
          <option value="asc">Sort by Asc</option>
          <option value="desc">Sort by Desc</option>
        </select>
      </div>

      {/* 🟢 Loading/Error States */}
      {isLoading ? (
        <p>Loading friends...</p>
      ) : isError ? (
        <p className="text-red-500">Failed to load friends.</p>
      ) : friends.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {friends.map((friend: any) => (
            <div
              key={friend._id}
              className="border rounded-lg shadow p-4 flex flex-col items-center bg-white"
            >
              <Image
                src={friend.photo}
                alt={friend.name}
                width={96}
                height={96}
                className="rounded-full object-cover mb-3"
              />
              <h2 className="text-lg font-semibold">{friend.name}</h2>
              <p className="text-sm text-gray-600">📅 {friend.date}</p>
              <p className="text-sm text-gray-600">📍 {friend.location}</p>
              <p className="text-sm text-gray-600">📞 {friend.phone}</p>
              <p className="text-sm text-yellow-600">⭐ {friend.ratting}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No friends found for fiona@example.com</p>
      )}

      {/* 🔄 Pagination */}
      <div className="flex justify-center mt-6 gap-3">
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="px-4 py-2">
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage((prev) => prev + 1)}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BirthdayFriend;
