"use client";

import CustomCard from "@/components/custom-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import FriendItem from "./friend-item/item";

const FriendsComponent = () => {
  return (
    <CustomCard className="bg-transparent rounded-md border border-[#5C6B81] flex-1 flex flex-col justify-between">
      <ScrollArea className="h-[81dvh] rounded-md">
        <div className="mt-3 p-6 pt-0 relative">
          <FriendItem />
          <FriendItem />
          <FriendItem />
          <FriendItem />
          <FriendItem />
          <FriendItem />
          <FriendItem />
          <FriendItem />
          <FriendItem />
          <FriendItem />
          <FriendItem />
          <FriendItem />
          <FriendItem />
          <FriendItem />
          <FriendItem />
          <FriendItem />
          <FriendItem />
          <FriendItem />
          <FriendItem />
          <FriendItem />
          <FriendItem />
          <FriendItem />
          <FriendItem />
        </div>
      </ScrollArea>
    </CustomCard>
  );
};

export default FriendsComponent;
