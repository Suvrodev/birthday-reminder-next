import UpdateFriend from "@/components/modules/LoggedUser/UpdateFriend/UpdateFriend";
import { baseVar } from "@/components/utils/Function/baseApiFromenv";
import { TFriend } from "@/components/utils/globalTypes/globalTypes";
import NotFoundData from "@/components/utils/NotFoundData/NotFoundData";

interface IProps {
  params: Promise<{
    id: string;
  }>;
}

const UpdateFriendPage = async ({ params }: IProps) => {
  const { id } = await params;

  const res = await fetch(`${baseVar}/friend/single/${id}`);
  const data = await res.json();
  const friend: TFriend = data?.data;

  console.log("id: ", id);
  console.log("Friend: ", friend);

  if (!friend) {
    return <NotFoundData speed={1}>Blog Not Found</NotFoundData>;
  }

  return (
    <div>
      <UpdateFriend friend={friend} />
    </div>
  );
};

export default UpdateFriendPage;
