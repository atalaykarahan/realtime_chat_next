"use client";
import CustomCard from "@/components/custom-card";
import AddFriend from "./add-friends";
import FriendsComponent from "./friends-component/friends";
import RequestsComponent from "./requests-component/requests";
import BlockedsComponent from "./blockeds-component/blockeds"

const FriendsSettings = () => {
  return (
    <CustomCard className="flex-1 flex flex-col justify-between">
      <AddFriend />
      <div className="grid grid-cols-2 flex-1 gap-4 p-5">
        <FriendsComponent />
        <div className="flex flex-col h-full gap-4">
          <RequestsComponent />
          <BlockedsComponent/>
        </div>
      </div>
    </CustomCard>
  );
};

export default FriendsSettings;
