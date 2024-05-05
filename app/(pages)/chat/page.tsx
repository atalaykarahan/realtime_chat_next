import CustomCard from "@/components/custom-card";
import { Card } from "@/components/ui/card";
import ChatNavbar from "./chat-navbar";
import DummyData from "@/components/ui/dummy";
const HomePage = () => {
  return (
    <div
      className="h-screen w-screen p-6 flex gap-5 relative"
      style={{ zIndex: "1" }}
    >
      <CustomCard className="hidden lg:block flex-none min-w-[260px]" >
        <DummyData/>
        <DummyData/>
        <DummyData/>
        <DummyData/>
        <DummyData/>
        <DummyData/>
        <DummyData/>
        <DummyData/>
        <DummyData/>
        <DummyData/>
        <DummyData/>
        <DummyData/>
        <DummyData/>
   
      
      </CustomCard>
      <CustomCard className="flex-1">
        <ChatNavbar />
      </CustomCard>
    </div>
  );
};

export default HomePage;
