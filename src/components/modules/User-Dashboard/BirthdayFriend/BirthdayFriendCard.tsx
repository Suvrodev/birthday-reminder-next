import { formatDate } from "@/components/utils/Function/convertDate";
import { getDaysUntilBirthday } from "@/components/utils/Function/UntilBirthday";
import { TFriend } from "@/components/utils/globalTypes/globalTypes";
import Image from "next/image";
import React from "react";
import {
  FiCalendar,
  FiMapPin,
  FiPhone,
  FiStar,
  FiGift,
  FiEdit,
  FiMessageSquare,
  FiBell,
} from "react-icons/fi";
import DeleteFriendButton from "./DeleteFriendButton";
import Link from "next/link";

interface IProps {
  friend: TFriend;
  isEdit: boolean;
}

const BirthdayFriendCard = ({ friend, isEdit }: IProps) => {
  const daysUntilBirthday = getDaysUntilBirthday(friend.date);

  const getGradient = () => {
    if (daysUntilBirthday === 0) {
      return "bg-gradient-to-br from-rose-400 via-fuchsia-500 to-indigo-500";
    } else if (daysUntilBirthday <= 7) {
      return "bg-gradient-to-br from-pink-500 to-yellow-500";
    }
    return "bg-gradient-to-br  from-blue-400 to-purple-500";
  };

  const getBadgeColor = () => {
    if (daysUntilBirthday === 0) {
      return "bg-white text-pink-600";
    } else if (daysUntilBirthday <= 7) {
      return "bg-white/20 text-white";
    }
    return "bg-white/20 text-white";
  };

  const getStatus = () => {
    // console.log("-------------daysUntilBirthday: ", daysUntilBirthday);
    if (daysUntilBirthday === 0) return "TODAY!"; // ✅
    return `${daysUntilBirthday} ${
      daysUntilBirthday === 1 ? "day" : "days"
    } until birthday`;
  };

  return (
    <div
      className={`overflow-hidden border-0 shadow-lg rounded-2xl ${getGradient()} text-white transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}
    >
      {/* Header */}
      <div className="p-4 pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-4">
            {/* Profile Image */}
            <div className="relative w-16 h-16 rounded-full border-2 border-white shadow-md overflow-hidden">
              <Image
                src={friend.photo || "/default-avatar.png"}
                alt={friend.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50px"
              />
            </div>
            <div>
              <h2 className="text-xl font-bold">{friend.name}</h2>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    className={`h-4 w-4 mx-0.5 ${
                      i < friend.ratting
                        ? "text-amber-300 fill-amber-300"
                        : "text-white/50"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
          {isEdit && (
            <div className="flex gap-2">
              <Link
                href={`/user-dashboard/update-friend/${friend._id}`}
                className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                title="Edit"
              >
                <FiEdit size={14} className="text-white" />
              </Link>
              {/* <button
                onClick={() => handleDelete(friend._id)}
                className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                title="Delete"
              >
                <FiTrash2 size={14} className="text-white" />
              </button> */}

              <DeleteFriendButton friendId={friend._id} />
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 pt-2">
        <div className="space-y-3">
          {/* Birthday Date and Status */}
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <FiCalendar size={16} className="mr-2 text-white/80" />
              <span className="text-sm">{formatDate(friend.date)}</span>
            </div>
            <div
              className={`px-3 py-1 rounded-full text-sm font-medium ${getBadgeColor()}`}
            >
              {getStatus()}
            </div>
          </div>

          {/* Conditional Birthday Message */}
          {daysUntilBirthday === 0 && (
            <div className="mt-3 p-3 bg-white/20 rounded-lg flex items-center text-sm">
              <FiGift size={16} className="mr-2 text-yellow-300" />
              It`s their birthday today! Send wishes now!
            </div>
          )}

          {/* Location and Phone */}
          <div className="flex items-center">
            <FiMapPin size={16} className="mr-2 text-white/80" />
            <span className="text-sm">{friend.location}</span>
          </div>
          <div className="flex items-center">
            <FiPhone size={16} className="mr-2 text-white/80" />
            <span className="text-sm">{friend.phone}</span>
          </div>

          {/* Conditional Notification */}
          {daysUntilBirthday > 0 && daysUntilBirthday <= 7 && (
            <div className="mt-3 p-3 bg-white/20 rounded-lg flex items-center">
              <FiBell size={16} className="mr-2 text-yellow-300" />
              <span className="text-sm">
                Coming up soon! Time to plan a surprise!
              </span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-3 mt-4">
          <button
            className={`flex items-center text-sm font-semibold px-4 py-2 rounded-lg transition-all ${
              daysUntilBirthday === 0
                ? "bg-white text-pink-600 hover:bg-white/90"
                : "bg-white/20 text-white hover:bg-white/30"
            }`}
          >
            <FiMessageSquare size={14} className="mr-1.5" />
            Send Wish
          </button>
          <button className="flex items-center text-sm font-semibold bg-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-all">
            <FiBell size={14} className="mr-1.5" />
            Set Reminder
          </button>
        </div>
      </div>
    </div>
  );
};

export default BirthdayFriendCard;
