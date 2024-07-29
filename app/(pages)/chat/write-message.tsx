"use client";
import {Disclosure} from "@headlessui/react";
import {LuPlusCircle} from "react-icons/lu";
import {Input} from "@/components/ui/input";
import {AiOutlineSend} from "react-icons/ai";
import {Socket} from "socket.io-client";
import React, {useState} from "react";

interface WriteMessageProps {
    user: any;
    socket: Socket | null;
    room_id: string;
}

const WriteMessage: React.FC<WriteMessageProps> = ({user, socket, room_id}) => {
    const [newMessage, setNewMessage] = useState("");

    const handleSendMessage = () => {
        if (newMessage.trim() && user.id) {
            sendMessage(room_id, newMessage);
            setNewMessage("");
        }
    };

    const sendMessage = (room_id: string, message: string) => {
        if (socket && user) {
            socket.emit("sendMessage", {
                room_id,
                message,
            });
        }
    };

    // for press enter then send a message
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    return (
        <Disclosure as="nav" className="border-t border-[#5C6B81]">
            {({open}) => (
                <>
                    <div>
                        <div className="relative px-5 flex h-20 gap-5 items-center">
                            <div>
                                <LuPlusCircle className="text-[#4A32B0] text-[2rem]"/>
                            </div>
                            <div className="w-full">
                                <Input
                                    type="text"
                                    placeholder="Type your message..."
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                />
                            </div>
                            <div onClick={handleSendMessage}>
                                <AiOutlineSend className="text-[#4A32B0] text-[2rem]"/>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </Disclosure>
    );
};

export default WriteMessage;
