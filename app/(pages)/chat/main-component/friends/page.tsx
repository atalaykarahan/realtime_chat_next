import CustomCard from "@/components/custom-card";
import AddFriend from "./add-friends";
import FriendsComponent from "./friends-component/friends";
import RequestsComponent from "./requests-component/requests";
import BlockedComponent from "@/app/(pages)/chat/main-component/friends/blockeds-component/blocked";

interface FriendsSettingsProps {
    chatBoxStatus: boolean;
}

const FriendsSettings = ({chatBoxStatus}: FriendsSettingsProps) => {

    if (!chatBoxStatus)
        return (
            <CustomCard
                className="flex-1 flex-col flex">
                <AddFriend/>
                <div className="grid grid-cols-2 grid-rows-2 flex-1 overflow-y-auto gap-2 p-2">
                    <FriendsComponent className="row-span-2"/>
                    <RequestsComponent/>
                    <BlockedComponent/>
                </div>
            </CustomCard>
        );
};

export default FriendsSettings;
