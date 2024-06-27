import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { User } from "next-auth";
import Image from "next/image";
import { PiDotsThreeCircleVerticalFill } from "react-icons/pi";
import LeftBuble from "./left-buble";
import RightBuble from "./right-buble";

interface SpeechProps {
  user: any;
}

const Speech: React.FC<SpeechProps> = ({ user }) => {
  return (
    <div className="mt-2">
      <ScrollArea className="h-full">
        {/* left */}
        <LeftBuble user={user} />
        {/* right */}
        <RightBuble user={user} />
      </ScrollArea>
    </div>
  );
};

export default Speech;
