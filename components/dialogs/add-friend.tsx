"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

interface AddFriendDialogProps {
  openModal: boolean;
  closeModal: () => void;
}

const AddFriendDialog: React.FC<AddFriendDialogProps> = ({
  openModal,
  closeModal,
}) => {
  return (
    <Dialog open={openModal} onOpenChange={closeModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddFriendDialog;
