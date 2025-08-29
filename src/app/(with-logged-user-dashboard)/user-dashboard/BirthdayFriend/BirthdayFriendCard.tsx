// BirthdayFriendCard.tsx
import { formatDate } from "@/components/utils/Function/convertDate";
import { getDaysUntilBirthday } from "@/components/utils/Function/UntilBirthday";
import { TFriend } from "@/components/utils/globalTypes/globalTypes";
import Image from "next/image";
import React from "react";
import { FiCalendar, FiMapPin, FiPhone, FiStar, FiGift } from "react-icons/fi";

interface IProps {
  friend: TFriend;
}

const BirthdayFriendCard = ({ friend }: IProps) => {
  const daysUntilBirthday = getDaysUntilBirthday(friend.date);

  const birthdayIcon =
    daysUntilBirthday === 0 ? "🎂" : daysUntilBirthday <= 7 ? "🎁" : "📅";
  const badgeBg =
    daysUntilBirthday === 0
      ? "bg-gradient-to-r from-sky-400 to-blue-500"
      : daysUntilBirthday <= 7
      ? "bg-gradient-to-r from-amber-400 to-orange-400"
      : "bg-gradient-to-r from-indigo-400 to-purple-500";

  return (
    <div className="group relative bg-white rounded-3xl shadow-lg overflow-hidden transition-transform duration-300 hover:shadow-2xl hover:-translate-y-1 border border-gray-200">
      {/* Header gradient + Profile */}
      <div className="relative h-48 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
        {/* Subtle pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48ZyBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDgiPjxwYXRoIGQ9Ik0zNiAzNGMwLTEuMS45LTIgMi0yczIgLjkgMiAyLS45IDItMiAyLTItLjktMi0yek0wIDE2aDYwdi0ySDB2MnoiLz48L2c+PC9nPjwvc3Zn+')] opacity-20"></div>

        {/* Profile Image */}
        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 z-20">
          <div className="relative w-32 h-32 rounded-full border-4 border-white shadow-xl overflow-hidden transition-transform duration-300 group-hover:scale-105">
            <Image
              src={friend.photo || "/default-avatar.png"}
              alt={friend.name}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="pt-20 pb-6 px-6">
        {/* Name + Rating */}
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-1">
            {friend.name}
          </h2>
          <div className="flex items-center justify-center">
            {[...Array(5)].map((_, i) => (
              <FiStar
                key={i}
                className={`h-4 w-4 ${
                  i < friend.ratting
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Birthday Countdown Badge */}
        <div
          className={`text-center mb-5 rounded-2xl p-4 ${badgeBg} text-white transition-all duration-300`}
        >
          <div className="flex flex-col items-center justify-center">
            <div className="text-3xl font-bold mb-1">
              {birthdayIcon}{" "}
              {daysUntilBirthday === 0 ? "TODAY!" : `${daysUntilBirthday}`}
            </div>
            <div className="text-sm font-medium">
              {daysUntilBirthday === 0
                ? "It's their special day!"
                : `${daysUntilBirthday === 1 ? "day" : "days"} until birthday`}
            </div>
          </div>

          {daysUntilBirthday === 0 && (
            <div className="mt-2">
              <div className="inline-flex animate-pulse items-center text-xs bg-white text-sky-700 px-3 py-1 rounded-full font-semibold">
                <FiGift className="mr-1" size={14} /> Time to celebrate!
              </div>
            </div>
          )}
        </div>

        {/* Details */}
        <div className="space-y-3 border-t border-gray-100 pt-4 text-gray-700">
          <div className="flex items-center">
            <FiCalendar
              className="mr-3 text-indigo-500 flex-shrink-0"
              size={18}
            />
            <span className="text-sm">{formatDate(friend.date)}</span>
          </div>

          <div className="flex items-center">
            <FiMapPin
              className="mr-3 text-indigo-500 flex-shrink-0"
              size={18}
            />
            <span className="text-sm">{friend.location}</span>
          </div>

          <div className="flex items-center">
            <FiPhone className="mr-3 text-indigo-500 flex-shrink-0" size={18} />
            <span className="text-sm">{friend.phone}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-3 mt-6 pt-4 border-t border-gray-100">
          <button
            className={`text-xs ${
              daysUntilBirthday === 0
                ? "bg-sky-100 text-sky-700 hover:bg-sky-200"
                : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
            } px-4 py-2 rounded-lg font-medium transition-colors`}
          >
            Send Wish
          </button>
          <button className="text-xs bg-gray-100 text-gray-700 hover:bg-gray-200 px-4 py-2 rounded-lg font-medium transition-colors">
            Set Reminder
          </button>
        </div>
      </div>
    </div>
  );
};

export default BirthdayFriendCard;
