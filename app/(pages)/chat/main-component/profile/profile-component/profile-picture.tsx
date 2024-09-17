import { useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MdOutlineFileUpload,MdOutlineCancel  } from "react-icons/md";
import { SlPicture } from "react-icons/sl";

const ProfilePicture = ({ user }: any) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    user.image ?? "/profile-circle.svg"
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleUpload = () => {
    if (!selectedFile) return;

    console.log("Selected file:", selectedFile);

    setSelectedFile(null);
    setImagePreview(user.image ?? "/profile-circle.svg");
  };

  const handleCancel = () => {
    setSelectedFile(null);
    setImagePreview(user.image ?? "/profile-circle.svg");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex items-end gap-4">
      <span className="relative flex h-28 w-28 shrink-0 overflow-hidden rounded-full">
        <Image
          width={160}
          height={160}
          className="aspect-square h-full w-full"
          src={imagePreview ?? "/profile-circle.svg"}
          alt="Profile Picture"
          loading="eager"
        />
      </span>
      <div className="flex flex-col gap-4 items-start">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          ref={fileInputRef}
        />
        {selectedFile && (
        <div className="flex gap-1">
          <Button variant={"outline"} onClick={handleUpload}>
            <MdOutlineFileUpload className="h-5 w-5 mr-1 text-green-600" />
            Upload
          </Button>
          <Button variant={"outline"} onClick={handleCancel}>
            <MdOutlineCancel  className="h-5 w-5 mr-1 text-rose-700" />
            Cancel
          </Button>
        </div>
        )}
        <Button onClick={handleButtonClick} variant={"outline"}>
          <SlPicture className="h-5 w-5 mr-2 text-blue-500" />
          Select Profile Photo
        </Button>

      </div>
    </div>
  );
};

export default ProfilePicture;
