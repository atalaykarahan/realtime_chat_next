
import CustomCard from "@/components/custom-card";
import DummyData from "@/components/ui/dummy";
import ChatMessage from "./chat-message";
import ChatNavbar from "./chat-navbar";
import UserProfile from "./user-profile/user-profile";
import {auth} from "@/auth"
import { currentUser } from "@/lib/auth";

const ChatPage = async () => {
  const user = await currentUser();


  return (
    <div
      className="h-screen w-screen p-6 flex gap-5 relative"
      style={{ zIndex: "1" }}
    >
      {/* {JSON.stringify(session)} */}
      <CustomCard className="hidden lg:block flex-none min-w-[260px]">
        <UserProfile user={user} />
        <div className="pt-3">
          <DummyData />
          <DummyData />
          <DummyData />
          <DummyData />
          <DummyData />
          <DummyData />
          <DummyData />
          <DummyData />
          <DummyData />
          <DummyData />
          <DummyData />
        </div>
      </CustomCard>
      <CustomCard className="flex-1 flex flex-col justify-between">
        <ChatNavbar />
        <div className="mt-auto">
          <ChatMessage />
        </div>
      </CustomCard>
    </div>
  );
};

export default ChatPage;
