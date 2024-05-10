import CustomCard from "@/components/custom-card";
import { Card } from "@/components/ui/card";
import ChatNavbar from "./chat-navbar";
import DummyData from "@/components/ui/dummy";
import ChatMessage from "./chat-message";
import UserProfile from "./user-profile";
const HomePage = () => {
  return (
    <div
      className="h-screen w-screen p-6 flex gap-5 relative"
      style={{ zIndex: "1" }}
    >
      <CustomCard className="hidden lg:block flex-none min-w-[260px]">
        <UserProfile/>
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
        <DummyData />
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

export default HomePage;
