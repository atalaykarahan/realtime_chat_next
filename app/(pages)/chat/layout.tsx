import { auth } from "@/auth";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { SessionProvider } from "next-auth/react";

const ChatLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      {children}
      {/* <BackgroundBeams /> */}
    </SessionProvider>
  );
};

export default ChatLayout;
