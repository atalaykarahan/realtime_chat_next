import CustomCard from "@/components/custom-card";
import CreateNameForm from "./create-name-form";
import GoogleSection from "./google-section";
import TitleSection from "./title-section";

const CreateName = () => {
  return (
    <CustomCard className="max-w-md  w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 relative">
      {/* baslik yazilarin bulundugu kisim */}
      <TitleSection />

      {/* google bilgilerin bulundugu kisim */}
      <GoogleSection />

      {/* kullanici adi girilen form kismi */}
      <CreateNameForm />
    </CustomCard>
  );
};

export default CreateName;
