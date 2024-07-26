"use client";
import FriendItem from "@/app/(pages)/chat/friends/friends-component/friend-item/item";
import { Dialog, DialogContent } from "../ui/dialog";
import CustomCard from "@/components/custom-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search } from "@/components/ui/search";

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
        <Search placeholder="Aramaya başla" />
        <CustomCard className="hidden lg:flex flex-col flex-none max-h-[500px] bg-transparent rounded-md border border-[#5C6B81]">
          <ScrollArea className="flex-1 rounded-md overflow-auto">
            <div className="pt-3 pr-2">
              {/*hata veriyor diye simdilik bu alttaki kisimleri kapattik*/}
              {/*<FriendItem />*/}
              {/*<FriendItem />*/}
              {/*<FriendItem />*/}
              {/*<FriendItem />*/}
              {/*<FriendItem />*/}
              {/*<FriendItem />*/}
              {/*<FriendItem />*/}
              {/*<FriendItem />*/}
              {/*<FriendItem />*/}
            </div>
          </ScrollArea>
        </CustomCard>
      </DialogContent>
    </Dialog>
  );
};

export default AddFriendDialog;
