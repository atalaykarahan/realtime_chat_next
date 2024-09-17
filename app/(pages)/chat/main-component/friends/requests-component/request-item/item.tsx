"use client";
import Image from "next/image";
import Options from "./option";
import {ComingRequestsModel} from "../requests";

interface ComingRequestsProps {
    requests: ComingRequestsModel;
}

const RequestItem: React.FC<ComingRequestsProps> = ({requests}) => {
    return (
        <div
            className="gap-4 py-2 lg:py-2.5 px-3 mx-3 rounded-md hover:bg-[#4A32B0]/30 transition-all duration-500 cursor-pointer flex items-center">
            <div className="flex-1 flex gap-3">
                <div className="relative inline-block">
          <span className="relative flex h-12 w-12 overflow-hidden rounded-full">
            <Image
                width={40}
                height={40}
                className="aspect-square h-full w-full"
                src={
                    requests.user_photo ||
                    "/profile-circle.svg"
                }
                alt="tst"
                loading="eager"
            />
          </span>
                </div>
                <div className="flex items-center">
                    <div className="truncate max-w-[120px]">
            <span className="text-sm text-white font-medium">
              {requests.user_name}
            </span>
                    </div>
                </div>
            </div>
            <div className="flex-none flex items-center justify-center  gap-2 ml-auto lg:ml-0">
                <Options requests={requests}/>
            </div>
        </div>
    );
};

export default RequestItem;
