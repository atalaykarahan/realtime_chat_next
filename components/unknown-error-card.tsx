import CustomCard from "./custom-card";
import Image from "next/image";

const UnknownErrorCard = () => {
  return (
    <div className="w-screen h-screen items-center flex backdrop-blur-sm ">
      <CustomCard className="max-w-sm w-full mx-auto rounded-none text-center md:rounded-2xl p-4 md:p-8 relative">
        <Image
          src={"error.png"}
          alt={""}
          width={50}
          height={50}
          className="w-[200px] mx-auto"
          loading="eager"
        />
        <p className="text-white text-2xl pt-10 font-medium">
          Bilinmeyen bir hata ile karşılaşıldı.
        </p>
      </CustomCard>
    </div>
  );
};

export default UnknownErrorCard;
