import CustomCard from "@/components/custom-card";
import UserProfile from "../user-profile/user-profile";
import DummyData from "@/components/ui/dummy";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SidebarProps {
  user: any;
}

const Sidebar: React.FC<SidebarProps> = ({ user }) => {
  return (
    <CustomCard className="hidden lg:flex flex-col flex-none min-w-[260px] max-h-full">
    <UserProfile user={user} />
    <ScrollArea className="flex-1 rounded-md overflow-auto">
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
    </ScrollArea>
  </CustomCard>
  );
};

export default Sidebar;
