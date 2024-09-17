import FriendsSettings from "@/app/(pages)/chat/main-component/friends/page";
import ChatBox from "@/app/(pages)/chat/main-component/chat-box/chat-box";
import { useAppSelector } from "@/app/redux/store";
import io, { Socket } from "socket.io-client";
import { useEffect, useState } from "react";
import Profile from "./profile/page";

interface MainComponentProps {
  user: any;
  socket: Socket | null;
}

const MainComponent: React.FC<MainComponentProps> = ({ user, socket }) => {
  const chatBoxValue = useAppSelector((state) => state.messageBoxReducer.value);
  return (
    <>
      {/*friends settings */}

      {chatBoxValue.activeComponent === "friends" && <FriendsSettings socket={socket} />}

      {chatBoxValue.activeComponent === "profile" && (
        <Profile  user={user}/>
      )}
      {/* chat box */}
      <ChatBox chatBoxValue={chatBoxValue} user={user} socket={socket} />
    </>
  );
};

export default MainComponent;
