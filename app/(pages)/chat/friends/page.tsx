"use client";
import CustomCard from "@/components/custom-card";
import AddFriend from "./add-friends";
import FriendsComponent from "./friends-component/friends";
import RequestsComponent from "./requests-component/requests";

import {useAppSelector} from "@/app/redux/store";
import {cn} from "@/lib/utils";
import BlockedComponent from "@/app/(pages)/chat/friends/blockeds-component/blocked";

const FriendsSettings = () => {
    const statusValue = useAppSelector((state) => state.messageBoxReducer.value);

    return (
        <CustomCard
            className={cn(
                "flex-1 flex-col justify-between",
                statusValue.chatBoxStatus == true ? "hidden" : "flex"
            )}
        >
            <AddFriend/>
            <div className="grid grid-cols-2 flex-1 gap-4 p-5">
                <FriendsComponent/>
                <div className="flex flex-col h-full gap-4">
                    <RequestsComponent/>
                    <BlockedComponent/>
                </div>
            </div>
        </CustomCard>
    );
};

export default FriendsSettings;
