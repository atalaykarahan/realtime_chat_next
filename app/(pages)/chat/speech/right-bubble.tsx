import Image from "next/image";
import { PiDotsThreeCircleVertical } from "react-icons/pi";


interface RightBubbleProps {
  user: any;
  group?: boolean;
  message: string;
}

const RightBubble: React.FC<RightBubbleProps> = ({ user, group, message }) => {
  return (
    <div className="block md:px-6 px-4 ">
      <div className="flex space-x-2 items-start  justify-end group w-full rtl:space-x-reverse mb-4">
        <div className=" flex flex-col max-w-[40%]  gap-1">
          <div className="flex items-center gap-1">
            <div className="opacity-0 invisible group-hover:opacity-100 group-hover:visible ">
              <span
                className="w-7 h-7 rounded-full bg-default-100 flex items-center justify-center"
                id="radix-:r1a:"
                aria-haspopup="menu"
                aria-expanded="false"
                data-state="closed"
              >
                <PiDotsThreeCircleVertical className="w-12 h-12 text-[#4A32B0]" />
              </span>
            </div>
            <div className="whitespace-pre-wrap break-all">
              <div className="bg-[#134e4a] text-primary-foreground  text-sm  py-2 px-3 rounded-2xl  flex-1  ">
                {message}
              </div>
            </div>
          </div>
          <span className="text-xs text-end text-[#e0f2fe]">19:48</span>
        </div>
        {group && (
          <div className="flex-none self-end -translate-y-5">
            <div className="h-8 w-8 rounded-full ">
              <Image
                width={40}
                height={40}
                src={user?.image}
                alt="/images/avatar/avatar-2.jpg"
                className="block w-full h-full object-cover rounded-full"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RightBubble;
