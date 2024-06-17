"use client";
import CustomCard from "@/components/custom-card";
import CreateNameForm from "./create-name-form";
import GoogleSection from "./google-section";
import TitleSection from "./title-section";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

const CreateName = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  if (token == null)
    return (
      <CustomCard className="max-w-sm w-full mx-auto rounded-none text-center md:rounded-2xl p-4 md:p-8 relative">
        <Image 
        src={"error.png"} 
        alt={""}
        width={50}
        height={50}
        className="w-[200px] mx-auto"
        />
        <p className="text-white text-2xl pt-10 font-medium">Bilinmeyen bir hata ile karşılaşıldı.</p>
      </CustomCard>
    );

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
