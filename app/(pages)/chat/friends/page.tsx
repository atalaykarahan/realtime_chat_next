"use client";
import CustomCard from "@/components/custom-card";
import FriendsDummyData from "@/components/ui/friends-dummy";
import IncomeFriendDummyData from "@/components/ui/income-friend-dummy";
import { ScrollArea } from "@/components/ui/scroll-area";
import AddFriend from "./add-friens";

const FriendsSettings = () => {
  return (
    <CustomCard className="flex-1 flex flex-col justify-between">
      {/* add friends */}
      <AddFriend />

      <div className="grid grid-cols-2 flex-1 gap-4 p-5">
        <CustomCard className="bg-transparent rounded-md border border-[#5C6B81] flex-1 flex flex-col justify-between">
          <ScrollArea className="h-[81dvh] rounded-md">
            <div className="mt-3 p-6 pt-0 relative">
              <FriendsDummyData />
              <FriendsDummyData />
              <FriendsDummyData />
              <FriendsDummyData />
              <FriendsDummyData />
              <FriendsDummyData />
              <FriendsDummyData />
              <FriendsDummyData />
              <FriendsDummyData />
              <FriendsDummyData />
              <FriendsDummyData />
              <FriendsDummyData />
              <FriendsDummyData />
              <FriendsDummyData />
              <FriendsDummyData />
              <FriendsDummyData />
              <FriendsDummyData />
              <FriendsDummyData />
              <FriendsDummyData />
              <FriendsDummyData />
              <FriendsDummyData />
              <FriendsDummyData />
            </div>
          </ScrollArea>
        </CustomCard>

        <CustomCard className="bg-transparent rounded-md border border-[#5C6B81]">
          <ScrollArea className="flex-1 rounded-md overflow-auto">
            <div className="mt-3 p-6 pt-0 relative flex-1 overflow-y-auto">
              <IncomeFriendDummyData />
              <IncomeFriendDummyData />
              <IncomeFriendDummyData />
              <IncomeFriendDummyData />
              <IncomeFriendDummyData />
              <IncomeFriendDummyData />
            </div>
          </ScrollArea>
        </CustomCard>
      </div>
    </CustomCard>
  );
};

export default FriendsSettings;
