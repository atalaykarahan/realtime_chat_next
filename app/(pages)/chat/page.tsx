"use client";
import {useCurrentUser} from "@/hooks/use-current-user";
import {Message} from "@/models/Message";
import {useState} from "react";
import ChatBox from "./chat-box/chat-box";
import FriendsSettings from "./friends/page";
import Sidebar from "./sidebar/sidebar";
import {useAppSelector} from "@/app/redux/store";

const ChatPage = () => {
    const user = useCurrentUser();
    const chatBoxValue = useAppSelector((state) => state.messageBoxReducer.value);


    return (
        <>
            <div
                className="h-screen w-screen p-6 flex gap-5 relative"
                style={{zIndex: "1"}}
            >
                {/* userın id degerini gormek icin */}
                {/* {user && (
        <div className="bg-white"> {user.id}</div>
        )} */}

                {/* {JSON.stringify(session)} */}
                <Sidebar user={user}/>

                {/* friends settings */}
                <FriendsSettings/>

                {/* chat box */}
                <ChatBox chatBoxValue={chatBoxValue} user={user}/>
            </div>
        </>
    );
};

export default ChatPage;
