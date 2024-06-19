"use client";
import CustomCard from "@/components/custom-card";
import UnknownErrorCard from "@/components/unknown-error-card";
import { useSearchParams } from "next/navigation";
import CreateNameForm from "./create-name-form";
import GoogleSection from "./google-section";
import TitleSection from "./title-section";

const CreateName = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  if (token == null) return <UnknownErrorCard />;

  return (
    <CustomCard className="max-w-md  w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 relative">
      {/* baslik yazilarin bulundugu kisim */}
      <TitleSection />

      {/* google bilgilerin bulundugu kisim */}
      <GoogleSection token={token} />

      {/* kullanici adi girilen form kismi */}
      <CreateNameForm token={token} />
    </CustomCard>
  );
};

export default CreateName;
