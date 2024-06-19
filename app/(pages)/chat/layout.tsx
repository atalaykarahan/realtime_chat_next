import { BackgroundBeams } from "@/components/ui/background-beams";
import { Toaster } from "@/components/ui/toaster"

const ChatLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      {/* <BackgroundBeams /> */}
      <Toaster />

    </>
  );
};

export default ChatLayout;
