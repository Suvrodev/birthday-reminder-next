"use client";

import UpdateFriend from "@/components/modules/LoggedUser/UpdateFriend/UpdateFriend";
import { useGetSingleFriendQuery } from "@/components/redux/features/friend/friendsApi";
import { useParams } from "next/navigation";

// File: /app/(with-logged-user-dashboard)/user-dashboard/update-friend/[friendid]/page.tsx

// import UpdateFriend from "@/components/modules/LoggedUser/UpdateFriend/UpdateFriend";
// import { baseApiFromEnv } from "@/components/utils/Function/baseApiFromenv";
// import { TFriend } from "@/components/utils/globalTypes/globalTypes";
// import NotFoundData from "@/components/utils/NotFoundData/NotFoundData";

// import type { PageProps } from 'next';

// interface IProps extends PageProps {
//   params: {
//     friendid: string;
//   };
// }

// Dynamic route params type
// interface IProps {
//   params: {
//     friendid: string;
//   };
// }

const UpdateFriendPage = () => {
  const { friendid } = useParams();
  console.log("Friend id: ", friendid);

  const { data, isLoading } = useGetSingleFriendQuery(friendid as string);

  const friend = data?.data;
  console.log("Friend: ", friend);

  // Fetch single friend by ID
  // const res = await fetch(`${baseApiFromEnv()}/friend/single/${friendid}`);

  // if (!res.ok) {
  //   return <NotFoundData speed={1}>Friend Not Found</NotFoundData>;
  // }

  // const data = await res.json();
  // const friend: TFriend | null = data?.data || null;

  // if (!friend) {
  //   return <NotFoundData speed={1}>Friend Not Found</NotFoundData>;
  // }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-indigo-50 p-4 md:p-8">
      <UpdateFriend friend={friend} />
    </div>
  );
};

export default UpdateFriendPage;
