interface IProps {
  params: {
    id: string;
  };
}

const UpdateFriendPage = ({ params }: IProps) => {
  const { id } = params;
  console.log("id: ", id);
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Update Friend Page</h1>
      <p className="mt-4">Friend ID: {params.id}</p>
    </div>
  );
};

export default UpdateFriendPage;
