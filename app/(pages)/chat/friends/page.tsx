"use client";
import CustomCard from "@/components/custom-card";
import AddFriend from "./add-friens";
import FriendsComponent from "./friends-component/friends";
import RequestsComponent from "./requests-component/requests";

const FriendsSettings = () => {
  return (
    <CustomCard className="flex-1 flex flex-col justify-between">
      <AddFriend />
      <div className="grid grid-cols-2 flex-1 gap-4 p-5">
        <FriendsComponent />
        <RequestsComponent />
      </div>
    </CustomCard>
  );
};

export default FriendsSettings;
