import CustomCard from "@/components/custom-card";
import UserProfile from "../user-profile/user-profile";
import DummyData from "@/components/ui/dummy";

interface SidebarProps {
  user: any;
}

const Sidebar: React.FC<SidebarProps> = ({ user }) => {
  return (
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
  );
};

export default Sidebar;
