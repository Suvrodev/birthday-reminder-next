import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { FiTrash2 } from "react-icons/fi";
import { useDeleteFriendMutation } from "@/components/redux/features/friend/friendsApi";
import { toast } from "sonner";
import { sonarId } from "@/components/utils/Function/sonarId";

const DeleteFriendButton = ({ friendId }: { friendId: string }) => {
  const [makeDelete] = useDeleteFriendMutation();

  const handleDelete = async () => {
    try {
      const res = await makeDelete({ id: friendId }).unwrap();
      console.log("Deleted successfully", res);

      if (res?.success) {
        toast.success("Deleted Successfully", { id: sonarId });
      }
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button
          className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
          title="Delete"
        >
          <FiTrash2 size={14} className="text-white" />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            friend from your birthday list.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>No</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>
            Yes, Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteFriendButton;
