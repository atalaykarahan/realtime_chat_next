"use client";
import {useCurrentUser} from "@/hooks/use-current-user";
import Sidebar from "./sidebar/sidebar";
import MainComponent from "@/app/(pages)/chat/main-component/page";

const ChatPage = () => {
    const user = useCurrentUser();
    return (
        <div
            className="h-screen w-screen p-6 flex gap-5 relative"
            style={{zIndex: "1"}}
        >
            <Sidebar user={user}/>
            <MainComponent user={user}/>
        </div>
    );
};

export default ChatPage;
