import UpdateFriend from "@/components/modules/LoggedUser/UpdateFriend/UpdateFriend";
import { baseApiFromEnv } from "@/components/utils/Function/baseApiFromenv";
import React from "react";

interface IProps {
  params: Promise<{
    friendId: string;
  }>;
}

const UpdateFriendPage = async ({ params }: IProps) => {
  const { friendId } = await params;

  const res = await fetch(`${baseApiFromEnv()}/friend/single/${friendId}`);
  const data = await res.json();
  const friend = data?.data;
  return (
    <div>
      <UpdateFriend friend={friend} />
    </div>
  );
};

export default UpdateFriendPage;

// "use client"
// const UpdateFriendPage = () => {
//   const { friendid } = useParams();
//   console.log("Friend id: ", friendid);

//   const { data, isLoading } = useGetSingleFriendQuery(friendid as string);

//   const friend = data?.data;
//   console.log("Friend: ", friend);

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-indigo-50 p-4 md:p-8">
//       <UpdateFriend friend={friend} />
//     </div>
//   );
// };

// export default UpdateFriendPage;
