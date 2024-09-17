import CustomCard from "@/components/custom-card";
import AddFriend from "./add-friends";
import FriendsComponent from "./friends-component/friends";
import RequestsComponent from "./requests-component/requests";
import BlockedComponent from "@/app/(pages)/chat/main-component/friends/blockeds-component/blocked";
import io, {Socket} from "socket.io-client";

interface FriendsSettingsProps {
  socket: Socket | null;
}

const FriendsSettings = ({ socket }: FriendsSettingsProps) => {
  
    return (
      <CustomCard className="flex-1 flex-col justify-between">
        <AddFriend socket={socket} />
        <div className="grid grid-cols-2 flex-1 gap-4 p-5">
          <FriendsComponent />
          <div className="flex flex-col h-full gap-4">
            <RequestsComponent socket={socket} />
            <BlockedComponent />
          </div>
        </div>
      </CustomCard>
    );
};

export default FriendsSettings;
