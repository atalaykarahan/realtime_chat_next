import CustomCard from "@/components/custom-card";
import { TbPhotoEdit } from "react-icons/tb";
import ProfileForm from "./profile-component/form";
import ProfilePicture from "./profile-component/profile-picture";

const Profile = ({ user }: any) => {
  return (
    <CustomCard className="flex-1 flex-col justify-between">
      <div className="p-8 space-y-8">
        <div>
          <h3 className="text-lg font-medium text-white">Profile</h3>
          <p className="text-sm text-muted-foreground">
            This is how others will see you.
          </p>
        </div>
        <ProfilePicture user={user} />
        <ProfileForm user={user} />
      </div>
    </CustomCard>
  );
};

export default Profile;
